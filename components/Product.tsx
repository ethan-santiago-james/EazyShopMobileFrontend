import { View, Text, Image, StyleSheet } from "react-native";
import AppButton from "./AppButton";
import { colors, radii, spacing, shadows, typography } from "../constants/theme";
import { useSearch } from "../context/SearchContext";

type ProductProps = {
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
  storeName: string;
};

export default function Product({
  productName,
  description,
  price,
  imageUrl,
  storeName,
}: ProductProps) {
  const formattedPrice = Number(price).toFixed(2);
  const { addToCart } = useSearch();
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>{productName}</Text>
          <Text style={styles.price}>${formattedPrice}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.storeBadge}>
          <Text style={styles.storeText}>{storeName}</Text>
        </View>

        <AppButton
          title="Add to Cart"
          variant="accent"
          onPress={() => addToCart({ productId: Date.now(), productName, price, quantity: 1, imageUrl, storeName })}
          style={styles.addButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    overflow: "hidden",
    ...shadows.card,
  },
  image: {
    width: 110,
    height: 130,
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  name: {
    ...typography.label,
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.accent,
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  storeBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    marginTop: spacing.sm,
  },
  storeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: "600",
  },
  addButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
  },
});
