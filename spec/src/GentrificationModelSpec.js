describe("GentrificationModel", function() {
	var tract, model;

	beforeEach(function() {
		var geojson = {
			type: 'feature',
			geometry: {
				type: 'Polygon',
				coordinates: [[[0, 0], [1,1]]]
			},
			properties: {
				tractId: "1",
				yearBuiltMean: "1852.0",
				meanStories: "8.0"
			}
		};

		tract = new CensusTract(geojson);
		model = new GentrificationModel();
	});

	describe("#initialize", function() {
		it("Should be an RTree", function() {
			expect(model).to.be.an.instanceOf(rbush);
		});
	});

	describe("#addTract", function() {
		it("Should add the tract to the RTree", function() {
			model.addTract(tract);
		});
	});

	describe("#minYear", function() {
		it("Should be the year of the tract when the model contains only one tract", function() {
			model.addTract(tract);
			expect(model.minYear()).to.equal(tract.yearBuiltMean);
		});
	});

	describe("#maxPropertyValue", function() {
		it("Should be the initial value of the tract when the model contains only one tract", function() {
			var startYear = tract.properties.yearBuiltMean;

			model.addTract(tract);
			expect(model.maxPropertyValue()).to.equal(tract.getPropertyValue(startYear));
		});
	});
});