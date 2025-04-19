import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const Add = () => {
    const [car,setCar] = useState({
        model:"",
        brand:"",
        color:"",
        year:null,
        diecastBrand:"HotWheels",
        collection:"none",
        condition:"Mint",
        edition: "none"
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCar((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/cars", car)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className='form'>
            <h1>Add new car</h1>
            <input type="text" placeholder='model' onChange={handleChange} name="model"></input>
            <input type="text" placeholder='brand' onChange={handleChange} name="brand"></input>
            <input type="text" placeholder='color' onChange={handleChange} name="color"></input>
            <input type="number" placeholder='year' onChange={handleChange} name="year"></input>
            <input type="text" placeholder='diecastbrand' onChange={handleChange} name="diecastBrand"></input>
            <input type="text" placeholder='collection' onChange={handleChange} name="collection"></input>
            <input type="text" placeholder='condition' onChange={handleChange} name="condition"></input>
            <input type="text" placeholder='edition' onChange={handleChange} name="edition"></input>
            <button onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add;