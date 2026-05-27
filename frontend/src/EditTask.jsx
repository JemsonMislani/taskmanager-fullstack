import 'bootstrap/dist/css/bootstrap.min.css';
import './EditTask.css'

export default function EditTask(){

    return(
        <>
            <div className='edit-elem'>
                <h3 className='edit-task-elem'>Edit my task</h3>
                <div className='input-element-edit'>
                    <input 
                        className='edit-todo'
                        type="text" 
                        placeholder="Enter task"/>
                    <input 
                        className='edit-task'
                        type="date"
                        />
                    <button
                        className='update-btn'>Update task</button>
                </div>
            </div>
        </>
    );
}