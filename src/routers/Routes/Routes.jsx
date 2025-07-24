import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Home from "../../pages/HomePage/Home/Home";
import Cart from "../../pages/CartPage/Cart/Cart";
import Community from "../../pages/CommunityPage/Community/Community";
import Construction from "../../ConstructionPage/Construction/Construction";
import Forgot from "../../pages/AuthPages/Forgot/Forgot";
import Contact from "../../pages/ContactPage/Contact";
import EmailSignUp from "../../pages/AuthPages/EmailSignUp/EmailSignUp";
import PhoneSignUp from "../../pages/AuthPages/PhoneSignUp/PhoneSignUp";
import EmailSignIn from "../../pages/AuthPages/EmailSignIn/EmailSignIn";
import Checkout from "../../pages/CheckoutPage/Checkout";
import Address from "../../pages/BillingAddress/Address";
import ProductDetails from "../../pages/ProductDetailsPage/ProductDetails/ProductDetails";
import CustomerProfileHome from "../../pages/DashboardPages/CustomerPages/CustomerProfileHome/CustomerProfileHome";
import CustomerDashboard from "../../layouts/CustomerDashboard/CustomerDashboard";
import UpdateCustomerAccountDetails from "../../pages/DashboardPages/CustomerPages/UpdateCustomerAccountDetails/UpdateCustomerAccountDetails";
import CustomerAccountDetails from "../../pages/DashboardPages/CustomerPages/CustomerAccountDetails/CustomerAccountDetails";
import SavedProductsList from "../../pages/DashboardPages/CustomerPages/SavedProductsList/SavedProductsList";
import AdminDashboard from "../../layouts/AdminDashboard/AdminDashboard";
import AdminHome from "../../pages/DashboardPages/AdminPages/AdminHome/AdminHome";
import Categories from "../../pages/DashboardPages/AdminPages/Categories/Categories";
import Products from "../../pages/DashboardPages/AdminPages/Products/Products";
import AddProduct from "../../pages/DashboardPages/AdminPages/AddProduct/AddProduct";
import ProductsByCategory from "../../pages/ProductsByCategory/ProductsByCategory";
import UpdateProduct from "../../pages/DashboardPages/AdminPages/UpdateProduct/UpdateProduct";
import Banners from "../../pages/DashboardPages/AdminPages/Banners/Banners";
import PromoCodes from "../../pages/DashboardPages/AdminPages/PromoCodes/PromoCodes";
import Orders from "../../pages/DashboardPages/AdminPages/Orders/Orders";
import ViewOrder from "../../pages/DashboardPages/AdminPages/ViewOrder/ViewOrder";
import ViewUser from "../../pages/DashboardPages/AdminPages/ViewUser/ViewUser";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ContactInfo from "../../pages/DashboardPages/AdminPages/ContactInfo/ContactInfo";
import Features from "../../pages/DashboardPages/AdminPages/Features/Features";
import DeliveryCharge from "../../pages/DashboardPages/AdminPages/DeliveryCharge/DeliveryCharge";
import DiscountOffer from "../../pages/DashboardPages/AdminPages/DiscountOffer/DiscountOffer";

import OrderHistory from "../../pages/DashboardPages/CustomerPages/OrderHistory/OrderHistory";
import EmployeeList from "../../pages/DashboardPages/AdminPages/EmployeeList/EmployeeList";
import ViewEmployee from "../../pages/DashboardPages/AdminPages/ViewEmployee/ViewEmployee";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EmployeeRoute from "../EmployeeRoute/EmployeeRoute";
import EmployeeHome from "../../pages/DashboardPages/EmployeePages/EmployeeHome/EmployeeHome";
import PrivacyPolicy from "../../pages/PolicyPages/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "../../pages/PolicyPages/RefundPolicy/RefundPolicy";
import TermsOfService from "../../pages/PolicyPages/TermsOfService/TermsOfService";
import IntellectualProperty from "../../pages/PolicyPages/IntellectualProperty/IntellectualProperty";
import Privacy from "../../pages/DashboardPages/AdminPages/Privacy/Privacy";
import Refund from "../../pages/DashboardPages/AdminPages/Refund/Refund";
import Terms from "../../pages/DashboardPages/AdminPages/Terms/Terms";
import Property from "../../pages/DashboardPages/AdminPages/Property/Property";
import About from "../../pages/DashboardPages/AdminPages/About/About";
import AboutUs from "../../pages/PolicyPages/AboutUs/AboutUs";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import OrderDetails from "../../pages/DashboardPages/CustomerPages/OrderDetails/OrderDetails";
import SocialMedia from "../../pages/DashboardPages/AdminPages/SocialMedia/SocialMedia";
import SettingsPage from "../../pages/DashboardPages/AdminPages/SettingsPage/SettingsPage";
import Payment from "../../pages/DashboardPages/AdminPages/Payment/Payment";
import PaymentPolicy from "../../pages/PolicyPages/PaymentPolicy/PaymentPolicy";
import ShippingPolicy from "../../pages/PolicyPages/ShippingPolicy/ShippingPolicy";
import Shipping from "../../pages/DashboardPages/AdminPages/Shipping/Shipping";
import YourPoints from "../../pages/DashboardPages/CustomerPages/YourPoints/YourPoints";
import MyRefer from "../../pages/DashboardPages/CustomerPages/MyRefer/MyRefer";
import CustomerList from "../../pages/DashboardPages/AdminPages/CustomerList/CustomerList";
import AdminList from "../../pages/DashboardPages/AdminPages/AdminList/AdminList";
import VideoPlayer from "../../pages/DashboardPages/AdminPages/VideoPlayer/VideoPlayer";
import Notifications from "../../_components/Notifications";
import Upload from "../../_components/upload_tool/Upload";
// import SalesAnalytics from "../../pages/DashboardPages/AdminPages/SalesAnalyticsPages/SalesAnalytics/SalesAnalytics";
import AnalyticsPage from "../../_components/Analytics/AnalyticsPage";



const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/product-details/:url",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/category/:categoryUrl",
        element: <ProductsByCategory></ProductsByCategory>,
      },
      {
        path: "/sign-up-with-email-address",
        element: <EmailSignUp></EmailSignUp>,
      },
      {
        path: "/sign-up-with-phone-number",
        element: <PhoneSignUp></PhoneSignUp>,
      },
      {
        path: "/sign-in-with-email-address",
        element: <EmailSignIn></EmailSignIn>,
      },
      {
        path: "/forgot-password",
        element: <Forgot></Forgot>,
      },
      {
        path: "/contact-with-us",
        element: <Contact></Contact>,
      },
      {
        path: "/shopping-cart",
        element: <Cart></Cart>,
      },
      {
        path: "/checkout",
        element: <Checkout></Checkout>,
      },
      {
        path: "/billing-address",
        element: <Address></Address>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy></RefundPolicy>,
      },
      {
        path: "/shipping-policy",
        element: <ShippingPolicy></ShippingPolicy>,
      },
      {
        path: "/payment-policy",
        element: <PaymentPolicy></PaymentPolicy>,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService></TermsOfService>,
      },
      {
        path: "/intellectual-property",
        element: <IntellectualProperty></IntellectualProperty>,
      },
      {
        path: "/community",
        element: <Community></Community>,
      },
      {
        path: "/profile",
        element: <Construction></Construction>,
      },
    ],
  },

  // Admin Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminDashboard></AdminDashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // Admin Dashboard home page route --- Admin
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      // Employee Dashboard home page route --- Employee
      {
        path: "employee",
        element: (
          <EmployeeRoute>
            <EmployeeHome></EmployeeHome>
          </EmployeeRoute>
        ),
      },
      // Categories route --- Admin & Employee
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories></Categories>
          </ProtectedRoute>
        ),
      },
      // Products related routes --- Admin & Employee
      {
        path: "add-new-product",
        element: (
          <ProtectedRoute>
            <AddProduct></AddProduct>
          </ProtectedRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <ProtectedRoute>
            <UpdateProduct></UpdateProduct>,
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products></Products>
          </ProtectedRoute>
        ),
      },
      // Users related routes --- Admin
      {
        path: "admin-list",
        element: (
          <AdminRoute>
            <AdminList></AdminList>,
          </AdminRoute>
        ),
      },
      {
        path: "view-user/:id",
        element: (
          <AdminRoute>
            <ViewUser></ViewUser>,
          </AdminRoute>
        ),
      },
      {
        path: "employee-list",
        element: (
          <AdminRoute>
            <EmployeeList></EmployeeList>,
          </AdminRoute>
        ),
      },
      {
        path: "customer-list",
        element: (
          <AdminRoute>
            <CustomerList></CustomerList>,
          </AdminRoute>
        ),
      },
      {
        path: "view-employee/:id",
        element: (
          <AdminRoute>
            <ViewEmployee></ViewEmployee>,
          </AdminRoute>
        ),
      },
      // Orders related routes --- Admin & Employee
      {
        path: "all-order",
        element: (
          <ProtectedRoute>
            <Orders></Orders>
          </ProtectedRoute>
        ),
      },
      {
        path: "view-order/:id",
        element: (
          <ProtectedRoute>
            <ViewOrder></ViewOrder>,
          </ProtectedRoute>
        ),
      },
      // Banner route --- Admin & Employee
      {
        path: "banners",
        element: (
          <ProtectedRoute>
            <Banners></Banners>
          </ProtectedRoute>
        ),
      },
      // mohi code 
      {
        path: "analytics",
        element: (
          <ProtectedRoute>
            {/* <SalesAnalytics/> */}
            <AnalyticsPage/>
          </ProtectedRoute>
        )
      },

      
      {
        path: "file-upload",
        element: (
          <ProtectedRoute>
            {/* mohi code */}
           <Upload></Upload>
          </ProtectedRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <ProtectedRoute>
            {/* mohi code */}
            <div>
             <Notifications></Notifications>
            </div>
          </ProtectedRoute>
        ),
      },
      //  Promo Code route --- Admin & Employee
      {
        path: "promo-codes",
        element: (
          <ProtectedRoute>
            <PromoCodes></PromoCodes>
          </ProtectedRoute>
        ),
      },
      // Contact Info update route --- Admin & Employee
      {
        path: "contact-info",
        element: (
          <ProtectedRoute>
            <ContactInfo></ContactInfo>
          </ProtectedRoute>
        ),
      },
      // Features update route --- Admin & Employee
      {
        path: "features",
        element: (
          <ProtectedRoute>
            <Features></Features>
          </ProtectedRoute>
        ),
      },
      // Delivery Charge update route
      {
        path: "delivery-charge",
        element: (
          <AdminRoute>
            <DeliveryCharge></DeliveryCharge>
          </AdminRoute>
        ),
      },
      // Discount Offer update route --- Admin & Employee
      {
        path: "discount-offer",
        element: (
          <ProtectedRoute>
            <DiscountOffer></DiscountOffer>
          </ProtectedRoute>
        ),
      },
      // Video Ads update route --- Admin & Employee
      {
        path: "video-player",
        element: (
          <ProtectedRoute>
            <VideoPlayer></VideoPlayer>
          </ProtectedRoute>
        ),
      },
      // Privacy Policy update route --- Admin
      {
        path: "privacy-policy",
        element: (
          <AdminRoute>
            <Privacy></Privacy>
          </AdminRoute>
        ),
      },
      // About update route --- Admin
      {
        path: "about-us",
        element: (
          <AdminRoute>
            <About></About>
          </AdminRoute>
        ),
      },
      // Social Media update route --- Admin
      {
        path: "social-media",
        element: (
          <AdminRoute>
            <SocialMedia></SocialMedia>
          </AdminRoute>
        ),
      },
      // Refund Policy update route --- Admin
      {
        path: "refund-policy",
        element: (
          <AdminRoute>
            <Refund></Refund>
          </AdminRoute>
        ),
      },
      // Shipping Policy update route --- Admin
      {
        path: "shipping-policy",
        element: (
          <AdminRoute>
            <Shipping></Shipping>
          </AdminRoute>
        ),
      },
      // Payment Policy update route --- Admin
      {
        path: "payment-policy",
        element: (
          <AdminRoute>
            <Payment></Payment>
          </AdminRoute>
        ),
      },
      // Terms Of Service update route --- Admin
      {
        path: "terms-of-service",
        element: (
          <AdminRoute>
            <Terms></Terms>
          </AdminRoute>
        ),
      },
      // Refund Policy update route --- Admin
      {
        path: "intellectual-property",
        element: (
          <AdminRoute>
            <Property></Property>
          </AdminRoute>
        ),
      },
      // Settings update route --- Admin
      {
        path: "settings",
        element: (
          <AdminRoute>
            <SettingsPage></SettingsPage>
          </AdminRoute>
        ),
      },
    ],
  },

  // Customer Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <CustomerDashboard></CustomerDashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "profile",
        element: <CustomerProfileHome></CustomerProfileHome>,
      },
      {
        path: "customer-account-details",
        element: <CustomerAccountDetails></CustomerAccountDetails>,
      },
      {
        path: "update-customer-account-details/:id",
        element: <UpdateCustomerAccountDetails></UpdateCustomerAccountDetails>,
      },
      {
        path: "order-history",
        element: <OrderHistory></OrderHistory>,
      },
      {
        path: "order-details/:id",
        element: <OrderDetails></OrderDetails>,
      },
      {
        path: "saved-products-list",
        element: <SavedProductsList></SavedProductsList>,
      },
      {
        path: "your-points",
        element: <YourPoints></YourPoints>,
      },
      {
        path: "my-refer",
        element: <MyRefer></MyRefer>,
      },
    ],
  },
]);

export default router;
