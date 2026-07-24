    import React, { useState } from "react";
    import { ActivityIndicator, View, StyleSheet, Pressable, Text } from "react-native";
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
    const [isGeneratingMap, setIsGeneratingMap] = useState(true);
    const [mapError, setMapError] = useState(false);

    const handleMapMessage = ({ nativeEvent }: { nativeEvent: { data: string } }) => {
      if (nativeEvent.data === "route-ready") {
        setIsGeneratingMap(false);
      }

      if (nativeEvent.data === "route-error") {
        setMapError(true);
      }
    };

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
  .trip-legs {
    background: white;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
    font: 13px/1.35 Arial, sans-serif;
    max-width: 220px;
    padding: 10px;
  }
  .trip-legs__title { display: block; font-weight: 700; margin-bottom: 6px; }
  .trip-legs__item { border-top: 1px solid #e5e7eb; padding: 6px 0; }
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
          .bindTooltip(s.storeName);
  });
  const routeLegs = shoppingRoute.slice(0, -1).map((start, index) => [
    start,
    shoppingRoute[index + 1],
  ]);
  const bounds = L.latLngBounds(
    shoppingRoute.map(s => [s.latitude, s.longitude])
  );
  map.fitBounds(bounds, { padding: [30, 30] });

  const tripLegsControl = L.control({ position: 'topright' });
  tripLegsControl.onAdd = () => {
    const container = L.DomUtil.create('div', 'trip-legs');
    const title = L.DomUtil.create('span', 'trip-legs__title', container);
    title.textContent = 'Trip legs';

    routeLegs.forEach(([start, end], index) => {
      const item = L.DomUtil.create('div', 'trip-legs__item', container);
      item.textContent = (index + 1) + '. ' + start.storeName + ' to ' + end.storeName;
    });

    return container;
  };
  tripLegsControl.addTo(map);

  let completedLegs = 0;
  routeLegs.forEach(([start, end]) => {
    const legControl = L.Routing.control({
      waypoints: [
        L.latLng(start.latitude, start.longitude),
        L.latLng(end.latitude, end.longitude),
      ],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: '${routeMode}',
      }),
      createMarker: () => null,
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      show: false,
    }).addTo(map);

    legControl.on('routesfound', () => {
      completedLegs += 1;
      if (completedLegs === routeLegs.length) {
        window.ReactNativeWebView?.postMessage('route-ready');
      }
    });

    legControl.on('routingerror', () => {
      window.ReactNativeWebView?.postMessage('route-error');
    });
  });


  </script>
  </body>
  </html>
  `;

    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ html }} onMessage={handleMapMessage} />

            {isGeneratingMap && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#3498db" />
                    <Text style={styles.loadingText}>
                        {mapError ? "Unable to generate route." : "Generating map..."}
                    </Text>
                </View>
            )}

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
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFill,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a2e",
    }
});
