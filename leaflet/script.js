var map = L.map('mapid').setView([38.59392963882343, -92.47387134946011], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 12,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.getJSON("https://esuter19.github.io/project1/leaflet/MO_Hospitals.geojson",function(data){
	var hospitalIcon = L.icon({
		iconUrl: "https://www.pinclipart.com/picdir/big/16-167195_medical-cross-symbol-png-clipart.png",
		iconSize: [10,10]
	});
  
  L.geoJson(data ,{
    pointToLayer: function(feature,latlng){
	  return L.marker(latlng,{icon: hospitalIcon});
    }
  } ).addTo(map);
});



$.getJSON("https://esuter19.github.io/project1/leaflet/USA_2016_Daytime_Population.geojson",function(data){
  
  var counties = L.geoJson(data ,{
		geometryToLayer: function(feature,latlng){
			var marker = L.marker(latlng);
	  		marker.bindPopup(feature.properties.NAME + '<br/>'+feature.properties.TOTPOP_CY);
	  		return marker;
  		},
    style:style
	});
  
  function getColor(d) {
    return d > 1000000 ? '#800026' :
           d > 500000  ? '#BD0026' :
           d > 100000  ? '#E31A1C' :
           d > 50000  ? '#FC4E2A' :
           d > 25000   ? '#FD8D3C' :
           d > 10000   ? '#FEB24C' :
           d > 5000   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.TOTPOP_CY),
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7
    };
}
  
  L.geoJson(data,{style: style}).addTo(map);
});
