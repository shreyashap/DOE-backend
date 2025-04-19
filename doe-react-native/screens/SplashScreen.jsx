import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const validateToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.replace("Landing");
        return;
      }

      try {
        const res = await axios.post(
          "https://doe-backend.onrender.com/auth/verify-token",
          { token }
        );
        if (res.data.valid) {
          navigation.replace("Search");
        } else {
          navigation.replace("Landing");
        }
      } catch (err) {
        console.error("Token validation failed:", err.message);
        navigation.replace("Landing");
      }
    };

    validateToken();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
});
