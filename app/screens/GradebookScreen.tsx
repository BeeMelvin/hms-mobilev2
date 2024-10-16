import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

interface Grade {
  id: number;
  lecturer: string;
  submission: string;
  grade: number;
  feedback?: string;
  created_at: string;
}

const GradesScreen: React.FC = () => {
  const [data, setData] = useState<Grade[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Hard-coded grades for now
  const hardCodedGrades: Grade[] = [
    {
      id: 1,
      lecturer: "Dr. Smith",
      submission: "Assignment 1",
      grade: 85,
      feedback: "Great job!",
      created_at: "2024-10-01T10:00:00Z"
    },
    {
      id: 2,
      lecturer: "Dr. Johnson",
      submission: "Assignment 2",
      grade: 90,
      feedback: "Excellent work!",
      created_at: "2024-10-05T10:00:00Z"
    },
    {
      id: 3,
      lecturer: "Prof. Lee",
      submission: "Assignment 3",
      grade: 75,
      feedback: "Good effort, but needs improvement.",
      created_at: "2024-10-10T10:00:00Z"
    },
  ];

  useEffect(() => {
    // Simulate fetching grades with a delay
    const fetchGrades = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
          setData(hardCodedGrades);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
        setError('Failed to load grades. Please try again later.');
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Grades</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {data.length > 0 ? (
            data.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.title}>{item.submission}</Text>
                <Text style={styles.feedback}>{item.feedback}</Text>
                <Text style={styles.grade}>Grade: {item.grade}</Text>
                <Text style={styles.createdAt}>Submitted on: {new Date(item.created_at).toLocaleDateString()}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noGrades}>No grades found</Text>
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
  scrollView: {
    paddingBottom: 20,
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
  feedback: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    lineHeight: 22,
  },
  grade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Green for grade
  },
  createdAt: {
    fontSize: 14,
    color: '#999',
  },
  error: {
    color: '#ff0000',
    textAlign: 'center',
  },
  noGrades: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#777',
  },
});

export default GradesScreen;
