import { BrowserRouter, BrowserRouter as Link, Route, Router, Routes } from 'react-router-dom'
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import UploadPicture from './UploadPicture/UploadPicture';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload-picture" element={<UploadPicture />} />
            </Routes>
        </BrowserRouter>
    );
}