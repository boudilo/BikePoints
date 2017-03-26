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
	}
	bikePointsInfo.sort();
	return bikePointsInfo;
}