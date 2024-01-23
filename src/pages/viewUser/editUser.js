import React, { useEffect, useState } from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import ViewUser from "../../components/Home/UserView";
import Header from "../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import { getUserType } from "../../axios";
import { useRouter } from "next/router";
import DashHeader from "../../components/Layout/Header/DasnboardHeader";
import ManagerBar from "../../components/Sidebar/ManagerBar";


function CompanyCreate() {
    const [logedIn, setlogedIn] = useState(() => {
        return getUserType();
    });

    let routes = ["manager", "company"];

    const router = useRouter();

    useEffect(() => {
        if (!routes.includes(logedIn)) {
            router.push("/sign-in");
        }
    }, []);
    return (
        <>
            {routes.includes(logedIn) && (
                <React.Fragment>
                    <main
                        className="p-1"
                        style={{
                            backgroundImage: "linear-gradient(to left, #EDEEF3, #EDEEF3)",
                        }}
                    >
                        <NoSSR>
                            <DashHeader />
                        </NoSSR>
                        <div className="container-fluid " style={{ marginTop: "120px" }}>
                            <div className="row justify-content-md-center">
                                <div
                                    className="col-sm-12 col-md-12 col-lg-2 p-0 sidebar-hidden"
                                    style={{ backgroundColor: "#212450" }}
                                >
                                    {getUserType() == "manager" && <ManagerBar />}
                                    {getUserType() == "company" && <DashboardBar />}
                                </div>
                                <div className="col-sm col-md-12 col-lg-11 col-xl-9 bg-white">
                                    <ViewUser />
                                </div>
                            </div>
                        </div>
                    </main>
                </React.Fragment>
            )}
        </>
    );
}

export default CompanyCreate;
