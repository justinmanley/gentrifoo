var map = L.map('map').setView([41.7896,-87.5996], 15);

/* From http://leaflet-extras.github.io/leaflet-providers/preview/ */
L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20
}).addTo(map);

d3.json('data/BuildingsByCensusTract.geojson', function(err, data) {
	var model = new GentrificationModel(),
		year;

	if (err) { throw err; }
	else {
		data.features.forEach(function(feature) {
			new CensusTract(feature, { fill: true, fillOpacity: 0, weight: 1 })
				.addToModel(model)
				.addTo(map);
		});
	}
}); 
