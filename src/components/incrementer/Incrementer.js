import React, { useState, useEffect, useRef } from 'react';
import styles from './incrementer.module.css';

/*
    This is an incrementer component that also decrements by certain values (1, 5, 10, 20)
    The count is 
*/

export default function Increment() {
    const savedCount = JSON.parse(localStorage.getItem("count")) // fetching data from local storage
    const [count, setCount] = useState(savedCount !== null ? savedCount : 0); // if data exists the state will be initialized with it on the remount
    const intervalRef = useRef(null); // setting useRef state to null

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(count)); // setting count to local storage everytime count is updated per the dependency array
    }, [count]);

    // cleanup function for intervalRef to prevent memory leaks from occuring in the event that the component remounts and the intervalRef is used again
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    function incrementBy(num) {
        setCount(prev => prev + num);
    };

    function decrementBy(num) {
        setCount(prev => prev - num);
    };


    // functions for handling mouseDown events on the increment decrement buttons
    //intervalRef is used here to set the interval and store the intervalID in a variable
    function handleMouseDownIncrement(num) {
        intervalRef.current = setInterval(() => incrementBy(num), 100);
    };

    function handleMouseDownDecrement(num) {
        intervalRef.current = setInterval(() => decrementBy(num), 100);
    };

    // function for handling when the mouse is released that clears the interval ref
    function handleMouseUp() {
        clearInterval(intervalRef.current);
    };

    return (
        <div className={styles.container}>
            <h1>Count:</h1>
            <div className={styles.buttonsAndCount}>
                <div className={styles.buttons}>
                    <button
                        onMouseDown={() => handleMouseDownIncrement(20)}
                        onMouseUp={handleMouseUp}
                    >
                        {"<< 20"}
                    </button>
                    <button
                        onMouseDown={() => handleMouseDownIncrement(10)}
                        onMouseUp={handleMouseUp}
                    >
                        {"<< 10"}
                    </button>
                    <button
                        onMouseDown={() => handleMouseDownIncrement(5)}
                        onMouseUp={handleMouseUp}
                    >
                        {"<< 5"}
                    </button>
                    <button
                        onMouseDown={() => handleMouseDownIncrement(1)}
                        onMouseUp={handleMouseUp}
                    >
                        {"<< 1"}
                    </button>
                </div>
                <div className={styles.countDiv}>
                    <h2>{count}</h2>
                </div>
                <div className={styles.buttons}>
                    <button
                        onMouseDown={() => handleMouseDownDecrement(1)}
                        onMouseUp={handleMouseUp}
                    >
                        {"1 >>"}
                    </button>
                    <button
                        onMouseDown={() => handleMouseDownDecrement(5)}
                        onMouseUp={handleMouseUp}
                    >
                        {"5 >>"}
                    </button>
                    <button
                        onMouseDown={() => handleMouseDownDecrement(10)}
                        onMouseUp={handleMouseUp}
                    >
                        {"10 >>"}
                    </button>
                    <button
                        onMouseDown={() => handleMouseDownDecrement(20)}
                        onMouseUp={handleMouseUp}
                    >
                        {"20 >>"}
                    </button>
                </div>
            </div>
        </div>
    )
}
