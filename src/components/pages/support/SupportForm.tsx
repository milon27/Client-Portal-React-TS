import React from 'react'
import Main from '../../layouts/dashboard/Main'
import ProtectedPage from '../../layouts/ProtectedPage'
import { useContext, useEffect } from 'react';
import { DispatchContext } from './../../../utils/context/MainContext';

function SupportForm() {

    return (

        <ProtectedPage>
            <Main title={"Support"}>

                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSermKsZKo-m9xdAj-GUn6WzXMgS_jTZTzhhv6dBZ5Ss7Np4hw/viewform?embedded=true" width="100%" height="500" frameBorder="0" marginHeight={0} marginWidth={0}>Loading…</iframe>

            </Main>
        </ProtectedPage>
    )
}

export default SupportForm
