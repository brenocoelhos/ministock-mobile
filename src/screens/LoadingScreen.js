import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size="large" />
      <Text style={styles.text}>Carregando MiniStock</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: colors.muted,
    marginTop: 12
  }
});
