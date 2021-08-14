import React, { useContext } from 'react'
import { Spinner, Alert, Col } from 'react-bootstrap'
import { ColorType } from '../../utils/models/Response'

// import { DispatchContext, StateContext } from './../../utils/context/MainContext';
// import AppAction from './../../utils/context/actions/AppAction';
import AppState from './../../utils/models/AppState';

interface _AlertLoading { loadColor: ColorType }

export default function AlertLoading({ loadColor }: _AlertLoading) {
    const app = AppState()

    // const { app } = useContext(StateContext)
    // const { appDispatch } = useContext(DispatchContext);

    const removeResponse = () => {
        //new AppAction(appDispatch).REMOVE_RESPONSE();
    }



    return (
        <Col xs={12} className="d-flex justify-content-center mb-3" >
            <div>
                {app.loading ? <Spinner animation="border" variant={loadColor} /> : <></>}
                {app.response.type ? <>
                    <Alert variant={app.response.type} onClose={removeResponse} dismissible>
                        <Alert.Heading>{app.response.title}</Alert.Heading>
                        <p>
                            {app.response.desc}
                        </p>
                    </Alert>
                </> : <></>}
            </div>
        </Col>
    )
}