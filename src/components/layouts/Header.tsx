import { Link } from 'react-router-dom'
import IMG from '../../assets/img/support.jpeg'
import URL from './../../utils/URL';
interface iHeaderType {
    title: string
}
//todo : auth action / logout option

const Header = ({ title }: iHeaderType) => {

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3"
                onClick={() => {
                    document.getElementById("page-top")?.classList.toggle("sidebar-toggled");
                    document.getElementById("accordionSidebar")?.classList.toggle("toggled");
                }}
            >
                <i className="fa fa-bars"></i>
            </button>

            <h5>{title}</h5>

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">

                    <Link to={URL.SUPPORT} className="nav-link " >
                        <div className="d-flex  justify-content-start rounded border border-primary align-items-center p-2">
                            {/* <i className="fas fa-user-circle text-primary  mr-1" style={{ fontSize: 23 }}></i> */}
                            <img className="mr-1 rounded-circle" src={IMG} alt="" style={{ width: 25 }} />
                            <span className="mr-2 text-primary small">Support</span><span className="badge badge-pill pb-1 badge-success">online</span>
                        </div>

                    </Link>


                </li>

            </ul>

        </nav>
    )
}

export default Header
