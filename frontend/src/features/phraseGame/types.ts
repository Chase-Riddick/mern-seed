// src/features/phraseGame/types.ts  


export interface TranscriptWord {  
  word: string;  
  start: number;  
  end: number;  
}  

export interface Transcript {  
  fullText: string;  
  words: TranscriptWord[];  
}  

export interface AudioVariant {  
  url: string;  
  s3Uri: string;  
  transcript: Transcript;  
}  

export interface AudioBundle {  
  defaultAudioGender: string;  
  female: {  
    standard: AudioVariant;  
    distinct: AudioVariant;  
  };  
  male: {  
    standard: AudioVariant;  
    distinct: AudioVariant;  
  };  
}  

export interface MediaBundle {  
  image: {  
    url: string;  
    s3Uri: string;  
  };  
  audio: AudioBundle;  
}  

export interface Word {  
  type: string;  
  text: string;  
  mediaBundle: MediaBundle;  
}  

export interface Phrase {  
  type: string;  
  text: string;  
  mediaBundle: MediaBundle;  
}  

export interface EpisodeMetadata { 
  _id: string; 
  episodeId: string;  
  title: string;  
  description: string;  
  series: string;  
  releaseDate: string;  
  contentItems: {  
    image?: {  
      url: string;  
      s3Uri: string;  
    };  
    video: {  
      url: string;  
      s3Uri: string;  
    };  
  };  
}  

export interface EpisodeData {  
  _id: string;  
  episodeId: string;  
  title: string;  
  description: string;  
  series: string;  
  releaseDate: string;  
  contentItems: {  
    image?: {  
      url: string;  
      s3Uri: string;  
    };  
    video: {  
      url: string;  
      s3Uri: string;  
    };  
    words: Word[];  
    phrases: Phrase[];  
  };  
  createdAt: string;  
  updatedAt: string;  
}  