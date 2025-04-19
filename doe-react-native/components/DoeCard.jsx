import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const DoeCard = ({ data }) => {
  const navigation = useNavigation();
  console.log(data);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { data })}
    >
      {/* Header */}
      <View style={styles.header}>
        <Feather name="tool" size={20} color="#3B82F6" />
        <Text style={styles.title}>
          {data?.Tool || "Tool"} — {data?.["Tool_Diameter"]}
        </Text>
      </View>

      {/* Basic Info */}
      <View style={styles.grid}>
        <Item icon="hash" label="DOE Serial" value={data?.DOE_Serial_Number} />
        <Item
          icon="layers"
          label="Material"
          value={data?.["Part_Material_Grade_CI/SGI"]}
        />
        <Item
          icon="trending-up"
          label="Speed In VC"
          value={data?.["Speed_In_VC"]}
        />
        <Item
          icon="align-left"
          label="Feed"
          value={data?.["Feed_In_mm/revolution"]}
        />
      </View>

      {/* Response Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Response Results</Text>
        <View style={styles.grid}>
          <Item
            icon="clock"
            label="Cycle time"
            value={data?.["Cycle_Time_In_Seconds"]}
            color="#10B981"
          />
          <Item
            icon="zap"
            label="Spindle Load"
            value={data?.["Spindle_Load"]}
            color="#FACC15"
          />
          <Item
            icon="tool"
            label="Tool Life (Nos)"
            value={data?.["Tool_Life_In_Nos"]}
            color="#6366F1"
          />
          <Item
            icon="bar-chart-2"
            label="Tool Life (Mtr)"
            value={data?.["Tool_Life_In_Mtr"]}
            color="#8B5CF6"
          />
          <Item
            icon="dollar-sign"
            label="CPC (Rs)"
            value={data?.["CPC_In_Rs"]}
            color="#F43F5E"
          />
          <Item
            icon="activity"
            label="Diameter CPK"
            value={data?.["Diameter_CPK"]}
            color="#EC4899"
          />
          <Item
            icon="star"
            label="Surface Finish Cpk"
            value={data?.["Surface_Finish_Cpk"]}
            color="#22D3EE"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Item = ({ icon, label, value, color = "#9CA3AF" }) => (
  <View style={styles.row}>
    <Feather name={icon} size={14} color={color} />
    <Text style={styles.label}>
      <Text style={styles.bold}>{label}:</Text> {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3B82F6",
    marginLeft: 8,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: "#374151",
    marginTop: 12,
    paddingTop: 12,
  },
  sectionTitle: {
    color: "#F3F4F6",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  row: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  label: {
    color: "#D1D5DB",
    fontSize: 13,
    flexShrink: 1,
  },
  bold: {
    fontWeight: "600",
    color: "#E5E7EB",
  },
});

export default DoeCard;
