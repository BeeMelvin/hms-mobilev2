import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Announcement {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const AnnouncementsScreen: React.FC = () => {
  const hardCodedAnnouncements: Announcement[] = [
    {
      id: 1,
      title: "Second Semester Exam Schedule",
      description: "The Final exams will take place 17 October to November 1. Please check the nwu website for your specific schedule.",
      created_at: "2024-10-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Guest Lecture",
      description: "Join us for a guest lecture on modern web development on October 20 at 3 PM in Room G!_101.",
      created_at: "2024-10-14T12:00:00Z"
    },
    {
      id: 3,
      title: "No Class TOday",
      description: "Students, please be aware that there won't be class today. Please use this time to work on your Deliverable 3 Projects! ",
      created_at: "2024-10-12T08:30:00Z"
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>
      <ScrollView>
        {hardCodedAnnouncements.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.createdAt}>{new Date(item.created_at).toLocaleDateString()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff', 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif', 
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
    borderLeftColor: '#6200ea',
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
  createdAt: {
    fontSize: 14,
    color: '#999',
  },
});

export default AnnouncementsScreen;