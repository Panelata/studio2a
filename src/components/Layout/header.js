import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

const Header = () => {
	return (
		<div className={styles.headerContainer}>
			<NavLink to="/home">Home</NavLink>
			<NavLink to="/new-task">Create a New Assignment</NavLink>
			<NavLink to="/join-task">Add your details for an Assignment</NavLink>
		</div>
	)
}

export default Header;