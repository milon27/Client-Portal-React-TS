import React from 'react'
import ContentWrapper from './ContentWrapper'
import Sidebar from './Sidebar'
import LogoutModal from './LogoutModal';
import { TypeReactChild } from '../../../utils/interface/CommonInterface';
import useLocalStorage from './../../../utils/hooks/useLocalStorage';
import Define from './../../../utils/Define';
import User from '../../../utils/models/User';
import AdminSidebar from './AdminSidebar';
import { useHistory } from 'react-router-dom';
import AxiosHelper from '../../../utils/AxiosHelper';
import URL from './../../../utils/URL';

export interface iMain {
    title: string,
    children: TypeReactChild
}

export default function Main({ children, title }: iMain) {

    const [user, setUser] = useLocalStorage<User>(Define.AUTH_KEY)

    const history = useHistory()

    const logout = async () => {
        //clear cookie
        await AxiosHelper.simpleGet('auth/logout')
        //clear localstate/storage
        setUser(null)
        history.push(URL.LOGIN)
    }


    return (
        <div>
            {/* <!-- content start --> */}

            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
                {/* <!-- Sidebar --> */}
                {user?.is_admin === true ? <AdminSidebar logout={logout} /> : <Sidebar logout={logout} />}

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