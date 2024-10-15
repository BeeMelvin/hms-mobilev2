declare module 'expo-document-picker' {
    export interface DocumentPickerResult {
      type: string; // Type of the document
      uri: string; // URI of the selected document
      name: string; // Name of the document
      size: number; // Size of the document in bytes
      mimeType?: string; // Optional MIME type of the document
    }
  
    export function getDocumentAsync(options?: {
      type?: string; // Filter by type, e.g., 'application/pdf'
      copyToCacheDirectory?: boolean; // Whether to copy to cache
    }): Promise<DocumentPickerResult>;
  }
  
declare module 'expo-image-picker' {
    export interface ImagePickerResult {
      cancelled: boolean; // Indicates if the operation was canceled
      uri?: string; // URI of the selected image/video
      width?: number; // Width of the selected image
      height?: number; // Height of the selected image
      base64?: string; // Optional base64 representation of the image
      type?: string; // Optional type of the selected media
    }
  
    export interface ImagePickerOptions {
      mediaTypes?: MediaTypeOptions; // Types of media to pick
      allowsEditing?: boolean; // Allow editing of the selected image
      aspect?: [number, number]; // Aspect ratio for cropping
      quality?: number; // Quality of the selected image
    }
  
    export enum MediaTypeOptions {
      All = 'All',
      Images = 'Images',
      Videos = 'Videos',
    }
  
    export function requestCameraPermissionsAsync(): Promise<{ status: 'granted' | 'denied' }>;
  
    export function launchImageLibraryAsync(options?: ImagePickerOptions): Promise<ImagePickerResult>;
  
    export function launchCameraAsync(options?: ImagePickerOptions): Promise<ImagePickerResult>;
  }

declare module 'react-native-video-processing' {
  interface VideoOptions {
    uri: string; // The URI of the video file
    // Add more options as needed
  }

  interface ProcessingOptions {
    // Define options for video processing here
  }

  export const Video: {
    create: (options: VideoOptions) => Promise<any>;
    // Add other methods as needed
  };

  export const ProcessingManager: {
    compress: (uri: string, options: ProcessingOptions) => Promise<any>;
    // Add other methods as needed
  };
}