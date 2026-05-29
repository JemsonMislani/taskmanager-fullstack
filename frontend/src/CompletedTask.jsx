import 'bootstrap/dist/css/bootstrap.min.css';
import './CompletedTask.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function CompletedTask(){
    const [task, setTask] = useState([])
    const [remove, setRemove] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3005/')
        .then(result => {
            const completed = result.data.filter(
                t => t.status === 'completed'
            )
            setTask(completed)
        })
        .catch(err => console.log(err))
    }, [])

    const handleUndo = (id) => {
        axios.patch('http://localhost:3005/undoTask/'+id)
        .then(result => {
            console.log(result.data)
            setTask(un => un.filter(u => u._id !== id))
        })
        .catch(err => console.log(err))
    } 

    const handleDelete = (id) => {
        axios.delete('http://localhost:3005/deleteTask/'+id)
        .then(result => {
            setTask(task.filter(t => t._id !== id))
            setRemove(true)

            setTimeout(() => {
                setRemove(false)
                console.log(result)
            }, 2000)
        })
        .then(err => console.log(err))
    }

    return(
        <div className='completed-task-element'>
            <Link 
                to='/'
                className='btn btn-primary'>Back</Link>
            <div>
                <div>
                    {
                        remove && (<p className='remove-task-completed'>❌ Removed task</p>)
                    }
                </div>
            <h3 className='completed-head'>Completed task✅</h3>
                {
                    task.length === 0 ? (
                        <p
                            className='no-task-completed'>No completed tasks</p>
                    ) : (
                        task.map((t) => (
                            <div 
                                className='completed-task-section'
                                key={t._id}>
                                <div className='tasks-completed'>
                                    <span>
                                        {t.todo} • {t.date} 
                                    </span>
                                    <button 
                                        onClick={(e) => 
                                            handleUndo(t._id)
                                        }
                                        className='btn btn-success'>Undo</button>
                                    <button 
                                        onClick={(e) => 
                                            handleDelete(t._id)
                                        }
                                        className='btn btn-danger'>Remove</button>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}