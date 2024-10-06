import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Components/Signup/Signup';
import SignIn from './Components/SignIn/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDoItem from './Components/ToDoItem/ToDoItem';
import ToDo from './Components/ToDo/ToDo';

function App() {

  const [username, setUsername] = useState('tilli');

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/signup' element={<Signup setUsername={setUsername} />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/todoitem' element={<ToDoItem />} />
          <Route exact path='/todo' element={<ToDo username={username} />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
