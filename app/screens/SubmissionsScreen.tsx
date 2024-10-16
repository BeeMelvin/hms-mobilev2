import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Ensure expo-linear-gradient is installed

const SubmissionsScreen = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded submission data for a single user
  const hardCodedSubmissions = [
    {
      id: 1,
      assignment: { title: "Assignment 1" },
      created_at: "2024-10-01T10:00:00Z"
    },
    {
      id: 2,
      assignment: { title: "Assignment 2" },
      created_at: "2024-10-05T10:00:00Z"
    },
    {
      id: 3,
      assignment: { title: "Assignment 3" },
      created_at: "2024-10-10T10:00:00Z"
    },
  ];

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setSubmissions(hardCodedSubmissions);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load submissions. Please try again later.');
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <LinearGradient colors={['#f0f8ff', '#f0f8ff']} style={styles.container}>
      <Text style={styles.header}>Your Submissions</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {submissions.length > 0 ? (
            submissions.map((submission) => (
              <View key={submission.id} style={styles.card}>
                <Text style={styles.title}>{submission.assignment.title}</Text>
                <Text style={styles.createdAt}>Submitted on: {new Date(submission.created_at).toLocaleDateString()}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noSubmissions}>No submissions found.</Text>
          )}
        </ScrollView>
      )}
    </LinearGradient>
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
  createdAt: {
    fontSize: 14,
    color: '#999',
  },
  error: {
    color: '#ff0000',
    textAlign: 'center',
  },
  noSubmissions: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#777',
  },
});

export default SubmissionsScreen;
