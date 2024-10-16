import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

interface AssignmentDetailScreenProps {
  route: {
    params: {
      assignment: {
        title: string;
        description: string;
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
        const uploadResponse = await axios.post('http://196.252.198.215:8000e/api/vd/upload', formData, {
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
      <Text style={styles.title}>{assignment.title}</Text>
      <Text style={styles.description}>{assignment.description}</Text>

      <Button title="Pick a video" onPress={pickVideo} />
      <Button title="Record a video" onPress={recordVideo} />
      <Button title="Submit Video" onPress={handleSubmit} disabled={!selectedFile || isLoading} />
      
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {selectedFile && <Text style={styles.file}>Selected file: {selectedFile}</Text>}

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
