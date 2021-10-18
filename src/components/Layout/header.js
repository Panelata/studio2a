import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import auth from '../auth';


const renderAdminHeader = () => {
	return (
		<div className={styles.headerContainer}>
			<NavLink to="/admin-home">View all Classes</NavLink>
			<NavLink to="/admin/register">Register a student</NavLink>
		</div>
	)
}

const renderStudentHeader = () => {
	return (
		<div className={styles.headerContainer}>
			<NavLink to="/student-home">View your classes</NavLink>
		</div>
	)
}

const Header = () => {
	const [authenticated, setAuthenticated] = React.useState(false);
	const [userType, setUserType] = React.useState("");

	React.useEffect(() => {
		setAuthenticated(auth.isAuthenticated());
		setUserType(auth.getUserType());
	}, []);

	return (
		<div>
			{authenticated ?
				<>
					You are logged in as a {userType}
					{(userType === "student" && renderStudentHeader()) || (userType === "admin" && renderAdminHeader())}
				</>
				:
				<>
				</>
			}
		</div>
	)
}

export default Header;