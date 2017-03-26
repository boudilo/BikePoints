// Получение списка всех станций
module.exports.getBikePoints = function (answer){

	var list = JSON.parse(answer);
	for (var key in list) {
		delete list[key].$type;
		delete list[key].placeType;
		delete list[key].additionalProperties;
		delete list[key].children;
		delete list[key].childrenUrls;
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
	return list;
}