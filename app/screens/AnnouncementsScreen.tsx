import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Announcement {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const AnnouncementsScreen: React.FC = () => {
  // Hard-coded announcements for now
  const hardCodedAnnouncements: Announcement[] = [
    {
      id: 1,
      title: "Midterm Exam Schedule",
      description: "The midterm exams will take place from November 1 to November 5. Please check the website for your specific schedule.",
      created_at: "2024-10-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Guest Lecture",
      description: "Join us for a guest lecture on modern web development on October 20 at 3 PM in Room 101.",
      created_at: "2024-10-14T12:00:00Z"
    },
    {
      id: 3,
      title: "Campus Cleanup Day",
      description: "Help keep our campus clean! Join us for a cleanup day on November 10 at 9 AM. Sign up on the student portal.",
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
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    color: '#6200EA',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  createdAt: {
    fontSize: 13,
    color: '#999',
  },
});

export default AnnouncementsScreen;
