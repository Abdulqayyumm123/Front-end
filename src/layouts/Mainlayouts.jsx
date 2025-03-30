import { Outlet } from "react-router"
import Footer from "../components/footer"
import Navigationbar from "../components/navbar"


function MainLayouts(){
    return(
        <>
          <Navigationbar />
          <Outlet/>
          <Footer/>
        </>
    )
}
export default MainLayouts


