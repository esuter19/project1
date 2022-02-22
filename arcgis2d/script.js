require(["esri/Map", "esri/views/MapView", "esri/WebMap"], function (Map, MapView, WebMap) {
        var map = new Map({
          basemap: "topo-vector"
        });
        
        var webmap = new WebMap({
          portalItem: { // autocasts as new PortalItem()
          id: "e82ef13bd54e4d5f9a4816893d644a18"
        }
      });

        var view = new MapView({
          container: "viewDiv",
          map: webmap,
          zoom: 10,
          center: [-90.4423392383084,38.62829009276375] // longitude, latitude
        });
      });
