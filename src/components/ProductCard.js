import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

export function ProductCard({ product, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.body}>
        <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
        <Text numberOfLines={1} style={styles.category}>{product.category}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>US$ {Number(product.price).toFixed(2)}</Text>
          <Text style={styles.stock}>Estoque: {product.stock}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: 5
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 10
  },
  category: {
    color: colors.muted,
    fontSize: 13,
    textTransform: "capitalize"
  },
  image: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 6,
    height: 72,
    width: 72
  },
  pressed: {
    opacity: 0.8
  },
  price: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: "800"
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  stock: {
    color: colors.muted,
    fontSize: 12
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700"
  }
});
