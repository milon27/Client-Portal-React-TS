import { createContext, useReducer, FC, useState } from 'react'
import AppState from '../models/AppState';
import AppReducer, { iAppAction } from './reducers/AppReducer';
import { iAppState } from './../models/AppState';
import ListReducer, { iListAction } from './reducers/ListReducer';
import User from '../models/User';
import Page from './../models/Page';
import { TypeSetState } from '../interface/CommonInterface';
import PageFile from '../models/PageFile';

interface iState {
    app?: iAppState,
    clientlist?: User[]
    pagelist?: Page[]
    page?: number,
    filelist?: PageFile[]
}
interface iDispatch {
    appDispatch?: React.Dispatch<iAppAction>,
    clientlistDispatch?: React.Dispatch<iListAction<User>>
    pagelistDispatch?: React.Dispatch<iListAction<Page>>
    setPage?: TypeSetState<number>,
    filelistDispatch?: React.Dispatch<iListAction<PageFile>>
}

export const StateContext = createContext<iState>({})
export const DispatchContext = createContext<iDispatch>({})


const MainContext: FC = (props) => {

    const [app, appDispatch] = useReducer(AppReducer, AppState(false, undefined, false))//for app state
    const [clientlist, clientlistDispatch] = useReducer(ListReducer, []);//for any kind of list

    const [pagelist, pagelistDispatch] = useReducer(ListReducer, []);
    const [filelist, filelistDispatch] = useReducer(ListReducer, []);

    const [page, setPage] = useState(-1)

    const global_state: iState = {
        app, clientlist, pagelist, page, filelist
    }

    const global_dispatch: iDispatch = {
        appDispatch, clientlistDispatch, pagelistDispatch, setPage, filelistDispatch
    }


    return (
        <StateContext.Provider value={global_state}>
            <DispatchContext.Provider value={global_dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export default MainContext
