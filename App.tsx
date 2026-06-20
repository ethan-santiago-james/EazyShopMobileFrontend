import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SearchProducts from './pages/SearchProducts';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.title}>EazyShop</Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Compare prices, build your shopping list, and find the most efficient route.
        </Text>

        <Text style={styles.disclaimer}>
          Student project - University of Otago - This website uses MOCK DATA,
          and DOES NOT reflect real-life prices or represent local or global
          market chains.
        </Text>

        <View style={styles.hr} />
      </View>
      <SearchProducts />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    textAlign: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: "#3498db",
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  disclaimer: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  hr: {
    marginTop: 16,
    height: 1,
    backgroundColor: '#ccc',
  }
});
