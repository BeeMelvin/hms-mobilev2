// AssignmentDetailScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

interface AssignmentDetailScreenProps {
  route: {
    params: {
      assignment: {
        title: string;
        description: string;
      };
    };
  };
  navigation: any;
}

const AssignmentDetailScreen: React.FC<AssignmentDetailScreenProps> = ({ route }) => {
  const { assignment } = route.params; // Get passed assignment data
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // File picker for video upload
  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      // Check if the result is successful
      if (result && (result as DocumentPicker.DocumentPickerSuccessResult).type === 'success') {
        setSelectedFile((result as DocumentPicker.DocumentPickerSuccessResult).uri);
      } else {
        console.log('Document picker canceled or failed:', result);
      }
    } catch (error) {
      console.error('Error picking video:', error);
      Alert.alert('Error', 'An error occurred while picking the video.');
    }
  };

  // Record video (using expo-image-picker for simplicity)
  const recordVideo = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted) {
        const video = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        if (!video.canceled) {
          setSelectedFile(video.uri);
        }
      } else {
        Alert.alert('Permission required', 'You need to enable camera permissions to record a video.');
      }
    } catch (error) {
      console.error('Error recording video:', error);
      Alert.alert('Error', 'An error occurred while recording the video.');
    }
  };

  // Handle submission
  const handleSubmit = async () => {
    if (selectedFile) {
      console.log('Submitting video:', selectedFile);
      try {
        // Fetch the video file as a blob
        const response = await fetch(selectedFile);
        const blob = await response.blob();

        // Prepare FormData
        const formData = new FormData();
        formData.append('video', blob, 'video.mp4'); // The last argument is the filename

        // Upload the video to the server
        await axios.post('http://196.252.198.87:8000/api/vd/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type
          },
        });

        Alert.alert('Success', 'Video uploaded successfully!');
      } catch (error) {
        console.error('Error uploading video:', error);
        Alert.alert('Error', 'An error occurred while uploading the video.');
      }
    } else {
      console.log('No file selected');
      Alert.alert('No File', 'Please select a video file to submit.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{assignment.title}</Text>
      <Text style={styles.description}>{assignment.description}</Text>

      <Button title="Pick a video" onPress={pickVideo} />
      <Button title="Record a video" onPress={recordVideo} />
      <Button title="Submit Video" onPress={handleSubmit} />

      {selectedFile && <Text style={styles.file}>Selected file: {selectedFile}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 16,
    fontSize: 16,
  },
  file: {
    marginTop: 10,
    fontSize: 14,
    color: 'blue',
  },
});

export default AssignmentDetailScreen;
