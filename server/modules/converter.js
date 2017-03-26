// Получение списка всех станций
module.exports.getBikePointsInfo = function (answer){

	var list = JSON.parse(answer);
	var bikePointsInfo = [];
	var i = 0;
	for (var key in list) {
		bikePointsInfo[i] = JSON.stringify({
			commonName: list[key].commonName,
			id: list[key].id,
			coords: [list[key].lat, list[key].lon]
		});
		i++;
/*		delete list[key].$type;
		delete list[key].placeType;
		delete list[key].additionalProperties;
		delete list[key].children;
		delete list[key].childrenUrls;*/
	}

/*	var formatedList = [];
	var i = 0;
	for (var key in list) {
		formatedList[i] = list[key].id;
		i++;
		formatedList[i] = list[key].commonName;
		i++;
		formatedList[i] = list[key].lat;
		i++;
		formatedList[i] = list[key].lon;
		i++;
	}
	return formatedList;*/
	bikePointsInfo.sort();
	return bikePointsInfo;
}