export const colors = {
  primary: "#3498db",
  primaryDark: "#2980b9",
  background: "#f0f4f8",
  surface: "#ffffff",
  text: "#1a1a2e",
  textSecondary: "#6b7280",
  textOnPrimary: "#ffffff",
  border: "#e2e8f0",
  accent: "#27ae60",
  accentDark: "#219a52",
  shadow: "#000000",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: "400" as const,
  },
  label: {
    fontSize: 14,
    fontWeight: "600" as const,
  },
};

export const shadows = {
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
};
