import React, { useState, useEffect } from "react"; // import state and hooks
import styles from './TodoList.module.css'; // import css module

export default function TodoList() {
    const [ todolist, setList ] = useState([]); // state initialization for the whole todo list
    const [ newTask, setNewTask ] = useState(''); // state initialization for current new task

    /*
        State hook for fetching local storage "tasks" data if "tasks" has data.
        Only runs when the component is mounted (i.e. the first render or when the page is refreshed).
        When the page is reloaded the todolist state will be 'reinitialized' with the "tasks" data
        that is saved in the local storage. To clarify, local storage is persistent only within the bounds
        of this application and the local server that it uses on this computer via a local port.
    */
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));

        if (savedTasks && savedTasks.length > 0) {
            setList(savedTasks);
        }
    }, [])

    /* 
        state hook that updates the "tasks" data saved in local storage when a newTask is added or 
        deleted. When that happens the todolist will be updated which will fire this hook and update the local storage so that
        the newly modified todolist is automatically persisted in the local storage. The entire point
        of these state hooks is to prevent the list data from disappearing everytime the app is reloaded.
        This is solely to be used for the development build and will not translate to a production
        build where the user's data would be persisted on a backend server.
    */
    useEffect(() => {
        if (todolist.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(todolist));
        }
    }, [todolist])

    // state setter function for adding a newTask to the previous todolist
    function addToList() {
        setList((prevList) => ( [ ...prevList, { task: newTask } ] ))
        setNewTask("")
    }
    // deletion function which resets todolist state based on the filtered previous todolist where the index passed from the delete button is not included in the new todolist 
    function deleteFromList(idToDelete) {
        setList((prevList) => ( prevList.filter((task, i) => i !== idToDelete )))
    }

    // function for automatically updating newTask everytime there is a change in the input element
    function handleInputChange(e) {
        setNewTask(e.target.value);
    }

    /*
        Core of the application. Includes title "To Do List", the actual list itself, 
        the add and delete features, checkbox feature for checking off finished tasks, 
        and current time.
        
        The todolist object is mapped over and a <li> is created for every task in the object.
        The index paramater in the callback function is used as the value for key in the <li>.
        This is to help React keep the list items in order whenever the component is rerendered.

        Input element for entering newTask. handleChange value updates the newTask everytime
        there is a change in the input element. Then the value={newTask} ensures that the input 
        field always reflects what is in the newTask variable. For instance when the addToList 
        function is called the newTask variable is reset to "" and the input field will reflect
        that.

        Button for adding newTask to todolist and resetting newTask to "".
    */

    return (
        <div className={styles.todoList}>
            <p>{new Date().toLocaleTimeString()}</p>
            <h1>To Do List</h1>
            <div className={styles.list}>
                <ul>
                    {todolist.map((task, index) => 
                    <li key={index}>
                        <input type="checkbox" />
                        {task.task}
                        <button onClick={() => deleteFromList(index)}>Delete</button>
                    </li>
                    )}
                </ul>
            </div>
            <div>
                <input 
                    type="text" 
                    name="newTask" 
                    value={newTask} 
                    onChange={handleInputChange} 
                    placeholder="Enter a new task"
                />
                <button onClick={addToList}>Add Task</button>
            </div>
        </div>
    )
}