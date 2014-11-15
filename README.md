Silly gentrification model for the fall 2014 hack@uchicago hackathon.  Meant to teach Leaflet.

Usage
=======

You need [`grunt`](http://gruntjs.com/) installed to run the tests.  You can install `grunt` with `npm install -g grunt-cli`.

To install this project, run:

```bash
npm install
grunt # watch source files and test on change 
```

You can start a server using `npm start`.  The main page `index.html` can then be accessed at `localhost:8080`.

Extending
=========

1. Add a panel to the map to show additional data from the GeoJSON file when the user hovers over a census tract.  

	Suggestion: Add a div to the map with a fixed height and width.  Position it absolutely and make sure it has a z-index that is higher than that of the map.  Give it an id.  Each time a CensusTract gets a `mouseover` event, get the `<div>` using `L.DomUtil.get` and change its content based on the properties of the CensusTract.

2. Add a slider so that the user can advance time forwards and backwards.

	Suggestion: Create a div outside of the map and add a slider element ([HTML Range Input](http://www.w3schools.com/jsref/dom_obj_range.asp)).  Listen for changes on the range element and call `GentrificationModel#simulateYear` with the appropriate year. Alternatively, use Angular.js.

3. Improve the property deterioration model - make the condition of properties in each census tract depend on the conditions in neighboring census tracts.  (Make use of the spatial indexing of the RTree that is built in to the GentrificationModel).

	Suggestion:  Use [rbush#search](https://github.com/mourner/rbush#search) to find the neighboring census tracts in the RTree.  Devise a heuristic to update the property value of each census tract based on the values of its neighbors. If you really want to make this a silly model of gentrification and not just a silly model of property deterioration, talk to me.

Attribution
========
Both data sets are from the City of Chicago Data Portal

[Building Footprints](https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Census-Tracts-2010/5jrd-6zik)

[2010 Census Tracts](https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Census-Tracts-2010/5jrd-6zik)


Further Reading
========
For more reading about gentrification and rent gap theory, see:

"Toward a Theory of Gentrification: A Back to the City Movement by Capital, not People", Journal of the American Planning Association, Neil Smith

"Producing Gentrification", Gentrification, Loretta Lees et. al.

"Gentrification and land rent: A historical view of the rent gap in Minneapolis", Urban Geography, D.J. Hammel