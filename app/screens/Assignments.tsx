import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from 'expo-router';

interface Assignment {
  id: number;
  title: string;
  description: string;
  due_date: string;
}

const AssignmentsScreen: React.FC = () => {
  const [data, setData] = useState<Assignment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation(); // Get navigation object

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Assignment[]>('http://192.168.120.11:8000/api/assign/view');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to load assignments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Assignments</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6200EA" />
      ) : error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchAssignments}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          {data.length > 0 ? (
            data.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.dueDate}>Due: {item.due_date}</Text>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => navigation.navigate('AssignmentsDetails', { assignment: item })}
                >
                  <Text style={styles.openButtonText}>Open</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noAssignments}>No assignments found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff', // Light blue background
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif', // Universally supported font
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    borderLeftWidth: 8,
    borderLeftColor: '#6200ea', // Accent color
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    lineHeight: 22,
  },
  dueDate: {
    fontSize: 14,
    color: '#ff1744', // Red for due date
    marginBottom: 12,
  },
  openButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  openButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  error: {
    color: '#ff0000',
    marginBottom: 10,
    textAlign: 'center',
  },
  noAssignments: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#777',
  },
});

export default AssignmentsScreen;
