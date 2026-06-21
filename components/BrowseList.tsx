import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AppButton from "./AppButton";
import { colors, radii, spacing, shadows, typography } from "../constants/theme";

type BrowseItem = {
  id: number;
  name: string;
  productCount: number;
};

type Props = {
  title: string;
  items: BrowseItem[];
  onSelect: (id: number) => void;
  onBack: () => void;
};

export default function BrowseList({ title, items, onSelect, onBack }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>{title}</Text>

      {items.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.empty}>No items to display.</Text>
        </View>
      )}

      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => onSelect(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.itemContent}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCount}>
              {item.productCount} product{item.productCount !== 1 ? "s" : ""}
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    ...typography.label,
    fontSize: 17,
    color: colors.text,
  },
  itemCount: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  chevron: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: "300",
    marginLeft: spacing.sm,
  },
  backButton: {
    marginTop: spacing.sm,
  },
});
