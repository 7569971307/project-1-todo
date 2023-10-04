import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      
        const response = await axios.get(
          'https://my-first-project-7e52e-default-rtdb.firebaseio.com/register.json'
        ); 
        const taskList = Object.values(response.data)
        setTasks(taskList);
      }  
    

    fetchData();

    const refresh = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(refresh);
    };
  }, []);

  const addTask = async () => {
    if (newTask !== '') {  
      
        await axios.post('https://my-first-project-7e52e-default-rtdb.firebaseio.com/register.json', {
          text: newTask,
          completed: false,
        }).then(()=>alert("submitted"))  
        setNewTask('');
      }  
    
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;