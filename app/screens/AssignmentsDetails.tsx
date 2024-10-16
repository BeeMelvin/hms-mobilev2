import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AssignmentDetailScreenProps {
  route: {
    params: {
      assignment: {
        title: string;
        description: string;
        due_date: string;
        id: number;
      };
    };
  };
  navigation: any;
}

const AssignmentDetailScreen: React.FC<AssignmentDetailScreenProps> = ({ route }) => {
  const { assignment } = route.params;
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const videoAsset = result.assets[0];
        const mimeType = videoAsset.mimeType;

        if (mimeType && mimeType.startsWith('video/')) {
          setSelectedFile(videoAsset.uri);
        } else {
          Alert.alert('Invalid file type', 'Please select a valid video file.');
        }
      }
    } catch (error) {
      console.error('Error picking video:', error);
      Alert.alert('Error', 'An error occurred while picking the video.');
    }
  };

  const recordVideo = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.status === 'granted') {
        const video = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        if (!video.cancelled) {
          setSelectedFile(video.uri ?? null);
        }
      } else {
        Alert.alert('Permission required', 'You need to enable camera permissions to record a video.');
      }
    } catch (error) {
      console.error('Error recording video:', error);
      Alert.alert('Error', 'An error occurred while recording the video.');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      Alert.alert('No File', 'Please select a video file to submit.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      const assignmentId = assignment.id;

      formData.append('assignment', assignmentId.toString());
      formData.append('title', assignment.title);
      formData.append('description', assignment.description);
      formData.append('cmp_video', {
        uri: selectedFile,
        name: 'video.mp4',
        type: 'video/mp4',
      });
      

      const token = await AsyncStorage.getItem('token');
      const csrfToken = await AsyncStorage.getItem('csrf_token');

      const uploadResponse = await axios.post('http://192.168.120.11:8000/api/vd/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          'X-CSRFToken': csrfToken,
        },
      });

      console.log('Upload successful:', uploadResponse.data);
      Alert.alert('Success', 'Video uploaded successfully!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error message:', error.message);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          Alert.alert('Error', error.response.data.detail || 'An error occurred while uploading the video.');
        } else {
          Alert.alert('Error', 'An error occurred while uploading the video.');
        }
      } else {
        console.error('General Error:', error);
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title: {assignment.title}</Text>
      <Text style={styles.dueDate}>Due Date: {assignment.due_date}</Text>
      <Text style={styles.description}>Description: {assignment.description}</Text>

  

      <View style={styles.instructionBox}>
        <Text style={styles.instruction}>
          Please choose to upload a video from your files or record a video using your camera, then click submit.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickVideo}>
          <Text style={styles.buttonText}>Upload a Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={recordVideo}>
          <Text style={styles.buttonText}>Record a Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { opacity: selectedFile ? 1 : 0.5 }]}
          onPress={handleSubmit}
          disabled={!selectedFile || isLoading}
        >
          <Text style={styles.buttonText}>Submit Video</Text>
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {selectedFile && <Text style={styles.file}>Selected file: {selectedFile}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  dueDate: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginVertical: 18,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  instructionBox: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#6a5acd',
    borderRadius: 8,
    marginVertical: 6,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6a5acd',
    padding: 8,
    borderRadius: 5,
    width: '80%',
    marginVertical: 8,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  file: {
    marginTop: 10,
    fontSize: 14,
    color: 'blue',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default AssignmentDetailScreen;
