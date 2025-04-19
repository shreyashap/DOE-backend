import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import OtherDetailsSection from "../components/DetailsCard";

const Details = ({ route }) => {
  const { data } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Section 1: Results */}
      <Text style={styles.sectionTitle}>📊 Results</Text>
      <View style={styles.cardContainer}>
        <Text style={styles.cardLabel}>Cycle Time In Seconds:</Text>
        <Text style={styles.cardValue}>{data?.Cycle_Time_In_Seconds} N</Text>

        <Text style={styles.cardLabel}>Spindle Load:</Text>
        <Text style={styles.cardValue}>{data?.Spindle_Load} N</Text>

        <Text style={styles.cardLabel}>Tool Life In Nos:</Text>
        <Text style={styles.cardValue}>{data?.Tool_Life_In_Nos} N</Text>

        <Text style={styles.cardLabel}>Tool Life In Mtr:</Text>
        <Text style={styles.cardValue}>{data?.Tool_Life_In_Nos} °C</Text>

        <Text style={styles.cardLabel}>CPC In Rs:</Text>
        <Text style={styles.cardValue}>{data?.CPC_In_Rs}</Text>
      </View>

      {/* Section 2: DOE Details */}
      <OtherDetailsSection data={data} />
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00BFFF",
    marginBottom: 10,
    marginTop: 20,
  },
  cardContainer: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  cardLabel: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 10,
  },
  cardValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
