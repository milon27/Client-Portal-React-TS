import { BrowserRouter, Switch, Route } from 'react-router-dom'
//pages
import NotFound from './../pages/_404';
import Home from '../pages/dashboard/client/Home';
import URL from './../../utils/URL';
import Login from './../pages/auth/Login';
import Register from './../pages/auth/Register';
import AdminHome from './../pages/dashboard/admin/AdminHome';
import PageList from './../pages/dashboard/admin/page/PageList';
import FileList from './../pages/dashboard/admin/page/files/FileList';


export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={URL.HOME} component={Home} ></Route>
                <Route exact path={URL.ADMIN_HOME} component={AdminHome} ></Route>
                <Route path={URL.LOGIN} component={Login}></Route>
                <Route path={URL.REGISTER} component={Register}></Route>


                <Route exact path={URL.FILE + "/:id"} component={() => (<>file router.</>)}></Route>

                {/* admin */}
                {/* add page  */}
                <Route exact path={`${URL.ADMIN_HOME}/page/:uid`} component={PageList} ></Route>
                {/* add file for a page  */}
                <Route exact path={`${URL.ADMIN_HOME}/page/:uid/:pid`} component={FileList} ></Route>

                <Route component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    )
}