import Header from "./Header";
import Footer from './Footer';
// import Home from './home/Home';
import { Outlet } from "react-router-dom";

function Logout(){

    return(
        <>
            <Header />
            {/* <Home /> */}
            <Outlet />
            <Footer />
        </>
        
    )
}

export default Logout;