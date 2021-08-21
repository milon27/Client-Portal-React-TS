import { NavLink } from 'react-router-dom';
import URL from './../../../utils/URL';
//global.d.ts
import logo from '../../../assets/img/logo.svg'
import { useEffect } from 'react';
import ListAction from './../../../utils/context/actions/ListAction';
import { DispatchContext } from '../../../utils/context/MainContext';
import { useContext } from 'react';
import { StateContext } from './../../../utils/context/MainContext';
import Page from './../../../utils/models/Page';

// const logo = require('../../../assets/img/logo.svg')
//logo.default
export default function Sidebar() {
    //load all pages for client
    const { pagelist } = useContext(StateContext)
    const { pagelistDispatch, setPage } = useContext(DispatchContext)
    useEffect(() => {
        const source = ListAction.getSource()
        const load = async () => {
            await new ListAction<Page>(pagelistDispatch!).getAll('client/get-pages/', source)
        }
        load()
        return () => {
            source.cancel()
        }
    }, [])

    useEffect(() => {
        if (setPage && pagelist && pagelist[0])
            setPage(pagelist[0].id)
    }, [pagelist?.length])

    return (
        <>
            {/* <!-- Sidebar --> */}
            <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    {/* rotate-n-15 */}
                    <div className="sidebar-brand-icon ">
                        <img src={logo} style={{ width: "100%", height: "50px" }} alt="" />
                    </div>
                    <div className="sidebar-brand-text "><sup>Client Portal</sup></div>
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
                    Your Pages
                </div>
                {pagelist?.map(item => {
                    return <li key={item.id} className="nav-item" onClick={() => {
                        if (setPage)
                            setPage(item.id)
                    }}>
                        <NavLink exact className="nav-link" to={URL.HOME}>
                            <i className="fas fa-fw fa-award"></i>
                            <span>{item.title}</span>
                        </NavLink>
                    </li>
                })}
                {pagelist?.length! < 1 ?
                    <li className="nav-item ">
                        <NavLink exact activeClassName="active" className="nav-link " to="/">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>No Page Found</span>
                        </NavLink>
                    </li>
                    : ""}

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