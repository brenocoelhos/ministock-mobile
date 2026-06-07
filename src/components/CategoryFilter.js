import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { colors } from "../theme/colors";

export function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.wrapper} contentContainerStyle={styles.content}>
      <Chip active={!selected} label="Todas" onPress={() => onSelect("")} />
      {categories.map((category) => (
        <Chip
          key={category.slug}
          active={selected === category.slug}
          label={category.name}
          onPress={() => onSelect(category.slug)}
        />
      ))}
    </ScrollView>
  );
}

function Chip({ active, label, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text numberOfLines={1} style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    maxWidth: 150,
    minHeight: 36,
    paddingHorizontal: 12
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  chipText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize"
  },
  chipTextActive: {
    color: colors.surface
  },
  content: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  wrapper: {
    maxHeight: 58
  }
});
