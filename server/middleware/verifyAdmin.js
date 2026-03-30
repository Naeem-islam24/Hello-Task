const verifyAdmin = (usersCollection) => {
  return async (req, res, next) => {
    const user = await usersCollection.findOne({
      email: req.user.email,
    });

    if (!user || user.role !== "admin") {
      return res.status(403).send({ message: "Forbidden Access" });
    }

    next();
  };
};

module.exports = verifyAdmin;