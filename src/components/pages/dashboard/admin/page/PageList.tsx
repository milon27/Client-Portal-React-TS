import { Button, Col, Row, Table } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Main from "../../../../layouts/dashboard/Main"
import ProtectedPage from "../../../../layouts/ProtectedPage"
import { useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from './../../../../../utils/context/MainContext';
import ListAction from "../../../../../utils/context/actions/ListAction";
import Page from './../../../../../utils/models/Page';
import PageModal from "./PageModal";
import { useState } from 'react';
import AlertLoading from "../../../../layouts/AlertLoading";
import { ColorType } from "../../../../../utils/models/Response";
import URL from './../../../../../utils/URL';
import AppAction from "../../../../../utils/context/actions/AppAction";

const PageList = () => {
    const { uid } = useParams<{ uid: string }>()
    const { pagelist } = useContext(StateContext)
    const { pagelistDispatch, appDispatch } = useContext(DispatchContext)

    //load all pages for a client
    useEffect(() => {
        const source = ListAction.getSource()
        const load = async () => {
            //http://localhost:2727/client/get-pages?cid=1
            await new ListAction<Page>(pagelistDispatch!).getAll('client/get-pages?cid=' + uid, source)

            // const res = await AxiosHelper.getData('client/get-pages?cid=' + uid, source)
            // console.log("test", res)
        }
        load()
        return () => {
            source.cancel()
        }
    }, [uid])

    //local state
    const [show, setShow] = useState(false)


    //local method
    const pageDelete = async (page: Page) => {

        const ok = window.confirm("are you sure to delete?")
        if (ok) {
            const appA = new AppAction(appDispatch!)
            appA.START_LOADING()
            //admin/delete/user/:uid
            await new ListAction(pagelistDispatch!).deleteData(`admin/delete/page/${page.id}`, "id", page)
            appA.STOP_LOADING()
        }
    }

    return (
        <ProtectedPage>

            <Main title="Dashboard">
                <PageModal show={show} setShow={setShow} uid={parseInt(uid)} />
                <Row >
                    <Col className="d-flex justify-content-center mb-3">
                        <AlertLoading loadColor={ColorType.INFO} />
                    </Col>
                </Row>
                <Row >
                    <Col className="d-flex justify-content-end mb-3">
                        <Button onClick={() => { setShow(true) }}>Add New Page</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        < Table striped bordered hover responsive >
                            <thead>
                                <tr>
                                    <th>ID#</th>
                                    <th>Page Title</th>
                                    <th>Data One URL</th>
                                    <th>Data Two URL</th>
                                    <th>Data Three URL</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagelist?.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.data_one.length > 25 ? item.data_one.slice(0, 25) + "..." : item.data_one}</td>
                                            <td>{item.data_two.length > 25 ? item.data_two.slice(0, 25) + "..." : item.data_two}</td>
                                            <td>{item.data_three.length > 25 ? item.data_three.slice(0, 25) + "..." : item.data_three}</td>
                                            <td>
                                                <Link to={`${URL.ADMIN_HOME}/page/${item.uid}/${item.id}`} className="btn text-info bg-transparent">
                                                    Add File
                                                </Link>
                                                <button
                                                    className="btn text-info  bg-transparent"
                                                    onClick={() => { }}
                                                >
                                                    <i className="far fa-edit"></i>
                                                </button>
                                                <button
                                                    className="btn text-info  bg-transparent"
                                                    onClick={() => {
                                                        pageDelete(item)
                                                    }}
                                                >
                                                    <i className="far fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Main >
        </ProtectedPage >
    )
}

export default PageList
