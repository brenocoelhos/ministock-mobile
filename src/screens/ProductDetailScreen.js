import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { Button } from "../components/Button";
import { ErrorState } from "../components/ErrorState";
import { deleteProduct, getProductById } from "../services/productService";
import { colors } from "../theme/colors";

export function ProductDetailScreen({ navigation, route }) {
  const { productId } = route.params;
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const loadProduct = useCallback(async () => {
    setError("");
    setLoading(true);

    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadProduct);
    return unsubscribe;
  }, [loadProduct, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product?.title || "Produto"
    });
  }, [navigation, product]);

  async function confirmDelete() {
    Alert.alert("Remover produto", "Deseja remover este produto do catalogo?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive", onPress: handleDelete }
    ]);
  }

  async function handleDelete() {
    setDeleting(true);

    try {
      await deleteProduct(productId);
      navigation.goBack();
    } catch (requestError) {
      Alert.alert("Erro", requestError.message);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadProduct} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>{product.category}</Text>

      <View style={styles.metrics}>
        <Metric label="Preco" value={`US$ ${Number(product.price).toFixed(2)}`} />
        <Metric label="Estoque" value={String(product.stock)} />
        <Metric label="Nota" value={String(product.rating)} />
      </View>

      <Text style={styles.sectionTitle}>Descricao</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.actions}>
        <Button onPress={() => navigation.navigate("ProductForm", { product })}>Editar</Button>
        <Button danger loading={deleting} onPress={confirmDelete} outline>
          Excluir
        </Button>
      </View>
    </ScrollView>
  );
}

function Metric({ label, value }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 10,
    marginTop: 24
  },
  category: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 4,
    textTransform: "capitalize"
  },
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  container: {
    padding: 16,
    paddingBottom: 32
  },
  description: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24
  },
  image: {
    alignSelf: "center",
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    height: 240,
    width: "100%"
  },
  metric: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 12
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4
  },
  metricValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800"
  },
  metrics: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 18
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 16
  }
});
