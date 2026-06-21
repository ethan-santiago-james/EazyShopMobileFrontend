import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SearchProducts from "./pages/SearchProducts";
import { SearchProvider } from "./context/SearchContext";
import { colors, spacing, typography } from "./constants/theme";

export default function App() {
  return (
    <SearchProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>EazyShop</Text>
          <Text style={styles.subtitle}>
            Compare prices, build your shopping list, and find the most
            efficient route.
          </Text>
          <Text style={styles.disclaimer}>
            Student project — University of Otago. Uses MOCK DATA and does not
            reflect real-life prices or market chains.
          </Text>
        </View>
        <SearchProducts />
        <StatusBar style="light" />
      </View>
    </SearchProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.textOnPrimary,
    textAlign: "center",
  },
  subtitle: {
    ...typography.body,
    color: colors.textOnPrimary,
    textAlign: "center",
    marginTop: spacing.sm,
    opacity: 0.95,
    lineHeight: 22,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textOnPrimary,
    textAlign: "center",
    marginTop: spacing.sm,
    opacity: 0.75,
    lineHeight: 18,
  },
});
