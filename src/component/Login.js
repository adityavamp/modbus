import { ReactDOM, useEffect, useState } from "react";
import './Login.css'
import { Link, json } from "react-router-dom";
const Login = () => {
    const [formData, setformdata] = useState({ username: '', email: '', password: '' });

    const [error, seterror] = useState('');

    const handleChange = (e) => {
        setformdata({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/addclient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            seterror(data.message);
        }
        catch (error) {
            console.log(error.message);
        }


    }
    return (
        <div id="container14">
            <div id="container15">
                <center><h1 style={{ fontWeight: "bold", fontSize: "30px" }}>Register</h1></center>
                <form action="" method="post" id="form1" onSubmit={handleSubmit}>
                    <div>
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" onChange={handleChange} />
                    </div>
                    <div> <label for="email">E-mail</label>
                        <input type="email" name="email" id="email" onChange={handleChange} />
                    </div>
                    <div> <label for="password">Password</label>
                        <input type="password" name="password" id="pass" onChange={handleChange} />
                    </div>
                    <div id="errorMessage">
                        {error}
                    </div>
                    <center><button>Register</button></center>
                </form>
                <center>
                    <Link to="/login">
                        <button style={{ marginTop:"20px"}}>Login</button>
                    </Link>
                </center>
            </div>
        </div>
    );
};
export default Login;