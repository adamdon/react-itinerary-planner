import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";


import {useData} from "../DataContextProvider";




export default function NavTop()
{
    const [data, setData] = useData();



    return (

        <nav className="navbar navbar-dark bg-primary p-0">

            <Link to="/" className="navbar-brand">
                <img src="/images/logo.svg" width="30" height="30" className="d-inline-block align-top" alt="logo"/>Hostel Finder
            </Link>

            <div className="fixed-bottom d-flex justify-content-center p-3">
                {data.showSpinner ?
                    <Loader
                        type="Circles"
                        color="#00BFFF"
                        height={40}
                        width={40}
                        // timeout={9000} //3 secs
                    />
                    :
                    <></>
                }
            </div>




            <div className="dropdown">
                <button className="nav-link dropdown-toggle btn btn-primary" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/images/menu.svg" width="30" height="30" className="rounded-circle " alt="icon"/> Menu
                </button>

                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end animate slideIn" aria-labelledby="dropdownMenuLink">
                    <li>
                        <Link to="/" className="dropdown-item text-center">Home</Link>
                    </li>
                    <li>
                        <Link to="/hostels" className="dropdown-item text-center">Hostels</Link>
                    </li>
                    <li>
                        <Link to="/hostels" className="dropdown-item text-center">Hostels</Link>
                    </li>
                </ul>
            </div>


        </nav>
    );


}


