import { NavLink, useHistory } from 'react-router-dom';
//global.d.ts
import logo from '../../../assets/img/logo.png'
import { useEffect } from 'react';
import AxiosHelper from '../../../utils/AxiosHelper';
import useLocalStorage from '../../../utils/hooks/useLocalStorage';
import Define from '../../../utils/Define';
import User from '../../../utils/models/User';
import URL from './../../../utils/URL';
import SidebarBottom from './SidebarBottom';


// const logo = require('../../../assets/img/logo.svg')
//logo.default
interface iAdminSidebar {
    logout: Function
}

export default function AdminSidebar({ logout }: iAdminSidebar) {


    useEffect(() => {

        //hide sidebar for mobile
        const accordionSidebar = document.getElementById("accordionSidebar")
        if (window.innerWidth <= 768) {
            accordionSidebar?.classList.add("toggled")
        } else {
            accordionSidebar?.classList.remove("toggled")
        }

    }, [])

    return (
        <>
            {/* <!-- Sidebar --> */}
            <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    {/* rotate-n-15 */}
                    <div className="sidebar-brand-icon bg-white rounded">
                        <img src={logo} style={{ width: "114.65px", height: "60px" }} alt="" />
                    </div>
                    {/* <div className="sidebar-brand-text "><sup>Client Portal</sup></div> */}
                </a>


                <div className="sidebar-heading  my-3">
                    Options
                </div>

                <li className="nav-item ">
                    <NavLink exact activeClassName="active" className="nav-link " to="/dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                <SidebarBottom logout={logout} />
            </ul>
            {/* <!-- End of Sidebar --> */}
        </>
    )
}