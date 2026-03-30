const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()

const SSLCommerzPayment = require('sslcommerz-lts')
const port = process.env.PORT || 9000
const app = express()
const verifyToken = require("./middleware/verifytoken");
const verifyAdmin = require('./middleware/verifyAdmin');
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.afsmpf3.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})


const store_id = process.env.Store_ID;
const store_passwd = process.env.Store_PASS;
const is_live = false


async function run() {
  try {
    await client.connect();
    console.log('MongoDB connected');

    const db = client.db('hellotask-db')
    const serviceCollection = db.collection('services')
    const providerCollection = db.collection('serviceProviders')
    const bookingData = db.collection('bookingsData')
    const usersCollection = db.collection('users')





    //Save a service data in DB
    app.post('/add-services', verifyToken, verifyAdmin(usersCollection), async (req, res) => {
      try {
        const servicesData = {
          ...req.body,
          buyer: {
            email: req.user.email,
            name: req.user.name || "Admin",
          },
          createdAt: new Date(),
        };
        const result = await serviceCollection.insertOne(servicesData);
        res.send(result);
      } catch (err) {
        //console.error(err);
        res.status(500).send({ error: "Failed to insert service" });
      }
    }
    );




    //Get all services data from DB
    app.get('/all-services', async (req, res) => {
      const result = await serviceCollection.find().toArray()
      res.send(result)
    })


    //Get all services data from DB
    app.get('/all-services/:email', verifyToken, verifyAdmin(usersCollection), async (req, res) => {
      if (req.params.email !== req.user.email) {
        return res.status(403).send({ message: "Forbidden" });
      }
      const query = { "buyer.email": req.user.email };
      const result = await serviceCollection.find(query).toArray();
      res.send(result);
    }
    );



    app.get('/my-services', verifyToken, verifyAdmin(usersCollection), async (req, res) => {
      const result = await serviceCollection.find({ "buyer.email": req.user.email }).toArray();
      res.send(result);
    }
    );



    //Delete a Service from DB
    app.delete("/service/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await serviceCollection.deleteOne(query)
      res.send(result)
    })


    // Get a single service data For Update
    app.get('/service/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await serviceCollection.findOne(query)
      res.send(result)
    })



    //Save a Update-service data in DB 
    app.put('/update-service/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const serviceData = req.body;

        // Remove _id from the update data
        const { _id, ...serviceDataWithoutId } = serviceData;

        const updated = {
          $set: serviceDataWithoutId
        }

        const query = { _id: new ObjectId(id) }
        const options = { upsert: true }
        const result = await serviceCollection.updateOne(query, updated, options);
        res.send(result)
      }
      catch (err) {
        console.error("Error updating data:", err);
      }
    });


    // Save provider form data - only logged in user
    app.post('/provider-formdata', verifyToken, async (req, res) => {
      try {
        const formData = {
          ...req.body,
          email: req.user.email,   //logged-in user email force
          status: "pending",       //default status
          createdAt: new Date(),   //application time
          updatedAt: null
        };

        const result = await providerCollection.insertOne(formData);
        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to submit provider form" });
      }
    });


    //get service-provider form data
    app.get('/form-data', async (req, res) => {
      const result = await providerCollection.find().toArray()
      res.send(result)
    })

    //delete service provider list
    app.delete("/provider/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await providerCollection.deleteOne(query);
      res.send(result);
    });


    //get provider by email
    app.get('/my-provider-status', verifyToken, async (req, res) => {
      const email = req.user.email;
      const result = await providerCollection.find({ email }).toArray();
      res.send(result);
    });


    //Update Provider Status (Accept / Reject)
    app.patch('/update-provider-status/:id', async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;

      const result = await providerCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            status,
            updatedAt: new Date()
          }
        }
      );

      res.send(result);
    });


    //Save booking data
    app.post('/bookings', async (req, res) => {
      const bookingForm = {
        ...req.body,
        status: "pending",
        createdAt: new Date()
      };
      const result = await bookingData.insertOne(bookingForm);
      res.send(result);
    });


    //Cancel order by user
    app.patch('/cancel-order/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const email = req.user.email;

      const result = await bookingData.updateOne(
        { _id: new ObjectId(id), customerEmail: email },
        {
          $set: {
            status: "cancelled",
            updatedAt: new Date()
          }
        }
      );

      res.send(result);
    });


    // Get orders for logged user
    app.get("/my-orders", verifyToken, async (req, res) => {
      try {
        const email = req.user.email;

        const result = await bookingData
          .find({ customerEmail: email })
          .sort({ createdAt: -1 })
          .toArray();

        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch orders" });
      }
    });








    //Payment route 
    app.post('/create-payment/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const booking = await bookingData.findOne({ _id: new ObjectId(id) });
        if (!booking) return res.status(404).send({ error: "Booking not found" });

        const data = {
          total_amount: booking.price,
          currency: 'BDT',
          tran_id: id,

          success_url: `http://localhost:${port}/success/${id}`,
          fail_url: `http://localhost:${port}/fail/${id}`,
          cancel_url: `http://localhost:${port}/cancel/${id}`,
          ipn_url: `http://localhost:${port}/ipn`,

          shipping_method: 'NO',
          product_name: booking.serviceName,
          product_category: 'Service',
          product_profile: 'general',

          cus_name: booking.customerName,
          cus_email: "customer@gmail.com",
          cus_add1: booking.address,
          cus_add2: booking.area,
          cus_city: booking.city,
          cus_state: booking.city,
          cus_postcode: '1207',
          cus_country: booking.country,
          cus_phone: booking.phone,

          ship_name: booking.customerName,
          ship_add1: booking.address,
          ship_city: booking.city,
          ship_state: booking.city,
          ship_postcode: 1000,
          ship_country: booking.country,
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

        sslcz.init(data).then(apiResponse => {
          res.send({ url: apiResponse.GatewayPageURL });
        });

      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Payment failed" });
      }
    });


    app.post('/success/:id', async (req, res) => {
      const id = req.params.id;
      await bookingData.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "paid" } }
      );
      res.redirect(`http://localhost:5173/payment-success/${id}`);
    });

    app.post('/fail/:id', async (req, res) => {
      const id = req.params.id;
      await bookingData.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "failed" } }
      );
      res.redirect(`http://localhost:5173/payment-failed/${id}`);

    });

    app.post('/cancel/:id', async (req, res) => {
      const id = req.params.id;
      await bookingData.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "cancelled" } }
      );
      res.redirect(`http://localhost:5173/payment-cancelled/${id}`);
    });


    // Active Orders
    app.get('/service-queue', async (req, res) => {
      const result = await bookingData
        .find({ status: { $in: ["paid", "processing"] } })
        .sort({ createdAt: 1 })
        .toArray();
      res.send(result);
    });


    // Completed History
    app.get('/completed-services', async (req, res) => {
      const result = await bookingData
        .find({ status: "completed" })
        .sort({ updatedAt: -1 })
        .toArray();
      res.send(result);
    });


    // Status Update with updatedAt
    app.patch('/update-booking-status/:id', async (req, res) => {
      const id = req.params.id;
      const { status } = req.body;

      const result = await bookingData.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } }
      );
      res.send(result);
    });



    //user save route
    app.post('/users', async (req, res) => {
      const user = req.body

      const existingUser = await usersCollection.findOne({ email: user.email })
      if (existingUser) {
        return res.send({ message: 'User already exists' })
      }

      const result = await usersCollection.insertOne({
        ...user,
        role: 'user', // default role
        createdAt: new Date()
      })

      res.send(result)
    })


    //Get user by email
    app.get("/users/:email", verifyToken, async (req, res) => {
      if (req.params.email !== req.user.email) {
        return res.status(403).send({ message: "Forbidden" });
      }

      const result = await usersCollection.findOne({
        email: req.params.email,
      });

      res.send(result);
    });



    //Admin route secure
    app.get('/admin-bookings', verifyToken, verifyAdmin(usersCollection), async (req, res) => {
      const result = await bookingData.find().toArray();
      res.send(result);
    });


    // Admin Dashboard Stats
    app.get('/admin-stats', verifyToken, verifyAdmin(usersCollection), async (req, res) => {
      const totalServices = await serviceCollection.countDocuments();
      const totalBookings = await bookingData.countDocuments();
      const completedBookings = await bookingData.countDocuments({ status: "completed" });
      const totalProviders = await providerCollection.countDocuments();
      const totalRevenueAgg = await bookingData.aggregate([
        { $match: { status: "paid" } },
        { $group: { _id: null, total: { $sum: "$price" } } },
      ]).toArray();
      const totalRevenue = totalRevenueAgg[0]?.total || 0;
      const recentBookings = await bookingData.find().sort({ createdAt: -1 }).limit(5).toArray();

      res.send({ totalServices, totalBookings, completedBookings, totalProviders, totalRevenue, recentBookings });
    });




    // Save contact message
    app.post("/contact-messages", async (req, res) => {
      try {
        const messageData = {
          ...req.body,
          createdAt: new Date(),
        };

        const result = await db
          .collection("contactMessages")
          .insertOne(messageData);

        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to save message" });
      }
    });


    //Get message data in admin dashboard
    app.get("/contact-messages", verifyToken, verifyAdmin(usersCollection), async (req, res) => {
      const result = await db.collection("contactMessages").find().sort({ createdAt: -1 }).toArray();
      res.json(result);
    }
    );



    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Hello from SoloSphere Server....')
})

app.listen(port, () => console.log(`Server running on port ${port}`))
