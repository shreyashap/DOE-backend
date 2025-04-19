import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/logo.png";

const Landing = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/30335244/pexels-photo-30335244/free-photo-of-vintage-industrial-factory-interior-design.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>DOE Assistant for Engineers</Text>
        <Text style={styles.subtitle}>
          Streamline your tool life and performance analysis
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#00BFFF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
