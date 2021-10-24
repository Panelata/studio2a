import React, { Component } from 'react';
import './SkillListStyle.css'
import Skill from './Skill';

class SkillList extends Component {

	
	render(){
		const skills = this.props.skills;
		return (
			<label>
				{skills.map(skill => {
				return <Skill skill={skill} key={skill.mappingID} />;		
				})}
			</label>
		)
	}
}

export default SkillList;
