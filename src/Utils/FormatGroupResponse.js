/**
 * Formats the sql response from retrieving surveys
 * @param {Object[]} data The raw sql data returned from a groups/retrieve api call
 * @returns The groups in the for array of groups with an array of studens in each array
 */
export default function (data) {
	// This is going to be really slow but i got less than a day before demoing
	// Basically the backend returns an array of student objects with a groupID parameter 
	// I am then converting that into an array of groups with an array of students inside each group
	let extractedGroups = []
	data.forEach(student => {
		let groupNum = extractedGroups.findIndex((element) => element.hasOwnProperty(`${student.groupID}`));
		if (groupNum == -1) {
			let key = `${student.groupID}`;
			let newGroup = {};
			newGroup[key] = [student];
			extractedGroups.push(newGroup);
		} else {
			let key = (Object.getOwnPropertyNames(extractedGroups[groupNum]))[0];
			let addGroup = extractedGroups[groupNum];
			addGroup[key].push(student);
		}
	});
	let finalisedGroups = extractedGroups.map(Object.values);
	finalisedGroups = finalisedGroups.map(group => group[0]);
	return finalisedGroups;
}