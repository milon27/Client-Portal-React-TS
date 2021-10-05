import React from 'react'
import Define from '../../../utils/Define'
import useLocalStorage from '../../../utils/hooks/useLocalStorage'
import User from '../../../utils/models/User'


interface iSidebarBottom {
    logout: Function
}
const SidebarBottom = ({ logout }: iSidebarBottom) => {

    const [user, setUser] = useLocalStorage<User>(Define.AUTH_KEY)

    return (
        <div className="text-center mt-2 flex-grow-1 d-flex justify-content-center align-items-end"
            style={{ color: "#F2F2F2" }}
        >
            <div className="fixed-logout">
                <div style={{ backgroundColor: "#3F5063" }} className="p-2 mx-3 mb-1 rounded">
                    <b>Account</b><br />
                    {user?.name}
                    <br />
                </div>

                <span style={{ cursor: "pointer" }} onClick={
                    () => {
                        logout()
                    }
                }><i className="fa fa-sign-out"></i> Sign Out</span>
                <br className="mb-4" />

                <button className="mt-2 rounded-circle border-0" id="sidebarToggle" onClick={() => {
                    document.getElementById("accordionSidebar")?.classList.toggle("toggled");
                }}></button>
            </div>
        </div>
    )
}

export default SidebarBottom
