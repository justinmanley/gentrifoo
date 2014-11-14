var CensusTract = L.Polygon.extend({
	initialize: function(feature, options) {
		var latlngs = L.GeoJSON.coordsToLatLngs(feature.geometry.coordinates, 1);

		this.tract_id = feature.properties.tractId;

		L.Polygon.prototype.initialize.call(this, latlngs, options);
	},

	index: function(registry) {
		registry.insert(this);
		return this;
	},

	getBBox: function() {
		var bounds = this.getBounds();

		return [bounds.getNorth(), bounds.getEast(), bounds.getSouth(), bounds.getWest() ];
	},

	getId: function() {
		return this._tract_id;
	},

	getPropertyValue: function() {
		/* Check the property values of surrounding things. */
	}
});