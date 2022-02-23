var map = L.map('mapid').setView([38.59392963882343, -92.47387134946011], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 12,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.getJSON("../common/MO_Hospitals.geojson",function(data){
	var hospitalIcon = L.icon({
		iconUrl: "../common/16-167195_medical-cross-symbol-png-clipart.png",
		iconSize: [10,10]
	});
  
  L.geoJson(data ,{
    pointToLayer: function(feature,latlng){
	  return L.marker(latlng,{icon: hospitalIcon});
    }
  } ).addTo(map);
});



$.getJSON("../common/USA_2016_Daytime_Population.geojson",function(data){
  
  var counties = L.geoJson(data ,{
    style:style
	});
  
  function popup(feature,layer){
    layer.bindPopup(feature.properties.NAME+"<br>Population:"+feature.properties.TOTPOP_CY);
  }
  
  function getColor(d) {
    return d > 500000 ? '#08519c' :
           d > 100000  ? '#3182bd' :
           d > 50000  ? '#6baed6' :
           d > 25000   ? '#9ecae1' :
           d > 10000   ? '#c6dbef'      :'#eff3ff'
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.TOTPOP_CY),
        weight: 2,
        opacity: 1,
        color:"black",
        fillOpacity: 0.7
    };
}
  
  L.geoJson(data,{style: style, onEachFeature:popup}).addTo(map);
});
