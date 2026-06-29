import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { Store } from "../context/SearchContext";


const html = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<style>
  #map { height: 100vh; width: 100%; margin:0; }
  body { margin:0; }
</style>
</head>

<body>
<div id="map"></div>

<script>
  const map = L.map('map').setView([-37.787, 175.279], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);


  shoppingRoute.forEach(s => L.marker([s.latitude, s.longitude]).addTo(map));

  const route = L.polyline(shoppingRoute.map(s => [s.latitude, s.longitude]), {
    color: 'blue',
    weight: 4
  }).addTo(map);

  map.fitBounds(route.getBounds());
</script>

</body>
</html>
`;

export default function Map({ shoppingRoute }: { shoppingRoute: Store[] }) {

    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ html }} />
        </View>
    );
}