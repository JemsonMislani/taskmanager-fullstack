
import './Home.css';
export default function Dashboard(){
    return(
        <>
            <h3 className='home-element'>What's our task?</h3>
            <div className='input-element'>
                <input type="text" placeholder="Enter task"/>
                <input type="date" />
                <button className='add-btn'>Add task</button>
            </div>
        </>
    );
}