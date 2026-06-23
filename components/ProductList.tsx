import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import Product from "./Product";
import AppButton from "./AppButton";
import { ProductData } from "../context/SearchContext";
import { colors, spacing, typography } from "../constants/theme";
import { Picker } from "@react-native-picker/picker";
 
type SortOption =
  | "price-asc"
  | "price-desc"
  | "store-asc"
  | "store-desc";

type Props = {
  title: string;
  products: ProductData[];
  onBack: () => void;
};

export default function ProductList({ title, products, onBack }: Props) {

  const [sortOption, setSortOption] = useState<SortOption>("price-asc");

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      case "store-asc":
        return a.storeName.localeCompare(b.storeName);

      case "store-desc":
        return b.storeName.localeCompare(a.storeName);

      default:
        return 0;
    }
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Picker
        selectedValue={sortOption}
        onValueChange={(value) => setSortOption(value)}
      >
        <Picker.Item label="Price: Low → High" value="price-asc" />
        <Picker.Item label="Price: High → Low" value="price-desc" />
        <Picker.Item label="Store: A → Z" value="store-asc" />
        <Picker.Item label="Store: Z → A" value="store-desc" />
      </Picker>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>
        {products.length} product{products.length !== 1 ? "s" : ""} found
      </Text>

      {products.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.empty}>No products to display.</Text>
        </View>
      )}

      {sortedProducts.map((product, index) => (
        <View key={index} style={styles.productCard}>
          <Product
            productName={product.productName}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
            storeName={product.storeName}
          />
        </View>
      ))}

      <AppButton
        title="Back to Search"
        variant="outline"
        onPress={onBack}
        style={styles.backButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  count: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  emptyState: {
    padding: spacing.lg,
    alignItems: "center",
  },
  empty: {
    ...typography.body,
    color: colors.textSecondary,
  },
  productCard: {
    marginBottom: spacing.md,
  },
  backButton: {
    marginTop: spacing.sm,
  },
});
