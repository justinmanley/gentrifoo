var GentrificationModel = function() {
	this.tracts = {};

	/* Initialize rbush. */
	rbush.call(this, 5);
};

/* Mix in methods from rbush. */
GentrificationModel.prototype = rbush.prototype;

GentrificationModel.prototype.addTract = function(tract) {
	var bounds = tract.getBBox();

	this.tracts[tract.getId()] = tract;
	this.insert(bounds);
};

GentrificationModel.prototype.simulateYear = function(year) {
	_.each(this.tracts, function(tract) {

		/* Displays differences in value better than the linear scale.  Might not be correct, though... */
		var color = d3.scale.sqrt()
			.domain([0, this.maxPropertyValue()])
			.range([0, 1]);

		tract.setStyle({
			fillOpacity: color(tract.getPropertyValue(year))
		});
	}, this);
};

GentrificationModel.prototype.getTract = function(id) {
	return this.tracts[id];
};

GentrificationModel.prototype.minYear = function() {
	return _.max(this.tracts, 'properties.yearBuiltMean').yearBuiltMean;
};

GentrificationModel.prototype.maxYear = function() {
	return _.max(this.tracts, 'properties.yearBuiltMean').yearBuiltMean;
};

GentrificationModel.prototype.maxPropertyValue = function() {
	var tract = _.max(this.tracts, function(tract) {
		return CensusTract.basePropertyValue*tract.properties.meanStories;
	});

	return CensusTract.basePropertyValue*tract.properties.meanStories;
};