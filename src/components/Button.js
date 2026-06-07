import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../theme/colors";

export function Button({ children, danger, disabled, loading, onPress, outline, style }) {
  const buttonStyle = [
    styles.button,
    outline && styles.outline,
    danger && styles.danger,
    disabled && styles.disabled,
    style
  ];

  const textStyle = [styles.text, outline && styles.outlineText, danger && styles.dangerText];

  return (
    <Pressable disabled={disabled || loading} onPress={onPress} style={({ pressed }) => [buttonStyle, pressed && styles.pressed]}>
      {loading ? <ActivityIndicator color={outline ? colors.primary : colors.surface} /> : <Text style={textStyle}>{children}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 16
  },
  danger: {
    backgroundColor: colors.danger,
    borderColor: colors.danger
  },
  dangerText: {
    color: colors.surface
  },
  disabled: {
    opacity: 0.55
  },
  outline: {
    backgroundColor: colors.surface
  },
  outlineText: {
    color: colors.primary
  },
  pressed: {
    opacity: 0.82
  },
  text: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700"
  }
});
