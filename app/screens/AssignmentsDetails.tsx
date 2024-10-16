import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

interface AssignmentDetailScreenProps {
  route: {
    params: {
      assignment: {
        title: string;
        description: string;
        due_date: string; // Added due_date to the assignment object
        id: number;
      };
    };
  };
  navigation: any;
}

const AssignmentDetailScreen: React.FC<AssignmentDetailScreenProps> = ({ route }) => {
  const { assignment } = route.params; // Get passed assignment data
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // New states for the additional fields
  const [thumbnail, setThumbnail] = useState('');
  const [hlsName, setHlsName] = useState('');
  const [hlsPath, setHlsPath] = useState('');
  const [status, setStatus] = useState('');
  const [isRunning, setIsRunning] = useState('');

  // File picker for video upload
  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      // Check if the result contains assets
      if (result.assets && result.assets.length > 0) {
        const videoAsset = result.assets[0];
        const mimeType = videoAsset.mimeType;

        if (mimeType && mimeType.startsWith('video/')) {
          setSelectedFile(videoAsset.uri); // Set the uri from the asset
        } else {
          Alert.alert('Invalid file type', 'Please select a valid video file.');
        }
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
      if (permissionResult.status === 'granted') { // Check permission status
        const video = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        if (!video.cancelled) {
          setSelectedFile(video.uri ?? null); // Handle potential undefined
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
      setIsLoading(true); // Start loading
      try {
        const formData = new FormData();
        const assignmentId = assignment.id; // Use the actual assignment ID passed

        // Include required fields in FormData
        formData.append('assignment', assignmentId);
        formData.append('title', assignment.title);
        formData.append('description', assignment.description);
        formData.append('cmp_video', {
          uri: selectedFile,
          name: 'video.mp4',
          type: 'video/mp4',
        });
        
        // Include additional fields
        formData.append('thumbnail', thumbnail);
        formData.append('hls_name', hlsName);
        formData.append('hls_path', hlsPath);
        formData.append('status', status);
        
        // Convert and append isRunning
        const isRunningValue = isRunning.trim().toLowerCase() === 'true';
        formData.append('is_running', isRunningValue);

        // Proceed with the upload
        const uploadResponse = await axios.post('http://196.252.197.151:8000/api/vd/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Upload successful:', uploadResponse.data);
        Alert.alert('Success', 'Video uploaded successfully!');
      } catch (error) {
        // Enhanced error logging
        if (axios.isAxiosError(error)) {
          console.error('Error message:', error.message);
          if (error.response) {
            console.error('Error response data:', error.response.data);
          }
        }
        Alert.alert('Error', 'An error occurred while uploading the video.');
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      console.log('No file selected');
      Alert.alert('No File', 'Please select a video file to submit.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title: {assignment.title}</Text>
      <Text style={styles.dueDate}>Due Date: {assignment.due_date}</Text>

      {/* Description moved to the bottom */}
      <Text style={styles.description}>Description: {assignment.description}</Text>

      {/* Text inputs for additional fields */}
      <TextInput
        style={styles.input}
        placeholder="Thumbnail URL"
        value={thumbnail}
        onChangeText={setThumbnail}
      />
      <TextInput
        style={styles.input}
        placeholder="HLS Name"
        value={hlsName}
        onChangeText={setHlsName}
      />
      <TextInput
        style={styles.input}
        placeholder="HLS Path"
        value={hlsPath}
        onChangeText={setHlsPath}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <TextInput
        style={styles.input}
        placeholder="Is Running (true/false)"
        value={isRunning}
        onChangeText={setIsRunning}
      />

      {/* Instruction box positioned after isRunning input */}
      <View style={styles.instructionBox}>
        <Text style={styles.instruction}>
          Please choose to upload a video from your files or record a video using your camera, then click submit.
        </Text>
      </View>

      {/* File picker and submit buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickVideo}>
          <Text style={styles.buttonText}>Upload a video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={recordVideo}>
          <Text style={styles.buttonText}>Record a video</Text>
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
    justifyContent: 'space-between', // Ensure content is spaced out
  },
  title: {
    fontSize: 20, // Decreased font size for Title
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: 20, // Decreased font size for Due Date
    fontWeight: 'bold', // Bold text
    marginBottom: 8,
  },
  description: {
    
    fontWeight: 'bold',
    fontSize: 20,
  },
  instructionBox: {
    padding: 10,
    backgroundColor: '#ffffff', // White background
    borderWidth: 2,
    borderColor: '#6a5acd', // Purple border
    borderRadius: 8,
    marginVertical: 16,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red', // Red color for instruction
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20, // Spacing before inputs
  },
  button: {
    backgroundColor: '#6a5acd', // Purple color
    padding: 8, // Decreased padding
    borderRadius: 5,
    width: '80%', // Button width
    marginVertical: 8,
  },
  buttonText: {
    color: '#ffffff', // White text
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
