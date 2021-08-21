import Define from '../../../../utils/Define';
import useLocalStorage from '../../../../utils/hooks/useLocalStorage';
import User from '../../../../utils/models/User';
import Main from '../../../layouts/dashboard/Main'
import ProtectedPage from '../../../layouts/ProtectedPage';
import PageDetails from './PageDetails';
import URL from './../../../../utils/URL';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from './../../../../utils/context/MainContext';


const Home = () => {
    //send to admin if he is not client
    const [user, setUser] = useLocalStorage<User>(Define.AUTH_KEY)
    const { pagelist } = useContext(StateContext)

    if (user?.is_admin === true) {
        return < Redirect to={URL.ADMIN_HOME} ></Redirect >
    }



    return (
        <ProtectedPage>
            <Main title="Dashboard">
                {pagelist?.length! < 1 ?
                    <h1>No Page Found!Please Wait.</h1>
                    : <PageDetails />}

            </Main>
        </ProtectedPage>
    )
}

export default Home
