import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CategoryFilter } from "../components/CategoryFilter";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { ProductCard } from "../components/ProductCard";
import { useAuth } from "../contexts/AuthContext";
import { listCategories, listProducts } from "../services/productService";
import { colors } from "../theme/colors";

export function ProductListScreen({ navigation, route }) {
  const { signOut } = useAuth();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={signOut} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Sair</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("ProductForm")} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Novo</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation, signOut]);

  const loadProducts = useCallback(
    async ({ nextPage = 0, replace = true, silent = false } = {}) => {
      if (!silent) {
        setLoading(nextPage === 0);
      }

      setError("");

      try {
        const data = await listProducts({ page: nextPage, search: submittedSearch, category });
        setProducts((current) => (replace ? data.products : [...current, ...data.products]));
        setPage(nextPage);
        setHasMore(data.skip + data.limit < data.total);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [category, submittedSearch]
  );

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await listCategories();
        setCategories(data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    const deletedProductId = route.params?.deletedProductId;

    if (!deletedProductId) {
      return;
    }

    setProducts((current) => current.filter((product) => product.id !== deletedProductId));
    navigation.setParams({ deletedProductId: undefined });
  }, [navigation, route.params?.deletedProductId]);

  function handleSearchSubmit() {
    setSubmittedSearch(search);
  }

  function handleRefresh() {
    setRefreshing(true);
    loadProducts({ nextPage: 0, replace: true, silent: true });
  }

  function handleLoadMore() {
    if (loading || loadingMore || !hasMore) {
      return;
    }

    setLoadingMore(true);
    loadProducts({ nextPage: page + 1, replace: false, silent: true });
  }

  function handleCategorySelect(nextCategory) {
    setCategory(nextCategory);
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <View style={styles.controls}>
        <View style={styles.searchBox}>
          <TextInput
            autoCapitalize="none"
            onChangeText={setSearch}
            onSubmitEditing={handleSearchSubmit}
            placeholder="Buscar produto"
            returnKeyType="search"
            style={styles.searchInput}
            value={search}
          />
          <TouchableOpacity onPress={handleSearchSubmit} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        <CategoryFilter categories={categories} selected={category} onSelect={handleCategorySelect} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : error ? (
        <ErrorState message={error} onRetry={() => loadProducts()} />
      ) : (
        <FlatList
          data={products}
          contentContainerStyle={styles.listContent}
          style={styles.list}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<EmptyState message="Ajuste a busca ou selecione outra categoria." />}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.primary} style={styles.footer} /> : null}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.35}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => navigation.navigate("ProductDetail", { productId: item.id })} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  controls: {
    backgroundColor: colors.background,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    zIndex: 2
  },
  footer: {
    paddingVertical: 18
  },
  headerButton: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  headerButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "800"
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1
  },
  list: {
    flex: 1
  },
  listContent: {
    paddingBottom: 18,
    paddingTop: 8
  },
  searchBox: {
    flexDirection: "row",
    gap: 8,
    padding: 16,
    paddingBottom: 4
  },
  searchButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    minWidth: 82,
    paddingHorizontal: 12
  },
  searchButtonText: {
    color: colors.surface,
    fontWeight: "800"
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    flex: 1,
    fontSize: 16,
    minHeight: 44,
    paddingHorizontal: 12
  }
});
