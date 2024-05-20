import Login from "../components/Login";
import Register from "../components/Register";
import Layout from "../components/Layout";
import Home from "../components/home/Home";
import { Navigate } from "react-router";
import Figure from "../components/figure/Figure";
import Digital from "../components/digital/Digital";
import Clothing from "../components/clothing/Clothing";
import Pillow from "../components/pillow/Pillow";
import Daily from "../components/daily/Daily";
import Detail from "../components/detail/Detail";
import UserReviews from "../components/detail/UserReviews";
import Contact from "../components/detail/Contact";
import ProductDetail from "../components/detail/ProductDetail";
import SearchList from "../components/SearchList";
import Cart from "../components/Cart";
import AllOrders from "../components/AllOrders";
import PerCenter from "../components/PerCenter";
import WeChat from "../components/WeChat";
import AliPay from "../components/AliPay";
import User from "../components/management/user/User";
import Product from "../components/management/product/Product";
import ProductType from "../components/management/productType/ProductType";
import AboutUs from "../components/about/AboutUs";
import AboutDao from "../components/about/AboutDao";
import AboutJu from "../components/about/AboutJu";
import RegistrationAndLogin from "../components/about/RegistrationAndLogin";
import ProductPurchaseRestrictions from "../components/about/ProductPurchaseRestrictions";
import ViewOrder from "../components/about/ViewOrder";
import HowToPay from "../components/about/HowToPay";
import DeliveryServiceDescription from "../components/about/DeliveryServiceDescription";
import DeliveryProgressQuery from "../components/about/DeliveryProgressQuery";
import UseCoupons from "../components/about/UseCoupons";
import ApplyForInvoicing from "../components/about/ApplyForInvoicing";
import ReturnsAndExchanges from "../components/about/ReturnsAndExchanges";
import ModifyOrder from "../components/about/ModifyOrder";
import ItemManagement from "../components/management/merchant/ItemManagement";

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "figure",
        element: <Figure />,
      },
      {
        path: "digital",
        element: <Digital />,
      },
      {
        path: "clothing",
        element: <Clothing />,
      },
      {
        path: "pillow",
        element: <Pillow />,
      },
      {
        path: "daily",
        element: <Daily />,
      },
      {
        path: "searchList",
        element: <SearchList />,
      },
      {
        path: "cart",
        element: <Cart />,
        children: [
          {
            path: "weChat",
            element: <WeChat />,
          },
          {
            path: "aliPay",
            element: <AliPay />,
          },
          {
            path: "",
            element: <Navigate to="weChat" />,
          },
        ],
      },
      {
        path: "allOrders",
        element: <AllOrders />,
      },
      {
        path: "perCenter",
        element: <PerCenter />,
      },
      {
        path: "detail",
        element: <Detail />,
        children: [
          {
            path: "productDetail",
            element: <ProductDetail />,
          },
          {
            path: "userReviews",
            element: <UserReviews />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "",
            element: <Navigate to="productDetail" />,
          },
        ],
      },
      {
        path: "aboutUs",
        element: <AboutUs />,
        children: [
          {
            path: "registrationAndLogin",
            element: <RegistrationAndLogin />,
          },
          {
            path: "productPurchaseRestrictions",
            element: <ProductPurchaseRestrictions />,
          },
          {
            path: "viewOrder",
            element: <ViewOrder />,
          },
          {
            path: "howToPay",
            element: <HowToPay />,
          },
          {
            path: "deliveryServiceDescription",
            element: <DeliveryServiceDescription />,
          },
          {
            path: "deliveryProgressQuery",
            element: <DeliveryProgressQuery />,
          },
          {
            path: "useCoupons",
            element: <UseCoupons />,
          },
          {
            path: "applyForInvoicing",
            element: <ApplyForInvoicing />,
          },
          {
            path: "returnsAndExchanges",
            element: <ReturnsAndExchanges />,
          },
          {
            path: "modifyOrder",
            element: <ModifyOrder />,
          },
          {
            path: "aboutDao",
            element: <AboutDao />,
          },
          {
            path: "aboutJu",
            element: <AboutJu />,
          },
          {
            path: "",
            element: <Navigate to="registrationAndLogin" />,
          },
        ],
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "productType",
        element: <ProductType />,
      },
      {
        path:"itemManagement",
        element:<ItemManagement />
      },
      {
        path: "",
        element: <Navigate to="home" />,
      },
    ],
  },
];
