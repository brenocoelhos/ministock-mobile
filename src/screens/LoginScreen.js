import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { colors } from "../theme/colors";

export function LoginScreen() {
  const { signIn } = useAuth();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      await signIn(username.trim(), password);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brand}>MiniStock</Text>
          <Text style={styles.subtitle}>Controle de produtos para equipe de estoque</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setUsername}
            placeholder="Digite o usuario"
            style={styles.input}
            value={username}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            onChangeText={setPassword}
            placeholder="Digite a senha"
            secureTextEntry
            style={styles.input}
            value={password}
          />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <Button disabled={!username || !password} loading={loading} onPress={handleLogin}>
            Entrar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  brand: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "900"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24
  },
  error: {
    color: colors.danger,
    fontSize: 14,
    marginBottom: 12
  },
  form: {
    gap: 8
  },
  header: {
    marginBottom: 34
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 14
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    marginTop: 8
  }
});
