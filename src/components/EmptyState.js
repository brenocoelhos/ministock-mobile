import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

export function EmptyState({ message = "Nenhum produto encontrado." }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sem resultados</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 24
  },
  message: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 6,
    textAlign: "center"
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700"
  }
});
