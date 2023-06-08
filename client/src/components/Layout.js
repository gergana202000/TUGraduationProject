import { React, useState } from "react"
import "../layout.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Badge } from "antd"

function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false)
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const userMenu = [
        {
            menuName: "Home",
            path: "/",
            menuIcon: "ri-home-4-line"
        },
        {
            menuName: "Appointments",
            path: "/appointments",
            menuIcon: "ri-file-list-3-line"
        },
        {
            menuName: "Apply Doctor",
            path: "/apply-doctor",
            menuIcon: "ri-home-heart-line"
        },
        {
            menuName: "Profile",
            path: "/apply-doctor",
            menuIcon: "ri-user-line"
        },

    ]

    const adminMenu = [
        {
            menuName: "Home",
            path: "/",
            menuIcon: "ri-home-4-line"
        },
        {
            menuName: "Users",
            path: "/admin/userlist",
            menuIcon: "ri-file-list-3-line"
        },
        {
            menuName: "Doctors",
            path: "/admin/doctorlist",
            menuIcon: "ri-nurse-line"
        },
        {
            menuName: "Profile",
            path: "/apply-doctor",
            menuIcon: "ri-user-line"
        },
    ]

    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu

    return (
        <div className="main-layout">
            <div className="d-flex layout">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h1 className="logo">LOGO</h1>
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (
                                <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                    <i className={menu.menuIcon}></i>
                                    {!collapsed && <Link to={menu.path}>{menu.menuName}</Link>}
                                </div>
                            )
                        })}
                        <div className={`d-flex menu-item`} onClick={() => {
                            localStorage.clear()
                            navigate("/login")
                        }}>
                            <i className="ri-logout-circle-line"></i>
                            {!collapsed && <Link to="/login">Logout</Link>}
                        </div>
                    </div>
                </div>

                <div className="main-content">
                    <div className="header">
                        {collapsed ? (<i className="ri-menu-line header-icons" onClick={() => setCollapsed(false)}></i>) : (<i className="ri-close-line icons header-icons" onClick={() => setCollapsed(true)}></i>)}
                        <div className="d-flex align-items-center px-4">
                            <Badge count={user?.unseenNotification} onClick={() => navigate("/notifications")}>
                                <i className="ri-notification-4-line header-icons px-3"></i>
                            </Badge>

                            <Link className="anchor mx-2" to="/profile">{user?.name}</Link>
                        </div>
                    </div>
                    <div className="content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
