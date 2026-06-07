import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "./Button";
import { colors } from "../theme/colors";

export function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Algo saiu do esperado</Text>
      <Text style={styles.message}>{message}</Text>
      {!!onRetry && <Button onPress={onRetry} outline style={styles.button}>Tentar novamente</Button>}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 18
  },
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
    color: colors.danger,
    fontSize: 18,
    fontWeight: "700"
  }
});
