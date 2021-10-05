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
import SidebarBottom from './SidebarBottom';

// const logo = require('../../../assets/img/logo.svg')
//logo.default


interface iSidebar {
    logout: Function
}

export default function Sidebar({ logout }: iSidebar) {
    //load all pages for client
    const { page, pagelist } = useContext(StateContext)
    const { pagelistDispatch, setPage } = useContext(DispatchContext)
    useEffect(() => {
        const source = ListAction.getSource()
        const load = async () => {
            await new ListAction<Page>(pagelistDispatch!).getAll('page/get-pages/', source)
        }
        load()

        //hide sidebar for mobile
        const accordionSidebar = document.getElementById("accordionSidebar")
        if (window.innerWidth <= 768) {
            accordionSidebar?.classList.add("toggled")
        } else {
            accordionSidebar?.classList.remove("toggled")
        }

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
            <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion " id="accordionSidebar">
                {/* <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    {/* rotate-n-15 */}
                    <div className="sidebar-brand-icon bg-white rounded">
                        <img src={logo} style={{ width: "80%", height: "auto" }} alt="" />
                    </div>
                </a>

                <div className="sidebar-heading my-3">
                    Your Pages
                </div>
                {pagelist?.map(item => {
                    const isActive = page === item.id ? "nav-item active" : "nav-item"

                    return <li key={item.id} className={isActive} onClick={() => {
                        if (setPage)
                            setPage(item.id)
                    }}>
                        <NavLink exact className="nav-link" to={URL.HOME}>
                            <i className={item.icon} style={{ fontSize: "20px" }}></i>
                            <span>{item.title_sidebar}</span>
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
                <SidebarBottom logout={logout} />


            </ul>
            {/* <!-- End of Sidebar --> */}
        </>
    )
}