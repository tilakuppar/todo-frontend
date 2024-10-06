import React, { useState } from 'react'
import './ToDo.css'
import ToDoItem from '../ToDoItem/ToDoItem';
import { useNavigate } from 'react-router-dom';

const ToDo = ( { username }) => {

    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        title : '',
        date : '',
        task : '',
        username : username
    });
    const [tasks, setTasks] = useState([]);
    const [alert, setAlert] = useState('none');
    const [alertMSG , setAlertMSG] = useState('');
    const [alertCLR , setAlertCLR] = useState('light');

    const handleChange = (e) => {
        setFormData ({...formData , [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.title & formData.task || formData.title | formData.task === ''){
            setAlertMSG('Task Title and Task Content Cannot be Empty!')
            setAlertCLR('danger')
            setAlert('block')
            setTimeout(()=>{
                setAlert('none');
            },2000)
            return;
        }
        setTasks([...tasks, formData]);

        try {
            const response = await fetch("http://localhost:3001/todo" , {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(formData)
            });
            // const result = response.json();

            if(response.status === 200){
                setAlertMSG('Task Saved Successfull!');
                setAlertCLR('success');
                setAlert('block');
                setTimeout(()=>{
                    setAlert('none')
                },2000)
            }else{
                setAlertMSG('Failled to Save the Task!');
                setAlertCLR('danger');
                setAlert('block');
                setTimeout(()=>{
                    setAlert('none')
                },2000)
            }

        } catch (error) {
            alert('Error While Saving!!')
        }

        setFormData({
          title: '',
          date: '',
          task: '',
          username : username
        });
    }

    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((task, i) => i !== index);
        setTasks(newTasks);
    };

    const handleLogOut = () => {
        navigate('/signin');
    }

  return (
    <div className='todo w-100 vh-100'>
        <div className='p-3'>
            <div className="header d-flex justify-content-between align-items-center mb-2">
                <div className="username d-flex justify-content-center align-items-center">
                    <svg   svg xmlns="http://www.w3.org/2000/svg" className='text-danger' width="35" height="35" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                    <h4 className='text-light mt-2 mx-1' name='username' id='username'>{username}</h4>
                </div>
                <h2 className='text-white text-center'>To Do List</h2>
                <button className='btn btn-outline-warning' onClick={handleLogOut}>LogOut</button>
            </div>
            <div className="container bg-light w-50 p-3 rounded-3">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <label htmlFor="title" className='px-3'>Title</label>
                        <input type="text" name='title' id='title' value={formData.title} onChange={handleChange} className='w-50' placeholder='Enter Title of the Task' />
                        <label htmlFor="date" className='px-3'>Date</label>
                        <input type="date" name='date' id='date' value={formData.date} onChange={handleChange} className='w-25'/>
                    </div>
                    <div className='container p-2'>
                        <label htmlFor="task" className='p-1'>Task Content</label>
                        <textarea name="task" id="task" value={formData.task} onChange={handleChange} className='w-100' placeholder='Enter Your Task Here...' rows={1} cols={10}></textarea>
                    </div>
                    <small className={`container text-${alertCLR} text-center pb-1`} style={{display:alert}}>{alertMSG}</small>
                    <div className="container text-center">
                        <button type='submit' className='btn btn-outline-success rounded-3' id='addtask' >ADD TASK</button>
                    </div>

                </form>
            </div>
        </div>

        <div className='to-do-item container mt-4'>
          {tasks.map((task, index) => (
            <ToDoItem key={index} task={task} onDelete={() => handleDeleteTask(index)}/>
          ))}
        </div>
        
    </div>
  )
}

export default ToDo
