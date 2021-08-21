import React, { useState } from 'react'
import { TypeOnChange, TypeSetState } from '../../../../../utils/interface/CommonInterface'
import Input from '../../../../layouts/form/Input'
import MyModal from '../../../../layouts/modal/MyModal'
import ListAction from './../../../../../utils/context/actions/ListAction';
import { useContext } from 'react';
import { DispatchContext } from '../../../../../utils/context/MainContext';
import Page from '../../../../../utils/models/Page';
import { StateContext } from './../../../../../utils/context/MainContext';
import AppAction from './../../../../../utils/context/actions/AppAction';

interface iPageModal {
    show: boolean,
    setShow: TypeSetState<boolean>,
    page: Page,
    setPage: TypeSetState<Page>
}


const PageModal: React.FC<iPageModal> = ({ show, setShow, page, setPage }) => {

    const { app } = useContext(StateContext)
    const { pagelistDispatch, appDispatch } = useContext(DispatchContext)

    const onChange = (e: TypeOnChange) => {
        setPage({ ...page, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const myapp = new AppAction(appDispatch!)

        if (page.id === -1) {
            myapp.START_LOADING()
            setShow(false)
            const result = await new ListAction<Page>(pagelistDispatch!).addData('client/create-page/', page)
            myapp.SET_RESPONSE(result)
            myapp.STOP_LOADING()
        } else {
            //update value
            myapp.START_LOADING()
            setShow(false)
            const result = await new ListAction<Page>(pagelistDispatch!).updateData('admin/update/page', page, "id")
            myapp.SET_RESPONSE(result)
            myapp.STOP_LOADING()
        }
    }


    return (
        <div>
            <MyModal
                title="Create New Page"
                show={show}
                setShow={setShow}
                onSubmit={onSubmit}
            >
                <Input
                    name="title"
                    title="Page Title"
                    value={page.title}
                    onChange={onChange}
                    disable={app?.loading!}
                    type="text"
                />

                <Input
                    name="data_one"
                    title="Databox url 1."
                    value={page.data_one}
                    onChange={onChange}
                    disable={app?.loading!}
                    type="text"
                />
                <Input
                    name="data_two"
                    title="Databox url 2."
                    value={page.data_two}
                    onChange={onChange}
                    disable={app?.loading!}
                    type="text"
                />
                <Input
                    name="data_three"
                    title="Databox url 3."
                    value={page.data_three}
                    onChange={onChange}
                    disable={app?.loading!}
                    type="text"
                />
            </MyModal>
        </div>
    )
}

export default PageModal
