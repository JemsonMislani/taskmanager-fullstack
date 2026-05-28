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
        <>
            <h3>Completed task</h3>
            {
                task.length === 0 ? (
                    <p>No tasks completed</p>
                ) : (
                    task.map((t) => (
                        <div key={t._id}>
                            <p>{t.todo} • {t.date}</p>
                        </div>
                    ))
                )
            }
        </>
    );
}