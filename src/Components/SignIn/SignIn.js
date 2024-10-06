import React,{useState} from 'react'
import './SignIn.css'
import { Link,useNavigate } from 'react-router-dom'

const SignIn = () => {

    const navigate = useNavigate();
    const [formData , setFormData] = useState({
        email : '',
        password : ''
    });

    const [alertMSG, setAlertMSG] = useState('')
    const [alertBG, setAlertBG] = useState('success')
    const [alert, setAlert] = useState('none')


    const handleChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:3001/signin', {
                method : 'POST',
                headers : {'Content-Type':'application/json'},
                body : JSON.stringify(formData)
            });

            // const result = response.json();

            if(response.status === 200){
                setAlertMSG('SignIn Successfull!')
                setAlertBG('success')
                setAlert('block')
                setTimeout(()=>{
                    setAlert('none')
                    navigate('/todo');
                },1500);
            }else{
                setAlertMSG('Email Does Not Exist, SignIn Failed!')
                setAlertBG('danger')
                setAlert('block')
                setTimeout(()=>{
                    setAlert('none')
                },1500);
            }

        }catch(e){
            alert('Error during Setup')
        }
    }

    return (
        <div className='signin w-100'>
            <div className="container w-50 bg-light rounded p-3">
                <h1 className='text-center'>SignIn</h1> <hr />
                <div className={`container text-light text-center bg-${alertBG} w-50 rounded-2 p-1`} style={{display:alert}}>
                    {alertMSG}
                </div>
                <div className="">
                    <form className='container' onSubmit={handleSubmit}>
    
                        <div className="container py-2">
                            <label htmlFor="email">Email : </label>
                            <input className='container' type="email" value={formData.email} onChange={handleChange} name="email" id="email" placeholder='Enter Your Email' required/>
                        </div>
    
                        <div className="container py-2">
                            <label htmlFor="password">Password : </label>
                            <input className='container' type="password" value={formData.password} onChange={handleChange} name="password" id="password" placeholder='Enter Strong Password' required/>
                        </div>
    
                        <div className="container py-3">
                            <button type='submit' className='btn btn-outline-success px-4 py-2 text-center w-100'>SIGN IN</button>
                        </div>
    
                        <div className='container text-center py-1'>
                            <small className='text-center'>Don't Have an Account ? <Link to="/signup">SignUp</Link> </small>
                        </div>
    
                    </form>
                </div>
            </div>
        </div>
      )
}
export default SignIn
