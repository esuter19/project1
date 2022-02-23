require(["esri/Map", "esri/views/SceneView", "esri/layers/GeoJSONLayer", "esri/widgets/Legend", "esri/layers/FeatureLayer"], (
        Map,
        SceneView,
        GeoJSONLayer,
        Legend,
        FeatureLayer
      ) => {
  
        const renderer = {
          type: "simple",
          symbol: {
            type: "polygon-3d",
            symbolLayers: [
              {
                type: "extrude"
              }
            ]
          },
          visualVariables: [
            /*{
              type: "size",
              field: "TOTPOP_CY",
              legendOptions: {
                title: "Population (height)"
              },
              stops: [
                {
                  value: 2199,
                  size: 10000,
                  label: "2,199"
                },
                {
                  value: 1001814,
                  size: 300000,
                  label: "1,001,814"
                }
              ]
            },*/
            {
              type: "color",
              field: "TOTPOP_CY",
              legendOptions: {
                title: "Population (color)"
              },
              stops: [
                {
                  value: 0,
                  color: "#eff3ff",
                  label: "<10k"
                },
                {
                  value: 10000,
                  color: "#c6dbef",
                  label: "10k-25k"
                },
                {
                  value: 25000,
                  color: '#9ecae1',
                  label: "25k-50k"
                },
                {
                  value: 50000,
                  color: '#6baed6',
                  label: "50k-100k"
                },
                {
                  value: 100000,
                  color: '#3182bd',
                  label: "100k-500k"
                },
                {
                  value: 500000,
                  color: '#08519c',
                  label: ">500k"
                }
              ]
            }
          ]
        };

        const povLayer = new GeoJSONLayer({
          url:
            "https://esuter19.github.io/project1/leaflet/USA_2016_Daytime_Population.geojson",
          renderer: renderer,
          opacity: 0.9,
          title: "Missouri County Population and Number of Hospitals",
          outFields: ["*"],
          popupTemplate: {
            title: "{NAME}",
            content: "{TOTPOP_CY} people live in this county at a density of {POPDENS_CY} people per square mile",
            fieldInfos: [
              {
                fieldName: "TOTPOP_CY",
                format: {
                  digitSeparator: true,
                  places: 0
                }
              }
            ]
          }
        });
 
  const hospitals = new FeatureLayer({
            url:
                'https://services2.arcgis.com/kNS2ppBA4rwAQQZy/arcgis/rest/services/MO_Hospitals/FeatureServer',
            outFields: ['*']
        });

        var hsymbol = {
            type: 'picture-marker',
            url:
                'https://esuter19.github.io/project1/16-167195_medical-cross-symbol-png-clipart.png',
            width: '10px',
            height: '10px'
        };

        hospitals.renderer = {type: 'simple', symbol: hsymbol};

        const map = new Map({
          basemap: "osm",
          layers: [povLayer, hospitals]
        });

        const view = new SceneView({
  container: "viewDiv",
  map: map,
  viewingMode: "local",
  extent: {
			xmin: -88.90255102448988,
			ymin: 35.75130441496898,
			xmax: -96.49893502954424,
			ymax: 40.64652480967901,
            spatialReference: 4326
          }
});

        const legend = new Legend({
          view: view
        });

        view.ui.add(legend, "bottom-right");
      });
