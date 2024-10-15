import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, ScrollView } from 'react-native';
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
      setData(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load assignments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Assignments</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Button title="Retry" onPress={fetchAssignments} />
        </View>
      ) : (
        <ScrollView>
          {data.length > 0 ? (
            data.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.dueDate}>Due: {item.due_date}</Text>
                <Button
                  title="Open"
                  onPress={() => navigation.navigate('AssignmentsDetails', { assignment: item })} // Update this line
                />
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  dueDate: {
    fontSize: 12,
    color: '#ff0000', // Red color for due date
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  noAssignments: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default AssignmentsScreen;
