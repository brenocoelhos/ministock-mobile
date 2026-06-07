import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProductDetailScreen } from "../screens/ProductDetailScreen";
import { ProductFormScreen } from "../screens/ProductFormScreen";
import { ProductListScreen } from "../screens/ProductListScreen";
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="Products" component={ProductListScreen} options={{ title: "MiniStock" }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Produto" }} />
      <Stack.Screen name="ProductForm" component={ProductFormScreen} options={{ title: "Cadastro" }} />
    </Stack.Navigator>
  );
}
