    import React from "react";
    import { View, StyleSheet, Pressable, Text } from "react-native";
    import { WebView } from "react-native-webview";
    import { Store } from "../context/SearchContext";

    type ViewMode =
  | "search"
  | "brands"
  | "stores"
  | "all"
  | "brand-products"
  | "map"
  | "store-products";
  
    type Props = {
      shoppingRoute: Store[];
      setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
      routeMode: string;
  };

  export default function Map({ shoppingRoute, setViewMode, routeMode }: Props ) {

    console.log("Shopping Route Mode: " + routeMode)
      const html = `
  <!DOCTYPE html>
  <html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css"
/>
<script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>
  <style>
  #map { height:100vh; width:100%; margin:0; }
  body { margin:0; }
  </style>
  </head>

  <body>
  <div id="map"></div>

  <script>
  const shoppingRoute = ${JSON.stringify(shoppingRoute)};

  const map = L.map('map').setView([-45.862941, 170.5271], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
  }).addTo(map);

  shoppingRoute.forEach(s => {
      L.marker([s.latitude, s.longitude])
          .addTo(map)
          .bindPopup(\`<b>\${s.storeName}</b>\`);
  });
  const control = L.Routing.control({
    waypoints: shoppingRoute.map(
        s => L.latLng(s.latitude, s.longitude)
    ),
    router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: '${routeMode}',
    }),
    routeWhileDragging: false,
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    show: false
}).addTo(map);


  </script>
  </body>
  </html>
  `;

    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ html }} />

            <Pressable
                style={styles.backButton}
                onPress={() => setViewMode("search")}
            >
                <Text style={styles.backText}>← Back</Text>
            </Pressable>
        </View>
    );
  }

  const styles = StyleSheet.create({
        backButton: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "white",
        elevation: 5, // Android shadow
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },

    backText: {
        fontSize: 16,
        fontWeight: "bold"
    }
});