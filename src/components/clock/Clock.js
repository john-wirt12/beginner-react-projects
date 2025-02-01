import React, { useState, useEffect } from "react";

// clock function that updates every second. Important to note that this component will only rerender itself
// Thus making the page more efficient as compared to having to load the entire page every second
export default function Clock() {
    const [ currentTime, setCurrentTime ] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000)

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h3>{currentTime.toLocaleString()}</h3>
        </div>
    )
}