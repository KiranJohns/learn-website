import React, { useEffect, useState } from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import TestNew from "../../components/Home/TestNew";
import Header from "../../components/Layout/Header/Header";
import IndividualBar from "../../components/Sidebar/IndividualBar";
import NoSSR from "react-no-ssr";
import NewInDash from "../../components/Sidebar/BarDummy";
import { getUserType } from "../../axios";
import { useRouter } from "next/router";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function sideBarTest() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [logedIn, setlogedIn] = useState(() => {
        return getUserType();
    });
    let routes = ["individual", "sub_user"]

    const router = useRouter();

    useEffect(() => {
        if (!routes.includes(logedIn)) {
            router.push("/sign-in");
        }
    }, []);
    return (
        <>
            {routes.includes(logedIn) && <React.Fragment>
                <main
                    className="p-1"
                    style={{
                        backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)",
                    }}
                >
                    <NoSSR>
                        <Header  />
                    </NoSSR>
                    <div
                        className="container-fluid "
                        style={{ borderRadius: "22px", marginTop: "120px" }}
                    >
                        <div className="row justify-content-md-center">
                            <div  className="col-sm-12 col-md-12 col-lg-2 p-0">
                        <Offcanvas  style={{backgroundColor:"#212a50"}} show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
         
        </Offcanvas.Header>
        <Offcanvas.Body>
   
               
               
           
                <NewInDash />
             
        </Offcanvas.Body>
      </Offcanvas>
      </div>             <div className="col-sm col-md-9 col-lg-9 bg-white">
                                <Button variant="primary" className="d-lg-none" onClick={handleShow}>
                                    Launch
                                </Button>
                                <TestNew />
                            </div>
                        </div>
                    </div>
                </main>

             

            </React.Fragment>}
        </>
    );
}

export default sideBarTest;