import React, { useState, useEffect } from "react";


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