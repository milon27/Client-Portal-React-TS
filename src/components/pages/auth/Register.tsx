import React, { useContext, useState } from "react"
import AppAction from "../../../utils/context/actions/AppAction"
import { DispatchContext } from "../../../utils/context/MainContext"
import { ColorType } from "../../../utils/models/Response"
import Response from './../../../utils/models/Response';
import AxiosHelper from './../../../utils/AxiosHelper';
import User from "../../../utils/models/User";
import useLocalStorage from './../../../utils/hooks/useLocalStorage';
import Define from './../../../utils/Define';
import { Link, Redirect } from "react-router-dom";
import URL from './../../../utils/URL';
import Input from "../../layouts/form/Input";
import { StateContext } from './../../../utils/context/MainContext';
import AlertLoading from "../../layouts/AlertLoading";
import { Button } from "react-bootstrap";
import { TypeClickEvent, TypeOnChange } from "../../../utils/interface/CommonInterface";
import Helper from "../../../utils/Helper";


import logo from '../../../assets/img/logo.png'

const Register = () => {

    const { app } = useContext(StateContext)
    const { appDispatch } = useContext(DispatchContext)

    //local state
    const initvalue = {
        name: "",
        email: "",
        password: ""
    }
    const [user, setUser] = useState(initvalue)
    const [cUser, setcUser] = useLocalStorage<User>(Define.AUTH_KEY)


    //local method
    const onSubmit = async (e: TypeClickEvent) => {
        e.preventDefault()
        const app = new AppAction(appDispatch!)
        //Helper 
        if (!Helper.validateField(user.name, user.email, user.password)) {
            app.SET_RESPONSE(Response(false, "Enter Name Email And Password.", ColorType.DANGER))
            return
        }
        //ck password & confirm pass is same or not
        if (user.password.length <= 6) {
            app.SET_RESPONSE(Response(false, "Password length should be at least 6 character.", ColorType.DANGER))
            return
        }
        //start loding..
        app.START_LOADING()
        //signup user
        try {
            const response = await AxiosHelper.addData<User>('auth/signup', user)
            console.log(response)
            if (response.obj) {
                setcUser(response.obj)
                //it will update state also update localstorage
            } else {
                app.SET_RESPONSE(Response(false, response.message, ColorType.DANGER))
            }
            app.STOP_LOADING()

        } catch (err) {
            app.SET_RESPONSE(Response(false, "Sign In failed." + (err as Error).message, ColorType.DANGER))
            app.START_LOADING()
        }
    }


    const onChange = (e: TypeOnChange) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // check alrady logged in or not
    //though we will update the state so it will re-run
    if (cUser?.id) {
        if (cUser.is_admin === true) {
            return <Redirect to={URL.ADMIN_HOME}></Redirect>
        }
        return <Redirect to={URL.HOME}></Redirect>
    }

    return (
        <>
            <div className="auth">
                <div className="inner">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center mb-2">
                            <img src={logo} width={'52%'} alt="" />
                        </div>
                    </div>

                    <form onSubmit={onSubmit}>
                        <Input name="name" type="text" title="Name" value={user.name} onChange={onChange} disable={app?.loading!} />

                        <Input name="email" type="email" title="Email" value={user.email} onChange={onChange} disable={app?.loading!} />

                        <Input name="password" type="password" title="Password" value={user.password} onChange={onChange} disable={app?.loading!} />

                        <AlertLoading loadColor={ColorType.INFO} />

                        <Button variant="primary" type="submit" className="btn btn-dark btn-lg btn-block " >Register now</Button>

                        <p className="forgot-password text-right">
                            Already registered, <Link to={URL.LOGIN}>Login Now</Link>
                        </p>
                    </form>
                </div>
            </div >
        </>
    )
}

export default Register

