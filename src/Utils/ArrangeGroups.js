import getRandomInt from "./GetRandomInt";

/**
 * 
 * @param {Objectp[]} clusteredGroups formatted groups from the k-means clusters
 * @returns 
 */
export default function (clusteredGroups) {
	let finalGroups = Array.apply(null, Array(clusteredGroups.length)).map(function () { return [] });
	let position = 0;

	function incrementPosition() {
		position++;
		if (position == clusteredGroups.length) position = 0;
	}

	for (let i = 0; i < clusteredGroups.length; i++) {
		let cluster = clusteredGroups[i];
		for (let u = 0; u < cluster.length; u++) {
			finalGroups[position].push(cluster[u]);
			incrementPosition();
		}
	};
	console.log("%cFinal groups", "color:yellow", finalGroups)

	return finalGroups;
};