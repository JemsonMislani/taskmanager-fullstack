
import { useState } from 'react';
import './Home.css';
export default function Dashboard(){
    const [todo, setTodo] = useState('')
    const [date, setDate] = useState('')
    const [task, setTask] = useState([{
        tasks: 'Jogging', date: '05-25-2026'
    }])


    return(
    <>
        <h3 className='home-element'>What's our task?</h3>
        <div className='input-element'>
            <input type="text" placeholder="Enter task"/>
            <input type="date" />
            <button className='add-btn'>Add task</button>
        </div>
        <div className='task-status'>
            <div>
                <h3 className='sts-pending'>Pending task</h3>
                {
                    task.map((t) => {
                        return <div className='tasks'>
                            <p>{`${t.tasks} • ${t.date}`}</p> 
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