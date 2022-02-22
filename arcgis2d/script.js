require([
	  "esri/Map",
      "esri/views/MapView",
	  "esri/layers/FeatureLayer",
      "dojo/domReady!"
    ], function(
      Map,MapView, FeatureLayer
    ) {

  const counties = new FeatureLayer({
		url:"https://services.arcgis.com/jIL9msH9OI208GCb/ArcGIS/rest/services/USA_Daytime_Population_2016/FeatureServer",
      outFields: ["*"],
      popupTemplate: template
	  });
  
	  const hospitals = new FeatureLayer({
		url:"https://services2.arcgis.com/kNS2ppBA4rwAQQZy/arcgis/rest/services/MO_Hospitals/FeatureServer",
      outFields: ["*"],
      popupTemplate: template
	  });

     
      var map = new Map({
          basemap: "streets"
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
		  extent: { // autocasts as new Extent()
			xmin: -88.90255102448988,
			ymin: 35.75130441496898,
			xmax: -96.49893502954424,
			ymax: 40.64652480967901,
            spatialReference: 4326
          }
          
        });
    map.add(counties);  
	  map.add(hospitals);
	  
    });

var template = { // autocasts as new PopupTemplate()
        title: "What Happened?",
        content: [{

          type: "fields",
          fieldInfos: [{
            fieldName: "CollisnTyp",
            label: "Collision Type",
            visible: true
          }]
        }]
      };	

var symbol = {
  type: "simple-marker", 
  color:"red"
};
var renderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: symbol
};

//hospitals.renderer = renderer;
