import React from "react";

export default function TodoList() {
    return (
        <>
            <h1>ToDo List</h1>
            <div>
                <ul>
                    <button>check</button><p>task 1</p><button>delete</button>
                    <button>check</button><p>task 2</p><button>delete</button>
                    <button>check</button><p>task 3</p><button>delete</button>
                    <button>check</button><p>task 4</p><button>delete</button>
                </ul>
                <button>add</button>
            </div>
        </>
    )
}