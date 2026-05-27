
import { useState } from 'react';
import './Home.css';
import { useEffect } from 'react';
import axios from 'axios';

export default function Dashboard(){
    const [todo, setTodo] = useState('')
    const [date, setDate] = useState('')
    const [task, setTask] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3005/')
        .then(result => setTask(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleAddTask = () => {
        if(!todo || !date){
            alert('Please fill out fields')
            return;
        }

        axios.post('http://localhost:3005/create', 
            { todo, date }
        )
        .then(result => {
            console.log(result.data)
            setTask([...task, result.data])
        })
        .catch(err => console.log(err))

        setTodo('')
        setDate('')
    }

    return(
    <>
        <h3 className='home-element'>What's our task?</h3>
        <div className='input-element'>
            <input 
                type="text" 
                placeholder="Enter task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}/>
            <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            <button 
                onClick={handleAddTask}
                className='add-btn'>Add task</button>
        </div>
        <div className='task-status'>
            <div>
                <h3 className='sts-pending'>Pending task</h3>
                {
                    task.map((t, index) => {
                        return <div 
                            key={index}
                            className='tasks'>
                            <p>{t.todo} • {t.date}</p> 
                            <button>Edit</button>
                            <button>Completed</button>
                            <button>Remove</button>
                        </div> 
                    })
                }
            </div>
            <div>
                <h3 className='sts-completed'>Completed task</h3>
            </div>
        </div>
    </>
    );
}