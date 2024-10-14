import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface Assignment {
  id: number;
  title: string;
  description: string;
}

const AssignmentsScreen: React.FC = () => {
  const [data, setData] = useState<Assignment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get<Assignment[]>('http://196.252.198.216:8000/api/assign/view');
        setData(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load assignments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading assignments...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : data.length > 0 ? (
        data.map((item) => (
          <Text key={item.id}>
            {item.title}: {item.description}
          </Text>
        ))
      ) : (
        <Text>No assignments found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default AssignmentsScreen;
