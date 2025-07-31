import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {


    const token = localStorage.getItem('token');
    

    if (!token ) {
        alert('Session expired. Please login again.')
        return <Navigate to="/login" replace />;
    }

    return children;
}