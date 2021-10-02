import React from 'react';
import styles from "./adminHome.module.css"

const AdminHome = () => {
	return (
		<div>
			<h1> This is the admin Homepage </h1>
			
			<div> 
			<button type="button" className={styles.theButton}>Notifications </button>
			</div>
			<div className={styles.divPositioning}>
				<table className={styles.tableofSubjects}> 
					<tbody>
						<tr> 
							<th> Subject </th>
						</tr>
						<tr><td> Subject 1</td></tr>
						<tr><td> Subject 2</td></tr>
						<tr><td> Subject 3</td></tr>
						<tr><td> Subject 4</td></tr>
					</tbody>
				</table>

			</div>
			

		</div>
	)
}

export default AdminHome;
