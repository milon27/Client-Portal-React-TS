import React, { useContext } from 'react'
import Main from '../../../layouts/dashboard/Main'
import ProtectedPage from '../../../layouts/ProtectedPage';
import { StateContext } from '../../../../utils/context/MainContext';


const AdminHome = () => {

    return (
        <ProtectedPage>
            <Main title="Dashboard">
                show client list.
            </Main>
        </ProtectedPage>
    )
}

export default AdminHome
