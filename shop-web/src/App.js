import logo from "./logo.svg";
import "./App.css";

import { useRoutes, Routes } from "react-router-dom";
import routes from "./routes";
import Layout from "./components/Layout";

function App() {
  const element = useRoutes(routes);
  return <div>{element}</div>;
  // return (
  //   <div className="App">
  //     <Layout />
  //   </div>
  // );
}

export default App;
