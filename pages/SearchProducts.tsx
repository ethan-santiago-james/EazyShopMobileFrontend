import { ScrollView, View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import BrowseList from "../components/BrowseList";
import ProductList from "../components/ProductList";
import { ProductData, Store, useSearch } from "../context/SearchContext";
import ShoppingCartModal from "../components/ShoppingCart";
import Map from "../components/Map";

import {
  normalizeBrands,
  normalizeProducts,
  normalizeStores,
} from "../utils/normalize";

type ViewMode =
  | "search"
  | "brands"
  | "stores"
  | "all"
  | "brand-products"
  | "map"
  | "store-products";

  
type MapProps = {
    shoppingRoute: any;
    stores: Store[];
};

export default function SearchProducts() {
  const [routeMode, setRouteMode] = useState("driving");
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [cartVisible, setCartVisible] = useState(false);
  const { brands, stores, setBrands, setStores, setSearchQuery, searchQuery, cartItems, clearCart,
    userLocation, requestUserLocation, storesInCart, setStoresInCart, shoppingRoute, setShoppingRoute } = useSearch();

  const [searchedForProduct, setSearchedForProduct] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("search");
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState<ProductData[]>([]);
  const [loadingAllProducts, setLoadingAllProducts] = useState(false);
  const [detailProducts, setDetailProducts] = useState<ProductData[]>([]);
  const [loadingDetailProducts, setLoadingDetailProducts] = useState(false);

  function showShoppingCart() {
    setCartVisible(true);
  }

  useEffect(() => {
    if (viewMode !== "all") return;

    let cancelled = false;
    setLoadingAllProducts(true);

    fetch(`http://192.168.1.132:3000/api/products?search=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
      
        const products = normalizeProducts(data);
        setAllProducts(products);
      
        setStores((prevStores) =>
          prevStores.map((store: any) => ({
            ...store,
            searchedProductCount: products.filter(
              (p) => p.storeName === store.storeName
            ).length,
          }))
        );
      })
      .finally(() => {
        if (!cancelled) setLoadingAllProducts(false);
      });

    return () => {
      cancelled = true;
    };
  }, [viewMode, searchQuery]);

  useEffect(() => {
    if (viewMode === "brand-products" && selectedBrandId !== null) {
      let cancelled = false;
      setLoadingDetailProducts(true);

      fetch(
        `http://192.168.1.132:3000/api/productsforbrand?search=${searchQuery}&brandId=${selectedBrandId}`
      )
        .then((response) => response.json())
        .then((data) => {
          
          if (!cancelled) setDetailProducts(normalizeProducts(data));
        })
        .finally(() => {
          if (!cancelled) setLoadingDetailProducts(false);
        });

      return () => {
        cancelled = true;
      };
    }

    if (viewMode === "store-products" && selectedStoreId !== null) {
      let cancelled = false;
      setLoadingDetailProducts(true);

      fetch(
        `http://192.168.1.132:3000/api/productsforstore?search=${searchQuery}&storeId=${selectedStoreId}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!cancelled) setDetailProducts(normalizeProducts(data));
        })
        .finally(() => {
          if (!cancelled) setLoadingDetailProducts(false);
        });

      return () => {
        cancelled = true;
      };
    }

    setDetailProducts([]);
    return undefined;
  }, [viewMode, selectedBrandId, selectedStoreId, searchQuery]);

  const handleSearch = async () => {
    const responseBrands = await fetch(
      "http://192.168.1.132:3000/api/brands?search=" + localSearchQuery
    );
    const dataBrands = await responseBrands.json();
    setBrands(normalizeBrands(dataBrands));

    const responseStores = await fetch(
      "http://192.168.1.132:3000/api/stores?search=" + localSearchQuery
    );
    const dataStores = await responseStores.json();
    
    setStores((prevStores) => normalizeStores(dataStores));

    setSearchQuery(localSearchQuery);
    setSearchedForProduct(true);
    setViewMode("search");
    setSelectedBrandId(null);
    setSelectedStoreId(null);
  };

  const handleGenerateShoppingTrip = async () => {

    
   const loc = await requestUserLocation();

  const userStore: Store = {
    storeId: -1,
    storeName: "Current Location",
    latitude: loc?.latitude || 0,
    longitude: loc?.longitude || 0,
  };

  const updatedStores = [...storesInCart, userStore];
  setStoresInCart(updatedStores);

    try {
        
        const response = await fetch(
        "http://192.168.1.132:3000/api/storestovisit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stores: updatedStores
          }),
        }
      );

      const data = await response.json();
      console.log("Data: " + data)
      const shortestRoute = [];

      for (const storeId of data["path"]) {
        const store = updatedStores.find((s) => s.storeId === storeId);
        console.log("Store in shortest path: " + store)
        if (store) {
          shortestRoute.push(store);
        }
      }
      

      setShoppingRoute(shortestRoute);
      setViewMode("map");

    } catch(error) {

      console.error("Error generating shopping trip:", error);
    }

  }

  const backToSearch = () => {
    setViewMode("search");
    setSelectedBrandId(null);
    setSelectedStoreId(null);
  };

  if (viewMode === "brands") {
    return (
      <BrowseList
        title={`Brands matching "${searchQuery}"`}
        items={brands.map((brand) => ({
          id: brand.brandId,
          name: brand.brandName,
          productCount: brand.productCount || 0,
        }))}
        onSelect={(id) => {
          setSelectedBrandId(id);
          setViewMode("brand-products");
        }}
        onBack={backToSearch}
      />
    );
  }

  if (viewMode === "stores") {
    
    return (
      <BrowseList
        title={`Stores with "${searchQuery}"`}
        items={stores.map((store) => ({
          id: store.storeId,
          name: store.storeName,
          productCount: store.productCount || 0,
        }))}
        onSelect={(id) => {
          setSelectedStoreId(id);
          setViewMode("store-products");
        }}
        onBack={backToSearch}
      />
    );
  }

  if (viewMode === "all") {
    if (loadingAllProducts) {
      return (
        <View style={styles.container}>
          <Text>Loading products...</Text>
          <View style={styles.buttonSpacing}>
            <Button title="Back to Search" onPress={backToSearch} />
          </View>
        </View>
      );
    }

    return (
      <ProductList
        title={`All products matching "${searchQuery}"`}
        products={allProducts}
        onBack={backToSearch}
      />
    );
  }

  if (viewMode === "brand-products" && selectedBrandId !== null) {
    const brand = brands.find((b) => b.brandId === selectedBrandId);
    if (loadingDetailProducts) {
      return (
        <View style={styles.container}>
          <Text>Loading products...</Text>
          <View style={styles.buttonSpacing}>
            <Button title="Back" onPress={() => setViewMode("brands")} />
          </View>
        </View>
      );
    }
    return (
      <ProductList
        title={brand ? `${brand.brandName} products` : "Brand products"}
        products={detailProducts}
        onBack={() => setViewMode("brands")}
      />
    );
  }

  if (viewMode === "map") {

    return (
      <Map shoppingRoute={shoppingRoute} />
    );
  }

  if (viewMode === "store-products" && selectedStoreId !== null) {
    const store = stores.find((s) => s.storeId === selectedStoreId);
    if (loadingDetailProducts) {
      return (
        <View style={styles.container}>
          <Text>Loading products...</Text>
          <View style={styles.buttonSpacing}>
            <Button title="Back" onPress={() => setViewMode("stores")} />
          </View>
        </View>
      );
    }
    return (
      <ProductList
        title={store ? `${store.storeName} products` : "Store products"}
        products={detailProducts}
        onBack={() => setViewMode("stores")}
      />
    );
  }

  return (

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Search Products</Text>

        <TextInput
          placeholder="Search products..."
          style={styles.input}
          value={localSearchQuery}
          onChangeText={setLocalSearchQuery}
        />

        <View style={styles.buttonSpacing}>
          <Button title="Search" onPress={handleSearch} />
        </View>

        <View style={styles.buttonSpacing}>
          <Button
            title={`View Shopping Cart (${cartItems.length})`}
            onPress={showShoppingCart}
          />
        </View>

        <View style={styles.buttonSpacing}>
          <Button title="Clear Cart" onPress={clearCart} />
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
          <Button title="Generate Shopping Trip" onPress={handleGenerateShoppingTrip} />
        </View>

        {searchedForProduct && brands.length === 0 && stores.length === 0 && (
          <Text>No results found for "{searchQuery}".</Text>
        )}

        {searchedForProduct && (brands.length > 0 || stores.length > 0) && (
          <SearchResults
            numBrands={brands.length}
            numStores={stores.length}
            onViewAll={() => setViewMode("all")}
            onViewStores={() => setViewMode("stores")}
            onViewBrands={() => setViewMode("brands")}
          />
        )}

        <ShoppingCartModal
          visible={cartVisible}
          onClose={() => setCartVisible(false)}
          items={cartItems}
        />
        
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
