import React, { useState, useEffect } from "react";
import styles from './RandomMessage.module.css'

export default function RandomMessage() {
    const url = 'https://api.api-ninjas.com/v1/quotes';
    const apiKey = process.env.REACT_APP_QUOTE_API_KEY;

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    function fetchQuote() {
        setLoading(true);
        setError(null);

        fetch(url, {
            method: "GET",
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json'
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('quoteData', JSON.stringify(data));
            setData(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }

    useEffect(() => {
        const storedQuoteData = localStorage.getItem('quoteData');
        if (storedQuoteData) {
            setData(JSON.parse(storedQuoteData));
            setLoading(false);
        } else {
            fetchQuote();
        }
    }, []);

    function handleClick(e) {
        e.preventDefault();
        fetchQuote();
    }

    if (error) return <p>Error: {error}</p>
    if (!data || data.length === 0) return <p>...</p>
    
    return (
        <div className={styles.container}>
            <div className={styles.quoteBox}>
                <p className={styles.quote}>" {data[0].quote} "</p>
                <p className={styles.author}>- {data[0].author}</p>
                <p className={styles.category}>- {data[0].category.toUpperCase()} -</p>
            </div>
            <div>
                <button className={styles.newQuoteButton}onClick={handleClick}>New Quote</button>
            </div>
        </div>
    )
}