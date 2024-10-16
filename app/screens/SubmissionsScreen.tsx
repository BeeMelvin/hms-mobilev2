import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Make sure to install expo-linear-gradient

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
    <LinearGradient colors={['#f9f9f9', '#e0e0e0']} style={styles.container}>
      <Text style={styles.header}>Your Submissions</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6200EA" />
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
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    color: '#6200EA',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#ccc',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  scrollView: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  createdAt: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
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
