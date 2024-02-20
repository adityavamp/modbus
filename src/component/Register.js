import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoCaretBack } from "react-icons/io5";
import './Register.css'

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [sensorData, setSensorData] = useState([]);
    const [error, setError] = useState('');
    const [showTable, setShowTable] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(`http://localhost:3000/api/getSensorData/${formData.username}/${formData.password}`, config);
            setSensorData(res.data.sensorData);
            setShowTable(true);
        } catch (err) {
            console.error("error", err);
            setError('Authentication failed. Invalid username or password.');
        }
    };

    const handleBack = () => {
        setShowTable(false);
        setSensorData([]);
        setError('');
    };

    useEffect(() => {
        // You may want to add additional logic here if needed
    }, [sensorData]);

    return (
        <div>
            {showTable ? (
                <div class="container145">
                <IoCaretBack style={{width:"30px",height:"50px"}} onClick={handleBack}/>
                    <center><h1>Sensor Data</h1></center>
                    <table className="dark-theme">
                        <thead>
                            <tr>
                                <th>SensorDataID</th>
                                <th>TempLow</th>
                                <th>TempHigh</th>
                                <th>Humidity</th>
                                <th>HumidityHysteresis</th>
                                <th>PowerOnDelay</th>
                                <th>R2Delay</th>
                                <th>R1OffTime</th>
                                <th>SetLowLimit</th>
                                <th>SetHighLimit</th>
                                <th>Offset1</th>
                                <th>Offset2</th>
                                <th>HoursTime</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sensorData.map((data) => (
                                <tr key={data.SensorDataID} className="table-row">
                                    <td>{data.SensorDataID}</td>
                                    <td>{data.TempLow}</td>
                                    <td>{data.TempHigh}</td>
                                    <td>{data.Humidity}</td>
                                    <td>{data.HumidityHysteresis}</td>
                                    <td>{data.PowerOnDelay}</td>
                                    <td>{data.R2Delay}</td>
                                    <td>{data.R1OffTime}</td>
                                    <td>{data.SetLowLimit}</td>
                                    <td>{data.SetHighLimit}</td>
                                    <td>{data.Offset1}</td>
                                    <td>{data.Offset2}</td>
                                    <td>{data.HoursTime}</td>
                                    <td>{data.Address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div id="container14">
                    <div id="container15">
                        <center><h1 style={{ fontWeight: "bold", fontSize: "30px" }}>Register</h1></center>
                        <form action="" method="post" id="form1" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="pass" onChange={handleChange} />
                            </div>
                            <div id="errorMessage">
                                {error}
                            </div>
                            <center><button>Login</button></center>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
