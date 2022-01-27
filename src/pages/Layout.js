import { Outlet, Link } from "react-router-dom";
import logo from '../images/upload_cloud_icon.png';

const Layout = () => {
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" className="d-inline-block align-text-top" />
                        <span className="navbar-brand mb-0 h1 brand-name">Secure Cloud Storage</span>
                    </Link>
                </div>
            </nav>
            <Outlet />
        </>
    )
};

export default Layout;