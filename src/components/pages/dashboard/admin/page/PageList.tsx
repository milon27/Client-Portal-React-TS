import { Button, Col, Row, Table } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Main from "../../../../layouts/dashboard/Main"
import ProtectedPage from "../../../../layouts/ProtectedPage"
import { useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from './../../../../../utils/context/MainContext';
import ListAction from "../../../../../utils/context/actions/ListAction";
import Page from './../../../../../utils/models/Page';
import { useState } from 'react';
import AlertLoading from "../../../../layouts/AlertLoading";
import { ColorType } from "../../../../../utils/models/Response";
import URL from './../../../../../utils/URL';
import AppAction from "../../../../../utils/context/actions/AppAction";
import PageModal from './PageModal';

const PageList = () => {
    const { uid } = useParams<{ uid: string }>()
    const { pagelist } = useContext(StateContext)
    const { pagelistDispatch, appDispatch } = useContext(DispatchContext)

    //load all pages for a client
    useEffect(() => {
        const source = ListAction.getSource()
        const load = async () => {
            //http://localhost:2727/page/get-pages?cid=1
            await new ListAction<Page>(pagelistDispatch!).getAll('page/get-pages?cid=' + uid, source)

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
    const pinit = new Page(-1, parseInt(uid), "", "", "", "", "", "")
    const [initPage, setInitPage] = useState(pinit)


    //local method
    const updatePage = (page: Page) => {
        //populate the item
        setInitPage(page)
        //show the modal
        setShow(true)
    }

    const pageDelete = async (page: Page) => {

        const ok = window.confirm("are you sure to delete?")
        if (ok) {
            const appA = new AppAction(appDispatch!)
            appA.START_LOADING()
            //page/delete/page/:pid
            await new ListAction(pagelistDispatch!).deleteData(`page/delete/page/${page.id}`, "id", page)
            appA.STOP_LOADING()
        }
    }

    return (
        <ProtectedPage>

            <Main title="Dashboard">
                <PageModal show={show} setShow={setShow} page={initPage} setPage={setInitPage} />
                < Row >
                    <Col className="d-flex justify-content-center mb-3">
                        <AlertLoading loadColor={ColorType.INFO} />
                    </Col>
                </Row>
                <Row >
                    <Col className="d-flex justify-content-end mb-3">
                        <Button onClick={() => {
                            setInitPage(pinit)
                            setShow(true)
                        }}>Add New Page</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        < Table striped bordered hover responsive >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Icon</th>
                                    <th>Page Title</th>
                                    <th>Sidebar Title</th>
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
                                            <td><i className={item.icon}></i></td>
                                            <td>{item.title}</td>
                                            <td>{item.title_sidebar}</td>
                                            <td>{item.data_one.length > 20 ? item.data_one.slice(0, 20) + "..." : item.data_one}</td>
                                            <td>{item.data_two.length > 20 ? item.data_two.slice(0, 20) + "..." : item.data_two}</td>
                                            <td>{item.data_three.length > 20 ? item.data_three.slice(0, 20) + "..." : item.data_three}</td>
                                            <td>
                                                <Link to={`${URL.ADMIN_HOME}/page/${item.uid}/${item.id}`} className="btn text-info bg-transparent">
                                                    Add File
                                                </Link>
                                                <button
                                                    className="btn text-info  bg-transparent"
                                                    onClick={() => {
                                                        updatePage(item)
                                                    }}
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
