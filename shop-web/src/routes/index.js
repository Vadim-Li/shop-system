import Login from "../components/Login";
import Register from '../components/Register';
import Layout from "../components/Layout";
import Home from "../components/home/Home";
import { Navigate } from "react-router";
import Figure from '../components/figure/Figure';
import Digital from '../components/digital/Digital';
import Clothing from '../components/clothing/Clothing';
import Pillow from '../components/pillow/Pillow';
import Daily from '../components/daily/Daily';
import Detail from '../components/detail/Detail';
import UserReviews from '../components/detail/UserReviews';
import Contact from '../components/detail/Contact';
import ProductDetail from '../components/detail/ProductDetail';
import SearchList from '../components/SearchList';
import Cart from '../components/Cart'

export default [
  
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path:"register",
        element:<Register />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "figure",
        element: <Figure />
      },
      {
        path: "digital",
        element: <Digital />
      },
      {
        path: "clothing",
        element: <Clothing />
      },
      {
        path: "pillow",
        element: <Pillow />
      },
      {
        path: "daily",
        element: <Daily />
      },
      {
        path: "searchList",
        element: <SearchList />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "detail",
        element: <Detail />,
        children:[
          {
            path:"productDetail",
            element:<ProductDetail />
          },
          {
            path:"userReviews",
            element:<UserReviews/>
          },
          {
            path: "contact",
            element: <Contact />
          },
          {
            path: "",
            element: <Navigate to="productDetail" />
          }
        ]
      },
      {
        path: "",
        element: <Navigate to="home" />
      }
    ]
  }
];
