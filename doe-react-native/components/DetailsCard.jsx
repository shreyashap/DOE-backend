import { ScrollView, View, Text, StyleSheet } from "react-native";

const EXCLUDED_KEYS = [
  "Cycle_Time_In_Seconds",
  "Spindle_Load",
  "Tool_Life_In_Nos",
  "Tool_Life_In_Mtr",
  "CPC_In_Rs",
  "Diameter_CPK",
  "Surface_Finish_Cpk",
];

const formatKey = (key) => {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toUpperCase();
};

const OtherDetailsSection = ({ data }) => {
  const filteredData = Object.entries(data).filter(
    ([key]) => !EXCLUDED_KEYS.includes(key)
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>📄 DOE Details</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredData.map(([key, value]) => (
          <View key={key} style={styles.detailItem}>
            <Text style={styles.cardLabel}>{formatKey(key)}:</Text>
            <Text style={styles.cardValue}>{value || "N/A"}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default OtherDetailsSection;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    backgroundColor: "#0f172b",
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00BFFF",
    marginBottom: 10,
    marginTop: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  detailItem: {
    marginBottom: 12,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
    paddingBottom: 8,
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
