var CensusRegistry = function() {
	/* Starting year */
	this.year; 

	this.rtree = rbush(5);
	this.tracts = {};
};

CensusRegistry.prototype.insert = function(tract) {
	var bounds = tract.getBBox();

	this.tracts[tract.getId()] = tract;
	this.rtree.insert(bounds);
};

CensusRegistry.nextYear = function() {
	
};