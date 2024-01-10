import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import fetchData, { getUserType } from "../../../axios";
import DashboardBar from "../../Sidebar/DashboardBar";
import NewInDash from "../../Sidebar/BarDummy";
import ManagerBar from "../../Sidebar/ManagerBar";


const BurgerDash = ({ setMenuOpen, menuOpen }) => {
  const [home, setHome] = useState(false);
  const [courses, setcourses] = useState(false);
  const [blog, setBlog] = useState(false);
  const [pages, setPages] = useState(false);
  const [bundles, setbundles] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [course, setCourse] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  const makeRequest = fetchData();

  const router = useRouter();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(router.pathname);
  }, [router]);

  let logedIn = null;
  if (typeof window == "object") {
    logedIn = localStorage.getItem("learnforcare_access");
  }

  const handleLogout = () => {
    localStorage.removeItem(`learnforcare_access`);
    localStorage.removeItem(`learnforcare_refresh`);
    localStorage.removeItem("userType");
    location.pathname = "/sign-in";
  };

  const openMobileMenu = (menu) => {
    if (menu == "home") {
      setHome(!home);
      setcourses(false);
      setBlog(false);
      setPages(false);
      setbundles(false);
      setDashboard(false);
    } else if (menu == "courses") {
      setHome(false);
      setcourses(!courses);
      setBlog(false);
      setPages(false);
      setDashboard(false);
    } else if (menu == "blog") {
      setHome(false);
      setcourses(false);
      setBlog(!blog);
      setPages(false);
      setDashboard(false);
    } else if (menu == "pages") {
      setHome(false);
      setcourses(false);
      setBlog(false);
      setPages(!pages);
      setDashboard(false);
    } else if (menu == "bundles") {
      setHome(false);
      setcourses(false);
      setBlog(false);
      setPages(false);
      setbundles(!bundles);
    } else if (menu == "dashboard") {
      setHome(false);
      setcourses(false);
      setBlog(false);
      setPages(false);
      setDashboard(!bundles);
      setbundles(false);
    }
  };

  useEffect(() => {
    function getAllCourse() {
      makeRequest("GET", "/course/get-all-course")
        .then((res) => {
          setCourse(res.data.response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getAllCourse();
  }, []);

  function handleSearch(e) {
    e.persist();
    setSearchString(() => e.target?.value);
    setSearchProduct(() =>
      course.filter((item) =>
        item?.name?.toLowerCase()?.startsWith(e.target?.value?.toLowerCase())
      )
    );
  }

  return (
    <div style={{backgroundColor:"#212a50"}} className={menuOpen ? "sidebar__area open" : "sidebar__area"}>

        <div style={{display:'flex',justifyContent:"right", marginRight:"1rem"}}>
            <span  onClick={() => setMenuOpen(false)}>
              <i className="fas fa-times text-white"></i>
            </span>
          </div>
        <div className="sidebar__close">
       
        </div>
     
        <div className=""
                  style={{ backgroundColor: "#212450" }}
                >
                {getUserType() == "individual" && <NewInDash />}
                  {getUserType() == "manager" && <ManagerBar />}
                  {getUserType() == "company" && <DashboardBar />}
        
      </div>
      
      </div>

  );
};

export default BurgerDash;