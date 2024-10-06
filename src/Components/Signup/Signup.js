import React, { useState } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Signup = ({ setUsername }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username : '',
        email : '',
        password : ''
    });
    const [userAlert, setUserAlert] = useState('none')
    const [alertMSG, setAlertMSG] = useState('')
    const [alertBG, setAlertBG] = useState('success')
    const [alert, setAlert] = useState('none')

    const handleChange = (e) => {
        setFormData({ ...formData , [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:3001/signup', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.status === 200) {
                setAlertMSG('SignUp Successfull!')
                setAlertBG('success')
                setAlert('block')
                setTimeout(()=>{
                    setAlert('none')
                    setUsername(formData.username);
                    navigate('/signin');
                },1500);
            } 
            else if (response.status === 400 && result.message === 'Username already taken') {
                setUserAlert('block')
                setTimeout(()=>{
                    setUserAlert('none')
                },2000);
            } else {
                setAlertMSG('SignUp Failed!')
                setAlertBG('danger')
                setAlert('block')
                setTimeout(()=>{
                    setAlert('none')
                },1500);
            }
        }catch(err){
            alert('Error during Setup');
        }
      };


  return (
    <div className='signup w-100'>
        <div className="container w-50 bg-light rounded p-3">
            <h1 className='text-center'>SignUp</h1> <hr />
            <div className={`container text-light text-center bg-${alertBG} w-50 rounded-2 p-1`} id='alert-message' style={{display:alert}}>
                {alertMSG}
            </div>
            <div className="">
                <form className='container' onSubmit={handleSubmit}>

                    <div className="container py-2">
                        <label htmlFor="username">UserName : </label>
                        <input className='container' type="text" value={formData.username} onChange={handleChange} name='username' id='username' placeholder='Create your Username' required/>
                        <small className='text-danger' style={{display:userAlert}}>Username is already taken! Please choose a different one.</small>
                    </div>

                    <div className="container py-2">
                        <label htmlFor="email">Email : </label>
                        <input className='container' type="email" value={formData.email} onChange={handleChange} name="email" id="email" placeholder='Enter Your Email' required/>
                    </div>

                    <div className="container py-2">
                        <label htmlFor="password">Password : </label>
                        <input className='container' type="password" value={formData.password} onChange={handleChange} name="password" id="password" placeholder='Enter Strong Password' required/>
                    </div>

                    <div className="container py-3">
                        <button type='submit' className='btn btn-outline-success px-4 py-2 text-center w-100'>SIGN UP</button>
                    </div>

                    <div className='container text-center py-1'>
                        <small className='text-center'>Already Have an Account ? <Link to="/signin">SignIn</Link> </small>
                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup;


