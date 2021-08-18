import React from 'react'
import ContentWrapper from './ContentWrapper'
import Sidebar from './Sidebar'
import LogoutModal from './LogoutModal';
import { TypeReactChild } from '../../../utils/interface/CommonInterface';
import useLocalStorage from './../../../utils/hooks/useLocalStorage';
import Define from './../../../utils/Define';
import User from '../../../utils/models/User';
import AdminSidebar from './AdminSidebar';

export interface iMain {
    title: string,
    children: TypeReactChild
}

export default function Main({ children, title }: iMain) {

    const [user, setUser] = useLocalStorage<User>(Define.AUTH_KEY)

    return (
        <div>
            {/* <!-- content start --> */}

            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
                {/* <!-- Sidebar --> */}
                {user?.is_admin === true ? <AdminSidebar /> : <Sidebar />}

                {/* <!-- EndofSidebar --> */}
                {/* <!-- Content Wrapper --> */}
                <ContentWrapper title={title}>
                    {children}
                </ContentWrapper>
                {/* <!-- End of Content Wrapper --> */}
            </div>
            {/* <!-- End of Page Wrapper --> */}
            {/* <!-- Scroll to Top Button--> */}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
            {/* <!-- Logout Modal--> */}
            <LogoutModal />
            {/* <!-- content end --> */}
        </div>
    )
}