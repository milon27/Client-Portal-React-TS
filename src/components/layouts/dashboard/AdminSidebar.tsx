import { NavLink } from 'react-router-dom';
import URL from './../../../utils/URL';
//global.d.ts
import logo from '../../../assets/img/logo.png'
import { useEffect } from 'react';
import ListAction from './../../../utils/context/actions/ListAction';
import { DispatchContext } from '../../../utils/context/MainContext';
import { useContext } from 'react';
import { StateContext } from './../../../utils/context/MainContext';
import Page from './../../../utils/models/Page';

// const logo = require('../../../assets/img/logo.svg')
//logo.default
export default function AdminSidebar() {

    return (
        <>
            {/* <!-- Sidebar --> */}
            <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    {/* rotate-n-15 */}
                    <div className="sidebar-brand-icon bg-white rounded">
                        <img src={logo} style={{ width: "100%", height: "60px" }} alt="" />
                    </div>
                    {/* <div className="sidebar-brand-text "><sup>Client Portal</sup></div> */}
                </a>
                {/* <!-- Divider --> */}
                {/* <hr className="sidebar-divider my-0" />


                <li className="nav-item ">
                    <NavLink exact activeClassName="active" className="nav-link " to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li> */}


                {/*<hr className="sidebar-divider" />

                 <div className="sidebar-heading">
                    Options
                </div>
                <li className="nav-item ">
                    <NavLink exact activeClassName="active" className="nav-link" to={URL.HOME}>
                        <i className="fas fa-fw fa-award"></i>
                        <span>Home</span>
                    </NavLink>
                </li> */}
                <hr className="sidebar-divider d-none d-md-block" />
                <div className="sidebar-heading">
                    Options
                </div>

                <li className="nav-item ">
                    <NavLink exact activeClassName="active" className="nav-link " to="/dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                <div className="text-center d-none d-md-inline mt-2">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => {
                        document.getElementById("accordionSidebar")?.classList.toggle("toggled");
                    }}></button>
                </div>
            </ul>
            {/* <!-- End of Sidebar --> */}
        </>
    )
}