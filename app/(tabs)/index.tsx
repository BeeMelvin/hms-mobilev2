import { StyleSheet, View, Text, ScrollView } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function HomeScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const api = axios.create({
      baseURL: "http://196.252.236.180:8000/api", // Replace with your local IP
    });
    api
      .get("list/assign/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Assignments</Text>
      {data.length > 0 ? (
        data.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No assignments available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5", // Light background
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333", // Darker text for contrast
  },
  card: {
    backgroundColor: "#fff", // White card
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  noDataText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});
