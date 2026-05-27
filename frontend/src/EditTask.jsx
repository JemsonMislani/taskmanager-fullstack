import 'bootstrap/dist/css/bootstrap.min.css';
import './EditTask.css'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function EditTask(){
    const {id} = useParams()
    const [todo, setTodo] = useState('')
    const [date, setDate] = useState('')
    const [popup, setPopUp] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3005/getTask/'+id)
        .then(result => {
            console.log(result)
            setTodo(result.data.todo)
            setDate(result.data.date)
        })
        .catch(err => console.log(err))
    }, [id])

    const updateTask = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3005/updateTask/'+id, 
            {todo, date}
        )
        .then(result => {
            console.log(result)
            setPopUp(true)

            setTimeout(() => {
                setPopUp(false)
                nav('/')
            }, 2000)
        })
    }

    return(
        <>
            <div className='edit-elem'>
                {
                    popup && (
                        <div className='popup'>
                            ✅️ Task updated!
                        </div>
                    )
                }
                <h3 className='edit-task-elem'>Edit my task</h3>
                <Link 
                    to='/'
                    className='btn btn-primary'>Back</Link>
                <div className='input-element-edit'>
                    <input 
                        className='edit-todo'
                        type="text" 
                        placeholder="Enter task"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}/>
                    <input 
                        className='edit-task'
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        />
                    <button
                        onClick={updateTask}
                        className='update-btn'>Update task</button>
                </div>
            </div>
        </>
    );
}