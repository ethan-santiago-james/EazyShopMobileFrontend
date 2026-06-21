import { View, Text, StyleSheet, ScrollView } from "react-native";
import Product from "./Product";
import AppButton from "./AppButton";
import { ProductData } from "../context/SearchContext";
import { colors, spacing, typography } from "../constants/theme";

type Props = {
  title: string;
  products: ProductData[];
  onBack: () => void;
};

export default function ProductList({ title, products, onBack }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>
        {products.length} product{products.length !== 1 ? "s" : ""} found
      </Text>

      {products.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.empty}>No products to display.</Text>
        </View>
      )}

      {products.map((product, index) => (
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
