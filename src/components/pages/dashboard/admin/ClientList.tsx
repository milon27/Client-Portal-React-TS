import { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import User from '../../../../utils/models/User';
import { DispatchContext, StateContext } from './../../../../utils/context/MainContext';
import ListAction from './../../../../utils/context/actions/ListAction';
import ClientTable from './ClientTable';
import Define from './../../../../utils/Define';
import AlertLoading from '../../../layouts/AlertLoading';
import { ColorType } from '../../../../utils/models/Response';

const ClientList = () => {
    const { clientlist } = useContext(StateContext)
    const { clientlistDispatch } = useContext(DispatchContext)

    //local state
    const [page, setPage] = useState<number>(1);

    //pagination handle
    const prev = () => {
        if (page > 1) {
            setPage(page => page - 1)
        } else {
            alert("no prev")
        }
    }
    const next = () => {
        if (clientlist?.length! < Define.TOTAL_PAGE_SIZE) {
            //next page not availble
            alert("no next")
        } else {
            setPage(page => page + 1)
        }
    }



    //load all clients
    useEffect(() => {
        const source = ListAction.getSource()
        const load = async () => {
            await new ListAction<User>(clientlistDispatch!).getAll('client/all/' + page, source)
        }
        load()
        return () => {
            source.cancel()
        }
    }, [page])

    return (
        <div>
            <>
                <Row >
                    <Col className="d-flex justify-content-center mb-3">
                        <AlertLoading loadColor={ColorType.INFO} />
                    </Col>
                </Row>
                <Row >
                    <Col className="d-flex justify-content-start mb-3">
                        <Button className="mr-2" onClick={prev}>Prev</Button>
                        <Button className="mr-2" disabled>{page}</Button>
                        <Button className="mr-2" onClick={next}>Next</Button>
                    </Col>
                    {/* <Col className="d-flex justify-content-end mb-3">
                        <Button onClick={() => { setShow(true) }}>Create New Client</Button>
                    </Col> */}
                </Row>
                <Row>
                    <Col>
                        <ClientTable />
                    </Col>
                </Row>
            </>
        </div>
    )
}

export default ClientList
