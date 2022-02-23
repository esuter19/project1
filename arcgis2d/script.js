require(
    [
        'esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer',
        'esri/layers/GeoJSONLayer', 'esri/symbols/PictureMarkerSymbol',
        'esri/symbols/SimpleFillSymbol', 'esri/widgets/Legend',
        'esri/renderers/ClassBreaksRenderer', 'dojo/domReady!'
    ],
    function(
        Map, MapView, FeatureLayer, GeoJSONLayer, PictureMarkerSymbol,
        SimpleFillSymbol, Legend, ClassBreaksRenderer) {
        var template = { // autocasts as new PopupTemplate()
        title: 'County Info',
        content: [{

          type: 'fields',
          fieldInfos: [{
            fieldName: 'NAME',
            label: 'Name',
            visible: true
          },{
            fieldName: 'TOTPOP_CY',
            label: 'Population',
            visible: true
          }]
        }]
      };
        const less10k = {
            type: 'simple-fill',
            color: '#eff3ff',
            style: 'solid',
            outline: {width: 0.2, color: 'black'}
        };
        const less25k = {
            type: 'simple-fill',
            color: '#c6dbef',
            style: 'solid',
            outline: {width: 0.2, color: 'black'}
        };
        const less50k = {
            type: 'simple-fill',
            color: '#9ecae1',
            style: 'solid',
            outline: {width: 0.2, color: 'black'}
        };
        const less100k = {
            type: 'simple-fill',
            color: '#6baed6',
            style: 'solid',
            outline: {width: 0.2, color: 'black'}
        };
        const less500k = {
            type: 'simple-fill',
            color: '#3182bd',
            style: 'solid',
            outline: {width: 0.2, color: 'black'}
        };
        const greater500k = {
            type: 'simple-fill',
            color: '#08519c',
            style: 'solid',
            outline: {width: 0.2, color: 'black'}
        };
        const countyrenderer = {
            type: 'class-breaks',
            field: 'TOTPOP_CY',
            legendOptions: {title: 'County Population'},
            defaultSymbol: {
                type: 'simple-fill',
                color: 'black',
                style: 'backward-diagonal',
                outline: {width: 2, color: [50, 50, 50, 0.6]}
            },
            defaultLabel: 'no data',
            classBreakInfos: [
                {minValue: 0, maxValue: 9999, symbol: less10k, label: '< 10K'},
                {
                    minValue: 10000,
                    maxValue: 24999,
                    symbol: less25k,
                    label: '10-25k'
                },
                {
                    minValue: 25000,
                    maxValue: 49999,
                    symbol: less50k,
                    label: '25k-50k'
                },
                {
                    minValue: 50000,
                    maxValue: 99999,
                    symbol: less100k,
                    label: '50k-100k'
                },
                {
                    minValue: 100000,
                    maxValue: 499999,
                    symbol: less500k,
                    label: '100k-500k'
                },
                {
                    minValue: 100000,
                    maxValue: 2000000,
                    symbol: greater500k,
                    label: '>500k'
                }
            ]
        };
        const counties = new GeoJSONLayer({
            url:
                'https://esuter19.github.io/project1/leaflet/USA_2016_Daytime_Population.geojson',
            outFields: ['*'],
            popupTemplate: template,
            renderer: countyrenderer
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


        var map = new Map({basemap: 'streets'});

        var view = new MapView({
            container: 'viewDiv',
            map: map,
            extent: {
                // autocasts as new Extent()
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
