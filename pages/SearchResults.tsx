import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import { colors, radii, spacing, shadows, typography } from "../constants/theme";

type Props = {
  numBrands: number;
  numStores: number;
  onViewAll: () => void;
  onViewStores: () => void;
  onViewBrands: () => void;
};

export default function SearchResults({
  numBrands,
  numStores,
  onViewAll,
  onViewStores,
  onViewBrands,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Results</Text>
      <Text style={styles.subheading}>
        Browse matching products by store or brand
      </Text>

      <AppButton title="View All Products" onPress={onViewAll} />

      {numStores > 0 && (
        <AppButton
          title={`Browse by Store (${numStores})`}
          variant="outline"
          onPress={onViewStores}
          style={styles.button}
        />
      )}

      {numBrands > 0 && (
        <AppButton
          title={`Browse by Brand (${numBrands})`}
          variant="outline"
          onPress={onViewBrands}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  heading: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subheading: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
  },
});
