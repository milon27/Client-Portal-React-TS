import React, { useContext } from 'react'
import Main from '../../../layouts/dashboard/Main'
import ProtectedPage from '../../../layouts/ProtectedPage';
import { StateContext } from '../../../../utils/context/MainContext';
import ClientList from './ClientList';
import useLocalStorage from './../../../../utils/hooks/useLocalStorage';
import User from '../../../../utils/models/User';
import Define from './../../../../utils/Define';
import { Redirect } from 'react-router-dom';
import URL from './../../../../utils/URL';


const AdminHome = () => {
    //ck is he client or admin
    const [user, setUser] = useLocalStorage<User>(Define.AUTH_KEY)

    if (user?.is_admin === false) {
        return <Redirect to={URL.HOME}></Redirect>
    }
    return (
        <ProtectedPage>
            <Main title="Dashboard">
                <ClientList />
            </Main>
        </ProtectedPage>
    )
}

export default AdminHome
