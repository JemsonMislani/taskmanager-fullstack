
import { useState } from 'react';
import './Home.css';
import { useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

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

    const handleCompletedTask = (id) => {
        axios.patch('http://localhost:3005/completeTask/'+id)
        .then((result) => {
            setTask(prev => prev.map(t => t._id === id ? 
                {...t, status: 'completed'} : t
            ))
            console.log(result)
        })
        .catch(err => console.log(err))
    }

    return(
    <div className='whole'>
        <div className='completed-task'>
            <Link 
                to='/completed'
                className='comp-task'>Completed task</Link>
            <Link 
                to='/completed'
                className='task-num-comp'>{
                task.filter(t => t.status === 'completed').length
                }</Link>
        </div>
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
                    task.filter(t => t.status !== 'completed')
                    .length === 0 ? (<p>No pending task</p>) : task.filter((t => t.status !== 'completed'))
                    .map((t, index) => {
                        return <div 
                            key={index}
                            className='tasks'>
                            <p 
                                className='tasks-display fw-semibold'>{t.todo} • {t.date}</p> 
                            <Link
                                to={`/edit/${t._id}`}
                                className='btn btn-primary'
                                >Edit</Link>
                            <button
                                onClick={(e) => handleCompletedTask(t._id)}
                                className='btn btn-success'>Completed</button>
                            <button
                                className='btn btn-danger'>Remove</button>
                        </div> 
                    })
                }
            </div>
        </div>
    </div>
    );
}