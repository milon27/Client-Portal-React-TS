import Define from '../../../../utils/Define';
import useLocalStorage from '../../../../utils/hooks/useLocalStorage';
import User from '../../../../utils/models/User';
import Main from '../../../layouts/dashboard/Main'
import ProtectedPage from '../../../layouts/ProtectedPage';
import PageDetails from './PageDetails';
import URL from './../../../../utils/URL';
import { Redirect } from 'react-router-dom';


const Home = () => {
    //send to admin if he is not client
    const [user, setUser] = useLocalStorage<User>(Define.AUTH_KEY)

    if (user?.is_admin === true) {
        return < Redirect to={URL.ADMIN_HOME} ></Redirect >
    }

    return (
        <ProtectedPage>
            <Main title="Dashboard">
                <PageDetails />
            </Main>
        </ProtectedPage>
    )
}

export default Home
