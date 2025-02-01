import React, { useState } from "react";
import styles from './Calculator.module.css';

/* 
    This is a basic calculator component that is built to calculate (x [+-x÷] y) formulas.
*/

export default function Calculator() {
    const [ input, setInput ] = useState('');
    const [ isError, setError ] = useState(false);

    function handleInput(input) {
        if(!isError) {
            setInput((prev) => prev + input);
        }
    }

    /*
        Calculate function that matches current input to a regular expression.
        If there is a match then the result will be determined by returning a function
        from the operator map (based on the operator used) and passing the two number values
        to it. The input is then set to string of the result.\

        In the event of an error the input is set to 'Error' and all buttons are temporarily 
        disabled expect for the 'Clear' button. There is a state for error which can be switched
        from true to false to determine if the buttons will be disabled or not.
    */

    function calculate() {
        const regex = /(^[0-9]+)([+\-X÷])([0-9]+$)/
        const match = input.match(regex);
        if (match) {
            const number1 = Number(match[1]);
            const number2 = Number(match[3]);
            const operator = match[2];

            const operatorMap = {
                '+': (a, b) => a + b,
                '-': (a, b) => a - b,
                'X': (a, b) => a * b,
                '÷': (a, b) => a / b
            }

            const result = operatorMap[operator](number1, number2);
            setInput(result.toString());
        } else {
            setInput('Error');
            setError(true);
        }
    }

    function clear() {
        setInput('');
        setError(false);
    }
    
    /*
        This is the calculator component. It returns a somewhat visually traditional version
        of a calculator although the functionality is quite limited in comparison to modern 
        calculators. However addition, subtraction, multiplication, and division of two values
        is allowed. Also you may keep calculating new values using the calculated values.
        (i.e. 2 + 2 = 4 + 2 = 6 / 3 = 2 + 2 = 4 and so on and so forth)
        
        There is certainly a potential for additional functionality that could be added quite 
        easily into the code that is already here. There is a column and a row that has been left 
        open for this purpose in fact. (x^x: value to the power of, x^0.5: square root of 
        value ...etc.)
    */
    return (
        <div className={styles.container}>
            <div className={styles.calc}>
                <div className={styles.example}>
                    <p>example: x [+-x÷] y = ...</p>
                </div>
                <div className={styles.output}>
                    <p>{input}</p>
                </div>
                <button 
                    className={styles.addition}
                    onClick={() => handleInput('+')}
                    disabled={isError}
                >
                    +
                </button>
                <button 
                    className={styles.subtraction}
                    onClick={() => handleInput('-')}
                    disabled={isError}
                >
                    -
                </button>
                <button 
                    className={styles.multiplication}
                    onClick={() => handleInput('X')}
                    disabled={isError}
                >
                    X
                </button>
                <button 
                    className={styles.division}
                    onClick={() => handleInput('÷')}
                    disabled={isError}
                >
                    ÷
                </button>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => {
                    return(
                        <button key={num} className={styles[`num${num}`]} onClick={() => handleInput(num.toString())} disabled={isError}>
                            {num}
                        </button>
                    )
                })}

                <button 
                    className={styles.clear}
                    onClick={clear}    
                >
                    Clear
                </button>
                <button 
                    className={styles.enter}
                    onClick={calculate}
                    disabled={isError}
                >
                    Enter
                </button>
            </div>
        </div>
    )
}