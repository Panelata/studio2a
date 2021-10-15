import React from 'react';
import styles from "./adminSurvey.module.css"

const AdminSurvey = () => {
	return (
		<div>

            <div className={styles.row}> 
                <div className={styles.column}> 
                    <table className={styles.TopTwoTables}>
                        <tr> 
                             <th> Project Name </th>
                             <td> Enter Project Name </td>
                        </tr>

                    </table>
                </div>
                    
                <div className={styles.column}>
                    <table className={styles.TopTwoTables} > 
                        <th> Group Size </th>
                        <td> Enter Group Size</td>
                    </table>
                </div>


            </div>

            <div>
                <table className={styles.SkillsTable}>
                    <tr> <td> Skill A</td></tr>
                    <tr> <td> Skill B</td></tr>
                    <tr> <td> Skill C</td></tr>
                </table>
            </div>

            <button className={styles.AddSkillButton}> Add Skill </button>
            <br/>
            <br/>
            <button className={styles.UploadSurveyButton}> Upload Survey </button>

			

		</div>
	)
}


export default AdminSurvey;