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
    file: PageFile,
    setFile: TypeSetState<PageFile>
}

const FileModal: React.FC<iFileModal> = ({ show, setShow, file, setFile }) => {

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

        if (file.id === -1) {
            //add new file
            myapp.START_LOADING()
            setShow(false)

            const ob = new FormData()
            if (img) {
                ob.append('img', img, img.name)
            }
            ob.append('pid', file.pid.toString())
            ob.append('title', file.title)

            const result = await new ListAction<PageFile | any>(filelistDispatch!).addData('client/create-file', ob)
            console.log("result:-> ", result);

            myapp.SET_RESPONSE(result)
            myapp.STOP_LOADING()
        } else {
            myapp.START_LOADING()
            setShow(false)

            const ob = new FormData()
            if (img) {
                ob.append('img', img, img.name)
            }
            ob.append('id', file.id.toString())

            // ob.append('pid', file.pid.toString())//no need to change it should remail same
            ob.append('title', file.title)
            ob.append('old_url', file.url)

            const result = await new ListAction<PageFile | any>(filelistDispatch!).updateData('admin/update/file', ob, "id")
            console.log("result:-> ", result);

            myapp.SET_RESPONSE(result)
            myapp.STOP_LOADING()
        }




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
                <label htmlFor="">Upload File (image,pdf,doc) max upload size: 5mb</label>
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
