import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import { useAuth } from "../AuthContex.jsx";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8082/api/v1/passenger/logvalid', {
                email: email,
                nic: password,
            });
        

            if (response.data.code === 200) {

                const id = response.data.data;

                login('passenger',id);
                sessionStorage.setItem('isLoggedIn', '1');
                sessionStorage.setItem('id', id);

                navigate('/passenger/dashboard');

            } else {
                setError('Error during login. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid login credentials');
            } else {
                setError('Error during login. Please try again.');
            }
            console.error('Login error:', error);
        }
    };

    return (
        
        <div className="Login">
            <h5 style={{ textAlign: "center" }}>Login As a Passenger</h5>
            <form onSubmit={handleLogin}>
                <br />
                {error && <p>{error}</p>}
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="button" value="Login" onClick={handleLogin} />
                <br /><br />
                <p>Don't have any account <Link to="/passengerregister">Create here</Link></p>
            </form>
        </div>
    );
}

export default Login;
