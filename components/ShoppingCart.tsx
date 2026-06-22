import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

import { CartItem } from "../context/SearchContext";

interface ShoppingCartModalProps {
  visible: boolean;
  onClose: () => void;
  items: CartItem[];
}

export default function ShoppingCartModal({
  visible,
  onClose,
  items,
}: ShoppingCartModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/* Dark background */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Prevent modal from closing when tapping inside */}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.cartContainer}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Shopping Cart</Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {items.length === 0 ? (
            <Text style={styles.emptyText}>
              Your cart is empty.
            </Text>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => item.productId.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemName}>
                    {item.productName}
                  </Text>
                  <Text>x{item.quantity}</Text>
                </View>
              )}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  cartContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: "50%",
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemName: {
    fontSize: 16,
  },
});