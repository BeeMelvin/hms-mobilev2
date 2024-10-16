declare module 'expo-document-picker' {
    export interface DocumentPickerResult {
      canceled: any;
      assets: boolean;
      type: string; 
      uri: string; 
      name: string; 
      size: number; 
      mimeType?: string; 
    }
  
    export function getDocumentAsync(options?: {
      type?: string; 
      copyToCacheDirectory?: boolean; 
    }): Promise<DocumentPickerResult>;
  }
  
declare module 'expo-image-picker' {
    export interface ImagePickerResult {
      cancelled: boolean; // Indicates if the operation was canceled
      uri?: string; 
      width?: number; 
      height?: number; 
      base64?: string; 
      type?: string; 
    }
  
    export interface ImagePickerOptions {
      mediaTypes?: MediaTypeOptions; 
      allowsEditing?: boolean; 
      aspect?: [number, number]; 
      quality?: number; 
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
    
  }

  interface ProcessingOptions {
    
  }

  export const Video: {
    create: (options: VideoOptions) => Promise<any>;
    
  };

  export const ProcessingManager: {
    compress: (uri: string, options: ProcessingOptions) => Promise<any>;
    
  };
}