
export default async function (data) {
	let mergedData = [];
	data.forEach(user => {
		data.forEach(row => {
			if (user.userID == row.userID && user.mappingID != row.mappingID) {
				let userIndex = mergedData.findIndex(element => element.userID == row.userID);
				if (userIndex == -1) {
					mergedData.push({ userID: row.userID, skillA: row.score });
				} else {
					mergedData[userIndex].skillB = row.score;
				};
			};
		});
	});
	console.log("mergedData", mergedData)
	return mergedData;
};