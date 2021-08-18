import { Button, Col, Row, Table } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Main from "../../../../../layouts/dashboard/Main"
import ProtectedPage from "../../../../../layouts/ProtectedPage"
import { useContext, useEffect } from 'react';
import ListAction from "../../../../../../utils/context/actions/ListAction";
import PageModal from "../PageModal";
import { useState } from 'react';
import AlertLoading from "../../../../../layouts/AlertLoading";
import { ColorType } from "../../../../../../utils/models/Response";
import { DispatchContext, StateContext } from './../../../../../../utils/context/MainContext';
import PageFile from './../../../../../../utils/models/PageFile';
import FileModal from './FileModal';

const FileList = () => {
    const { uid, pid } = useParams<{ uid: string, pid: string }>()
    const { filelist } = useContext(StateContext)
    const { filelistDispatch } = useContext(DispatchContext)

    //load all pages for a client
    useEffect(() => {
        const source = ListAction.getSource()
        const load = async () => {
            //http://localhost:2727/client/only-files/:pid
            await new ListAction<PageFile>(filelistDispatch!).getAll('client/only-files/' + pid, source)

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

    return (
        <ProtectedPage>

            <Main title="Dashboard">
                <FileModal show={show} setShow={setShow} pid={parseInt(pid)} />
                <Row>
                    <Col className="d-flex justify-content-center mb-3">
                        <AlertLoading loadColor={ColorType.INFO} />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end mb-3">
                        <Button onClick={() => { setShow(true) }}>Add New File</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        < Table striped bordered hover responsive >
                            <thead>
                                <tr>
                                    <th>ID#</th>
                                    <th>File Title</th>
                                    <th>File URL</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            {console.log(filelist)}
                            <tbody>
                                {filelist?.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.url}</td>
                                            <td>
                                                <button
                                                    className="btn text-info  bg-transparent"
                                                    onClick={() => { }}
                                                >
                                                    <i className="far fa-edit"></i>
                                                </button>
                                                <button
                                                    className="btn text-info  bg-transparent"
                                                    onClick={() => { }}
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

export default FileList
