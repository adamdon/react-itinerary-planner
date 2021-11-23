import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import 'bootstrap';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'font-awesome/css/font-awesome.min.css';
import "./styles/colors.css";
import "./styles/main.css";

import {Routes, Route, Link} from "react-router-dom";

import HostelsPage from "./components/pages/hostels/HostelsPage";
import NavTop from "./components/NavTop";
import HomePage from "./components/pages/home/HomePage";
import ToastBock from "./components/ToastBlock";




export default function App()
{
    return (
        <span>
            <ToastBock/>
            <NavTop/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/hostels" element={<HostelsPage />} />
            </Routes>

        </span>
    );
}