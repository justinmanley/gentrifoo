/*jshint unused:false */
var CensusTract = L.Polygon.extend({
	statics: {
		basePropertyValue: 10
	},

	initialize: function(feature, options) {
		var latlngs = L.GeoJSON.coordsToLatLngs(feature.geometry.coordinates, 1),
			convertToInt = ['yearBuiltMean', 'yearBuiltMax', 'yearBuiltMin', 'meanStories', 'maxStories', 'minStories'];

		this.properties = feature.properties;

		_.each(convertToInt, function(prop) {
			this.properties[prop] = parseInt(this.properties[prop], 10);
		}, this);

		this.propertyValue = 0;

		L.Polygon.prototype.initialize.call(this, latlngs, options);
	},

	onAdd: function(map) {
		this.on('mouseover', function() {
			console.log(this.properties.yearBuiltMean);
		}, this);

		this.on('mouseover', function() {
			// this.setStyle({ fill: false });
		}, this);

		L.Polygon.prototype.onAdd.call(this, map);
	},

	addToModel: function(model) {
		model.addTract(this);
		this.rtree = model;

		return this;
	},

	getBBox: function() {
		var bounds = this.getBounds();

		return [bounds.getNorth(), bounds.getEast(), bounds.getSouth(), bounds.getWest() ];
	},

	getId: function() {
		return this.properties.tractId;
	},

	getNeighbors: function() {

	},

	getPropertyValue: function(year) {
		var baseValue = CensusTract.basePropertyValue*this.properties.meanStories,
			timeSinceBuilt = 0;

		if (year >= this.properties.yearBuiltMean) {
			timeSinceBuilt = year - this.properties.yearBuiltMean;
			this.propertyValue = baseValue*Math.pow(0.99, timeSinceBuilt);
		}

		return this.propertyValue;
	}
});