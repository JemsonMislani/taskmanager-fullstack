import 'bootstrap/dist/css/bootstrap.min.css';
import './CompletedTask.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CompletedTask(){
    const [task, setTask] = useState([])

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

    return(
        <div className='completed-task-element'>
            <div>
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
                                    <button className='btn btn-danger'>Remove</button>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}