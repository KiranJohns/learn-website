import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import IndividualBar from "../../components/Sidebar/IndividualBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashArchive from "../../components/Home/DashArchive";
import Header from "../../components/Layout/Header/Header";
import BundleResource from "../../components/Home/BundleResource";
import NoSSR from "react-no-ssr";
import ManagerBar from "../../components/Sidebar/ManagerBar";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import NewInDash from "../../components/Sidebar/BarDummy";
import fetchData, { getToken, getUserType } from "../../axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashHeader from "../../components/Layout/Header/DasnboardHeader";
import ErrorMain from "../../components/Error/ErrorMain";

const bundlecourse = () => {
  const router = useRouter();
  const makeRequest = fetchData();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const form = new FormData();
    form.append("course_id", router.query.course_id);
    form.append("bundleId", router.query.bundleId);
    makeRequest("POST", `/bundle/get-course/`, form)
      .then((res) => {
        if (res.data.response.length <= 0) {
          setData(false);
        } else {
          setData(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setData(false);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {!loading && (
        <React.Fragment>
          <main
            className="p-1"
            style={{
              backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)",
            }}
          >
            <NoSSR>
              <DashHeader />
            </NoSSR>
            {data ? (
              <div
                className="container-fluid"
                style={{ borderRadius: "22px", marginTop: "120px" }}
              >
                <div className="row justify-content-md-center">
                  <div
                    className="col-sm-12 col-md-12 col-lg-2 p-0 sidebar-hidden"
                    style={{ backgroundColor: "#212450" }}
                  >
                    {getUserType() == "individual" && <NewInDash />}
                    {getUserType() == "manager" && <ManagerBar />}
                    {getUserType() == "company" && <DashboardBar />}
                  </div>
                  <div className="col-sm col-md-12 col-lg-11 col-xl-9 bg-white">
                    <BundleResource />
                  </div>
                </div>
              </div>
            ) : (
              <ErrorMain />
            )}
          </main>
        </React.Fragment>
      )}
    </>
  );
};

export default bundlecourse;
