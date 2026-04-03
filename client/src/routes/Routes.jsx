import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home'
import Login from '../pages/Authentication/Login'
import Register from '../pages/Authentication/Register'
import ErrorPage from '../pages/ErrorPage'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import Contact from '../components/Contact'
import AddServices from '../pages/AddServices'
import AllServices from '../pages/AllServices'
import PostedServiceList from '../pages/PostedServiceList'
import UpdateService from '../pages/UpdateService'
import ServiceDetails from '../pages/ServiceDetails'
import BookingPage from '../pages/BookingPage'
import ServiceProviderForm from '../pages/ServiceProviderForm'
import ServiceProviderList from '../pages/ServiceProviderList'
import PaymentSuccess from '../components/PaymentSuccess'
import PaymentFailed from '../components/PaymentFailed'
import PaymentCancelled from '../components/PaymentCancelled'
import ActiveOrders from '../pages/ActiveOrders'
import AdminBookings from '../pages/AdminBookings'
import CompletedOrders from '../pages/CompletedOrders'
import MyApproval from '../pages/ServicersRequest'
import AdminDashboard from '../pages/Dashboard/AdminDashboard'
import AdminLayout from '../pages/Dashboard/AdminLayout'
import ContactMessages from '../pages/ContactMessages'
import MyOrders from '../pages/MyOrders'
import TrackOrder from '../pages/TrackOrder'
import ReviewForm from '../pages/reviewsection/ReviewForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/all-services', element: <AllServices /> },
      { path: '/login', element: <Login /> },
      { path: '/provider-form', element: <ServiceProviderForm /> },
      { path: '/registration', element: <Register /> },
      { path: '/contact', element: <Contact /> },
      { path: '/review-form', element: <ReviewForm /> },      
      {
        path: '/service/:id',
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/booking/:serviceId/:subId',
        element: (
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/update/:id',
        element: (
          <PrivateRoute>
            <UpdateService />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-services',
        element: (
          <PrivateRoute>
            <AddServices />
          </PrivateRoute>
        ),
      },
      {
        path: '/servicers-approval',
        element: (
          <PrivateRoute>
            <MyApproval />
          </PrivateRoute>
        ),
      },
      {
        path: '/posted-service-list',
        element: (
          <PrivateRoute>
            <PostedServiceList />
          </PrivateRoute>
        ),
      },
      {
        path: '/service-provider-list',
        element: (
          <PrivateRoute>
            <ServiceProviderList />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: '/track-orders',
        element: (
          <PrivateRoute>
            <TrackOrder />
          </PrivateRoute>
        ),
      },

      {
        path: '/active-orders',
        element: (
          <PrivateRoute>
            <ActiveOrders />
          </PrivateRoute>
        ),
      },
      {
        path: '/completed-orders',
        element: (
          <PrivateRoute>
            <CompletedOrders />
          </PrivateRoute>
        ),
      },

      //Admin Only Route
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "bookings", element: <AdminBookings /> },
          { path: "providers", element: <ServiceProviderList /> },
          { path: "services", element: <PostedServiceList /> },
          { path: "add-service", element: <AddServices /> },
          { path: "contact-messages", element: <ContactMessages /> },
        ],
      },

      {
        path: '/payment-success/:id',
        element: <PaymentSuccess />
      },
      {
        path: '/payment-failed/:id',
        element: <PaymentFailed />
      },
      {
        path: '/payment-cancelled/:id',
        element: <PaymentCancelled />
      },

    ],
  },
])

export default router