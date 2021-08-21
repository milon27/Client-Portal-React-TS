import React, { useState, useContext } from 'react'
import { TypeOnChange, TypeSetState } from '../../../../../../utils/interface/CommonInterface'
import Input from '../../../../../layouts/form/Input'
import MyModal from '../../../../../layouts/modal/MyModal'
import ListAction from './../../../../../../utils/context/actions/ListAction';
import { DispatchContext } from '../../../../../../utils/context/MainContext';
import { StateContext } from './../../../../../../utils/context/MainContext';
import AppAction from './../../../../../../utils/context/actions/AppAction';
import PageFile from './../../../../../../utils/models/PageFile';

interface iFileModal {
    show: boolean,
    setShow: TypeSetState<boolean>,
    pid: number
}


const FileModal: React.FC<iFileModal> = ({ show, setShow, pid }) => {

    const init = new PageFile(-1, pid, "", "")
    const [file, setFile] = useState<PageFile>(init);
    const [img, setImg] = useState<any>()

    const { app } = useContext(StateContext)
    const { filelistDispatch, appDispatch } = useContext(DispatchContext)

    const onChange = (e: TypeOnChange) => {
        setFile({ ...file, [e.target.name]: e.target.value });
    };

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            setImg(e.target.files[0])
        }
    }


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const myapp = new AppAction(appDispatch!)
        myapp.START_LOADING()
        setShow(false)

        const ob = new FormData()
        ob.append('img', img, img.name)
        ob.append('pid', file.pid.toString())
        ob.append('title', file.title)

        const result = await new ListAction<PageFile | any>(filelistDispatch!).addData('client/create-file', ob)
        console.log("result:-> ", result);

        myapp.SET_RESPONSE(result)
        myapp.STOP_LOADING()
    }


    return (
        <div>
            <MyModal
                title="Create New File"
                show={show}
                setShow={setShow}
                onSubmit={onSubmit}
            >
                <Input
                    name="title"
                    title="File Title"
                    value={file.title}
                    onChange={onChange}
                    disable={app?.loading!}
                    type="text"
                />
                <input type="file" onChange={onChangeFile} />

                {/* <Input
                    name="_img"
                    title="Upload File"
                    onChange={(e) => {
                        console.log(e.target);
                    }}
                    disable={app?.loading!}
                    type="file"
                /> */}

            </MyModal>
        </div>
    )
}

export default FileModal
