import { ScrollView, View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import Product from "../components/Product";
import SearchResults from "./SearchResults";
import { useSearch } from "../context/SearchContext";

type Brand = {
  brandId: number;
  brandName: string;
  products: typeof Product[];
};

type Store = {
  storeId: number;
  storeName: string;
  products: typeof Product[];
}

export default function SearchProducts() {
  const [routeMode, setRouteMode] = useState("driving");
  const [searchQuery, setSearchQuery] = useState("");
  const { brands, stores, setBrands, setStores } = useSearch();

  const [categories, setCategories] = useState<string[]>([]);
  const [searchedForProduct, setSearchedForProduct] = useState<boolean>(false);

  const handleSearch = async () => {

      const responseBrands = await fetch('http://localhost:3000/api/brands?search=' + searchQuery);
      const dataBrands = await responseBrands.json();

      setBrands(dataBrands);

      const responseStores = await fetch('http://localhost:3000/api/stores?search=' + searchQuery);
      const dataStores = await responseStores.json();

      setStores(dataStores);
      setSearchedForProduct(true);

  }
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Search Products</Text>

      <TextInput
        placeholder="Search products..."
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.buttonSpacing}>
        <Button title="Search" onPress={handleSearch} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="View Shopping Cart" onPress={() => {}} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="Clear Cart" onPress={() => {}} />
      </View>

      <Text style={styles.label}>Route Type</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={routeMode}
          onValueChange={(itemValue) => setRouteMode(itemValue)}
        >
          <Picker.Item label="Driving" value="driving" />
          <Picker.Item label="Walking" value="walking" />
          <Picker.Item label="Cycling" value="cycling" />
        </Picker>
      </View>

      <View style={styles.buttonSpacing}>
        <Button
          title="Generate Shopping Trip"
          onPress={() => {}}
        />
      </View>

      {searchedForProduct && brands.length === 0 && stores.length === 0 && (
        <Text>No results found for "{searchQuery}".</Text>
      )}

      {searchedForProduct && brands.length > 0 && stores.length > 0 && (
        
        <SearchResults numBrands={brands.length} numStores={stores.length} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  buttonSpacing: {
    marginBottom: 12,
  },
});