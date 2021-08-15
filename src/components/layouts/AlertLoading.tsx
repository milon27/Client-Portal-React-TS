import React, { useContext } from 'react'
import { Spinner, Alert, Col } from 'react-bootstrap'
import { ColorType } from '../../utils/models/Response'

import { DispatchContext, StateContext } from './../../utils/context/MainContext';
import AppAction from './../../utils/context/actions/AppAction';


interface iAlertLoading { loadColor: ColorType }

export default function AlertLoading({ loadColor }: iAlertLoading) {

    const { app } = useContext(StateContext)
    const { appDispatch } = useContext(DispatchContext);

    const removeResponse = () => {
        new AppAction(appDispatch!!).REMOVE_RESPONSE();
    }



    return (
        <Col xs={12} className="d-flex justify-content-center mb-3" >
            <div>
                {app?.loading ? <Spinner animation="border" variant={loadColor} /> : <></>}
                {app?.response?.type ? <>
                    <Alert variant={app?.response?.type} onClose={removeResponse} dismissible>
                        <Alert.Heading>{app?.response?.message}</Alert.Heading>
                    </Alert>
                </> : <></>}
            </div>
        </Col>
    )
}