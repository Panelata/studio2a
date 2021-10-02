import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import auth from '../auth';

const Header = () => {
	const [authenticated, setAuthenticated] = React.useState(false);
	React.useEffect(() => {
		setAuthenticated(auth.isAuthenticated());
	}, []);

	return (
		<div>
			{authenticated ?
				<div className={styles.headerContainer}>
					<NavLink to="/admin/register">Register User</NavLink>
					<NavLink to="/admin-home">Admin Homepage</NavLink>
					<NavLink to="/new-task">Create a New Assignment</NavLink>
					<NavLink to="/join-task">Add your details for an Assignment</NavLink>
					<NavLink to="/student-home">Student Homepage</NavLink>
				</div>
				:
				<div>
					<NavLink to="/login">Login</NavLink>
				</div>
			}
		</div>
	)
}

export default Header;