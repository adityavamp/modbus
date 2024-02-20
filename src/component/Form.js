import React, { useState } from 'react';
import './Form.css'
import { useNavigate } from 'react-router-dom';

const Form = ({ipaddres}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tempLow: '',
        tempHigh: '',
        humidity: '',
        humidityHysteresis: '',
        powerOnDelay: '',
        r2Delay: '',
        r1OffTime: '',
        setLowLimit: '',
        setHighLimit: '',
        offset1: '',
        offset2: '',
        hoursTime: '',
        r1OnTime: '',
        address: '',
        baudrate: 'B 9600',
        parity: 'None',
        dataType: 'Sign Integer',
        frameDelay: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        try {
            const response = await fetch(`http://${ipaddres}/getMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString(),
            });

            const result = await response.text();
            console.log(result);
            console.log(new URLSearchParams(formData).toString())
        } catch (error) {
            console.error('Error:', error);
        }
        navigate('/');
    };
    return (
        <div id="con">
            <div id="container">
                <center><h1>MODBUS Parameters</h1></center>
                <form onSubmit={handleSubmit} id="container2">
                    <div >
                        <label for="tempLow">Temp. Low Set</label>
                        <input type="number" name="tempLow" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label for="tempHigh">Temp. High Set</label>
                        <input type="number" name="tempHigh" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label for="humidity">Humidity Set</label>
                        <input type="number" name="humidity" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label for="humidityHysteresis">Humidity Hysterisis</label>
                        <input type="number" name="humidityHysteresis" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label for="powerOnDelay">Power On Delay</label>
                        <input type="number" name="powerOnDelay" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label for="r2Delay">R2 Delay Time</label>
                        <input type="number" name="r2Delay" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label for="r1OffTime">R1 Off Time</label>
                        <input type="number" name="r1OffTime" onChange={handleChange}></input>
                    </div>        <div>
                        <label for="setLowLimit">Set Low Limit</label>
                        <input type="number" name="setLowLimit" onChange={handleChange}></input>
                    </div>        <div>
                        <label for="setHighLimit">Set High Limit</label>
                        <input type="number" name="setHighLimit" onChange={handleChange}></input>
                    </div>        <div>
                        <label for="offset1">Offset 1</label>
                        <input type="number" name="offset1" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label for="offset2">Offset 2</label>
                        <input type="number" name="offset2" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label for="hoursTime">Hour Time</label>
                        <input type="number" name="hoursTime" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label for="r1OnTime">R1 On Time</label>
                        <input type="number" name="r1OnTime" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label for="address">Address</label>
                        <input type="number" name="address" onChange={handleChange}></input>
                    </div>
                    {/* Baud Rate */}
                    <div>
                        <label htmlFor="baudrate">Select Baud Rate</label>
                        <select id="baudrate" name="baudrate" onChange={handleChange} value={formData.baudrate}>
                            <option value="B 9600">B 9600</option>
                            <option value="B 2400">B 2400</option>
                            <option value="B 4800">B 4800</option>
                            <option value="B 19200">B 19200</option>
                            <option value="B 38400">B 38400</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="parity">Parity</label>
                        <select id="parity" name="parity" onChange={handleChange} value={formData.parity}>
                            <option value="None">None</option>
                            <option value="Even">Even</option>
                            <option value="Odd">Odd</option>
                        </select>
                    </div>

                    {/* Data Type */}
                    <div>
                        <label htmlFor="dataType">Data Type</label>
                        <select id="dataType" name="dataType" onChange={handleChange} value={formData.dataType}>
                            <option value="Sign Integer">Sign Integer</option>
                            <option value="Float">Float</option>
                        </select>
                    </div>

                    {/* Frame Delay */}
                    <div>
                        <label htmlFor="frameDelay">Frame Delay:</label>
                        <input type="text" id="frameDelay" name="frameDelay" onChange={handleChange} value={formData.frameDelay} />
                    </div>
                    <center>
                        <div>
                            <button>Submit</button>
                        </div>
                    </center>
                </form>
            </div>
        </div>
    );
};

export default Form;
