describe("CensusTract", function() {
	var tract, model;

	beforeEach(function() {
		tract = new CensusTract({
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: [[[0, 0], [1,1]]]
			},
			properties: {
				tractId: "1",
				yearBuiltMean: "1852.0",
				meanStories: "8.0"
			}
		});
		model = new GentrificationModel();
	});

	describe("#initialize", function() {
		it("Should be an instance of L.Polygon", function() {
			expect(tract).to.be.an.instanceOf(L.Polygon);
		});

		it("Should parse tract statistics as numbers.", function() {
			expect(tract.properties.yearBuiltMean).to.equal(1852);
			expect(tract.properties.meanStories).to.equal(8);
		});
	});

	describe("#getBBox", function() {
		it("Should act as the identity when tract is rectangular.", function() {
			var bbox = tract.getBBox();

			expect(bbox).to.deep.equal([1, 1, 0, 0]);
		});
	});

	describe("#getPropertyValue", function() {
		it("Should have its full base value when year is yearBuiltMean.", function() {
			var expected = CensusTract.basePropertyValue*tract.properties.meanStories,
				actualPropertyValue = tract.getPropertyValue(tract.properties.yearBuiltMean);

			expect(actualPropertyValue).to.equal(expected);
		});

		it("Should decrease after 50 years", function() {
			var fiftyYearsLater = 48.4,
				actual = tract.getPropertyValue(tract.properties.yearBuiltMean + 50);

			expect(actual).to.be.closeTo(fiftyYearsLater, 0.1);
		});
	});
});