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

    return(
        <div className='completed-task-element'>
            <div>
            <h3 className='completed-head'>Completed task✅</h3>
                {
                    task.length === 0 ? (
                        <p>No tasks completed</p>
                    ) : (
                        task.map((t) => (
                            <div 
                                className='completed-task-section'
                                key={t._id}>
                                <div className='tasks-completed'>
                                    <span>
                                        {t.todo} • {t.date} 
                                    </span>
                                    <button className='btn btn-success'>Undo</button>
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