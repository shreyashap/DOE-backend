import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import DoeCard from "../components/DoeCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import toolDiameterData from "../assets/toolDiameters.json";
import { useNavigation } from "@react-navigation/native";

let debounceTimer;

const Search = () => {
  const [diameter, setDiameter] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchDOE = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://doe-backend.onrender.com/doe?diameter=${diameter}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res.data);
      setSuggestions([]);
    } catch (err) {
      console.error("Error fetching DOE:", err);
    } finally {
      setLoading(false);
    }
  };

  // const fetchSuggestions = async (text) => {
  //   const token = await AsyncStorage.getItem("token");
  //   if (!token || text.length < 1) {
  //     setSuggestions([]);
  //     return;
  //   }

  //   try {
  //     const res = await axios.get(
  //       `https://doe-backend.onrender.com/doe/search/suggestions?query=${text}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     const suggestionsData = Array.isArray(res.data) ? res.data : [];
  //     setSuggestions(suggestionsData);
  //   } catch (err) {
  //     console.error("Error fetching suggestions:", err);
  //     setSuggestions([]); // fallback
  //   }
  // };

  const handleInputChange = (text) => {
    setDiameter(text);
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (!text || text.length < 1) {
        setSuggestions([]);
        return;
      }

      const filtered = toolDiameterData
        .filter((d) => d?.toLowerCase().includes(text.toLowerCase()))
        .slice(0, 10);

      setSuggestions(filtered);
    }, 300);
  };

  const handleSuggestionSelect = (value) => {
    setDiameter(value);
    setSuggestions([]);
    fetchDOE();
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Landing");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={styles.heading}>Search Tool Diameter</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text
              style={{ color: "#ff4d4d", fontSize: 16, fontWeight: "bold" }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Enter Tool Diameter"
          placeholderTextColor="#999"
          style={styles.input}
          value={diameter}
          onChangeText={handleInputChange}
        />

        {suggestions.length > 0 && (
          <View style={styles.suggestionContainer}>
            {suggestions.length > 0 &&
              suggestions?.map((s, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSuggestionSelect(s)}
                  style={styles.suggestionItem}
                >
                  <Text style={{ color: "#fff" }}>{s}</Text>
                </TouchableOpacity>
              ))}
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={fetchDOE}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator
            color="#00BFFF"
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.DOE_Serial_Number}
            renderItem={({ item }) => <DoeCard data={item} />}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  suggestionContainer: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: -10,
    marginBottom: 10,
    zIndex: 10,
    position: "absolute",
    top: 120,
    left: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 12,
  },

  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
});
