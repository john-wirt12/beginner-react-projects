import React from "react";
import styles from "./NavBar.module.css"
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <header className={styles.header}>
            <h1 className={styles.h1}>Project React App</h1>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink to="todolist">Todo List</NavLink>
                    </li>
                    <li>
                        <NavLink to="increment">Incrementer</NavLink>
                    </li>
                    <li>
                        <NavLink to="calculator">Calculator</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}