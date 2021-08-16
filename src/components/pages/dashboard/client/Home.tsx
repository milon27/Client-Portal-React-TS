import Main from '../../../layouts/dashboard/Main'
import ProtectedPage from '../../../layouts/ProtectedPage';
import PageDetails from './PageDetails';


const Home = () => {

    return (
        <ProtectedPage>
            <Main title="Dashboard">
                <PageDetails />
            </Main>
        </ProtectedPage>
    )
}

export default Home
