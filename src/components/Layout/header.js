import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import auth from '../auth';

const renderAdminHeader = () => {
	return (
		
		<div className={styles.headerContainer}>
			<NavLink to="/admin-home" exact activeStyle={{fontWeight: 'bold',color: 'blue' }} >View all Classes </NavLink>
				<NavLink to="/new-task" exact activeStyle={{fontWeight: 'bold',color: 'blue' }} >Create New Assignment</NavLink>
				<NavLink to="/admin/register" exact activeStyle={{fontWeight: 'bold', color:'blue'}}>Register a student</NavLink>
			
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