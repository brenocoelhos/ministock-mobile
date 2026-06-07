import React, { useLayoutEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput } from "react-native";

import { Button } from "../components/Button";
import { createProduct, updateProduct } from "../services/productService";
import { colors } from "../theme/colors";

export function ProductFormScreen({ navigation, route }) {
  const editingProduct = route.params?.product;
  const isEditing = Boolean(editingProduct);
  const [brand, setBrand] = useState(editingProduct?.brand || "");
  const [category, setCategory] = useState(editingProduct?.category || "");
  const [description, setDescription] = useState(editingProduct?.description || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(editingProduct?.price ? String(editingProduct.price) : "");
  const [stock, setStock] = useState(editingProduct?.stock ? String(editingProduct.stock) : "");
  const [title, setTitle] = useState(editingProduct?.title || "");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar produto" : "Novo produto"
    });
  }, [isEditing, navigation]);

  function validate() {
    if (!title.trim() || !description.trim() || !category.trim() || !price.trim() || !stock.trim()) {
      return "Preencha todos os campos obrigatorios.";
    }

    if (Number.isNaN(Number(price)) || Number(price) <= 0) {
      return "Informe um preco valido.";
    }

    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      return "Informe um estoque valido.";
    }

    return "";
  }

  async function handleSubmit() {
    const validationError = validate();
    setError(validationError);

    if (validationError) {
      return;
    }

    setLoading(true);

    const payload = {
      title: title.trim(),
      brand: brand.trim(),
      category: category.trim(),
      description: description.trim(),
      price: Number(price),
      stock: Number(stock)
    };

    try {
      const savedProduct = isEditing
        ? await updateProduct(editingProduct.id, payload)
        : await createProduct(payload);

      Alert.alert("Sucesso", isEditing ? "Produto atualizado." : "Produto cadastrado.");

      if (isEditing) {
        navigation.replace("ProductDetail", { productId: savedProduct.id || editingProduct.id });
      } else {
        navigation.goBack();
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.keyboard}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Field label="Nome" onChangeText={setTitle} value={title} />
        <Field label="Marca" onChangeText={setBrand} value={brand} />
        <Field label="Categoria" onChangeText={setCategory} value={category} />
        <Field keyboardType="decimal-pad" label="Preco" onChangeText={setPrice} value={price} />
        <Field keyboardType="number-pad" label="Estoque" onChangeText={setStock} value={stock} />
        <Field
          label="Descricao"
          multiline
          onChangeText={setDescription}
          value={description}
        />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Button loading={loading} onPress={handleSubmit}>
          {isEditing ? "Salvar alteracoes" : "Cadastrar produto"}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, multiline, ...props }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={label}
        style={[styles.input, multiline && styles.multiline]}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        {...props}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32
  },
  error: {
    color: colors.danger,
    fontSize: 14,
    marginBottom: 12
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 12
  },
  keyboard: {
    flex: 1
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
    marginTop: 12
  },
  multiline: {
    minHeight: 110,
    paddingTop: 12
  }
});
