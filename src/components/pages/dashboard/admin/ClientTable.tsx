import React, { useContext } from 'react'
import { DispatchContext, StateContext } from './../../../../utils/context/MainContext';
import { Table } from 'react-bootstrap';
import User from '../../../../utils/models/User';
import { Link } from 'react-router-dom';
import URL from './../../../../utils/URL';
import ListAction from './../../../../utils/context/actions/ListAction';
import AppAction from './../../../../utils/context/actions/AppAction';


const ClientTable = () => {
    const { clientlist } = useContext(StateContext)
    const { clientlistDispatch, appDispatch } = useContext(DispatchContext)

    const clientDelete = async (user: User) => {

        const ok = window.confirm("are you sure to delete?")
        if (ok) {
            const appA = new AppAction(appDispatch!)
            appA.START_LOADING()
            //admin/delete/user/:uid
            await new ListAction(clientlistDispatch!).deleteData(`admin/delete/user/${user.id}`, "id", user)
            appA.STOP_LOADING()
        }
    }

    return (
        <div>
            {clientlist?.length! > 0 ? (
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientlist?.map((item: User) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td><a href={item.email} target="blank">{item.email}</a></td>
                                        <td>
                                            <Link to={`${URL.ADMIN_HOME}/page/${item?.id}`} className="btn text-info bg-transparent">
                                                Add Page
                                            </Link>

                                            <button
                                                className="btn text-info  bg-transparent"
                                                onClick={() => {
                                                    clientDelete(item)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </>
            ) : (
                <div>
                    <h3 className="text-center">No Client Added Yet</h3>
                </div>
            )}
        </div>
    )
}

export default ClientTable
