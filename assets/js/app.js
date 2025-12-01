// Set Access Token
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMTZhNWEwNi1iYzBjLTQwMTMtOTlmNC03MDhjOGU1NGI5NDkiLCJpZCI6MzY1NDg2LCJpYXQiOjE3NjQ1ODU3ODN9.PxWnrUGCKjAkEzC2vxBhpcyFbH31Bex1WFu26wC6EvM";

const viewer = new Cesium.Viewer("map", {
  terrain: Cesium.Terrain.fromWorldTerrain(),   // ⬅ updated for latest API
  baseLayerPicker: false,
  selectionIndicator: true,
  infoBox: true,
  shouldAnimate: true
});

// Fallout-style dark theme
viewer.scene.backgroundColor = Cesium.Color.BLACK;

// Load KML police track
Cesium.KmlDataSource.load("assets/maps/Track2.kml", {
  clampToGround: true
}).then((ds) => {
  viewer.dataSources.add(ds);

  ds.entities.values.forEach((e) => {
    if (e.polyline) {
      e.polyline.material = Cesium.Color.LIME.withAlpha(0.85);
      e.polyline.width = 3;
    }
    if (e.billboard) {
      e.billboard.color = Cesium.Color.LIME;
      e.billboard.scale = 0.8;
    }
  });

  viewer.zoomTo(ds);
});