import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setError("");

    if (!email && !password) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      return;
    } else if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!password) {
      setPasswordError("Password is required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://doe-backend.onrender.com/auth/user/login",
        {
          email,
          password,
        }
      );
      const { token } = res.data;

      await AsyncStorage.setItem("token", token);
      navigation.replace("Search");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={(text) => {
          setEmail(text);
          if (text) setEmailError("");
        }}
        keyboardType="email-address"
      />
      {emailError !== "" && <Text style={styles.errorData}>{emailError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        onChangeText={(text) => {
          setPassword(text);
          if (text) setPasswordError("");
        }}
        secureTextEntry
      />
      {passwordError !== "" && (
        <Text style={styles.errorData}>{passwordError}</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.switchText}>
        Don’t have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 24,
    justifyContent: "center",
  },
  back: {
    color: "#00BFFF",
    marginBottom: 12,
    fontSize: 16,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: "#333",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#00BFFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switchText: {
    color: "#bbb",
    textAlign: "center",
  },
  link: {
    color: "#00BFFF",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 12,
  },
  errorData: {
    color: "red",
    textAlign: "left",
    marginBottom: 12,
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
});
