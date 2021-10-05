import Router from "./components/routers/Router";
import axios from 'axios'
import Define from './utils/Define';
import MainContext from './utils/context/MainContext';
import { useEffect } from 'react';

//setup axios
axios.defaults.baseURL = Define.API_BASE_URL
axios.defaults.withCredentials = true

export default function App() {



  useEffect(() => {
    //hide sidebar for mobile
    const pageTop = document.getElementById("page-top")
    if (window.innerWidth <= 768) {
      pageTop?.classList.add("sidebar-toggled")
      // const accordionSidebar = document.getElementById("accordionSidebar")
      // accordionSidebar?.classList.add("toggled")
    } else {
      pageTop?.classList.remove("sidebar-toggled")
    }
  }, [])

  return (
    <MainContext>
      <Router />
    </MainContext>
  )
}