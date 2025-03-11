import React, { useEffect, useRef, useState } from "react";
import { Phrase } from "../types";
import "./PhraseDisplay.css";

interface PhraseDisplayProps {
  phrase: Phrase | null;
  onPlaybackComplete: () => void;
}

const PhraseDisplay: React.FC<PhraseDisplayProps> = ({
  phrase,
  onPlaybackComplete
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const [activeAudio, setActiveAudio] = useState<"distinct" | "standard" | null>(null);
  
  // Use refs to maintain state across renders
  const distinctAudioRef = useRef<HTMLAudioElement | null>(null);
  const standardAudioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const phraseIdRef = useRef<string | null>(null); // To track current phrase
  const completedRef = useRef<boolean>(false); // To prevent duplicate completion callbacks

  useEffect(() => {
    // Reset completion state whenever phrase changes
    completedRef.current = false;
    
    // Store the current phrase ID to prevent stale closures
    const currentPhraseId = phrase?.mediaBundle?.audio?.male?.distinct?.url || null;
    phraseIdRef.current = currentPhraseId;
    
    // Clear and dispose all resources from previous phrase
    const cleanup = () => {
      // Clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Stop and clean up distinct audio
      if (distinctAudioRef.current) {
        distinctAudioRef.current.pause();
        distinctAudioRef.current.src = '';
        distinctAudioRef.current.load(); // Force release of resources
        distinctAudioRef.current = null;
      }
      
      // Stop and clean up standard audio
      if (standardAudioRef.current) {
        standardAudioRef.current.pause();
        standardAudioRef.current.src = '';
        standardAudioRef.current.load(); // Force release of resources
        standardAudioRef.current = null;
      }
      
      // Reset state
      setActiveAudio(null);
      setCurrentWordIndex(null);
    };
    
    // Always clean up first
    cleanup();
    
    // If no phrase is provided, just clean up and exit
    if (!phrase || !currentPhraseId) return;
    
    // Create new audio elements
    const distinctAudio = new Audio();
    const standardAudio = new Audio();
    
    // Store in refs
    distinctAudioRef.current = distinctAudio;
    standardAudioRef.current = standardAudio;
    
    // Set sources
    distinctAudio.src = phrase.mediaBundle.audio.male.distinct.url;
    standardAudio.src = phrase.mediaBundle.audio.male.standard.url;
    
    // Preload audio
    distinctAudio.load();
    standardAudio.load();
    
    // Function to start word highlighting for the active audio
    const startWordHighlighting = (audioType: "distinct" | "standard") => {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Update active audio state
      setActiveAudio(audioType);
      
      // Get appropriate audio element and transcript
      const audioElement = audioType === "distinct" ? distinctAudio : standardAudio;
      const words = phrase.mediaBundle.audio.male[audioType].transcript.words;
      
      // Set up interval for word highlighting
      intervalRef.current = window.setInterval(() => {
        // Make sure we still have the same phrase
        if (phraseIdRef.current !== currentPhraseId) {
          clearInterval(intervalRef.current!);
          return;
        }
        
        const currentTime = audioElement.currentTime;
        const wordIndex = words.findIndex(
          word => currentTime >= word.start && currentTime <= word.end
        );
        
        setCurrentWordIndex(wordIndex >= 0 ? wordIndex : null);
      }, 50);
    };
    
    // Event handler for when standard audio ends
    const handleStandardAudioEnded = () => {
      // Make sure we're still on the same phrase
      if (phraseIdRef.current !== currentPhraseId || completedRef.current) return;
      
      // Reset word highlighting
      setCurrentWordIndex(null);
      
      // Start distinct audio and its word highlighting
      startWordHighlighting("distinct");
      distinctAudio.play().catch(err => {
        console.error("Error playing distinct audio:", err);
        handlePlaybackComplete();
      });
    };
    
    // Event handler for when distinct audio ends
    const handleDistinctAudioEnded = () => {
      // Make sure we're still on the same phrase
      if (phraseIdRef.current !== currentPhraseId || completedRef.current) return;
      
      // Reset state
      setCurrentWordIndex(null);
      setActiveAudio(null);
      
      // Signal completion
      handlePlaybackComplete();
    };
    
    // Helper to ensure we only complete once
    const handlePlaybackComplete = () => {
      if (!completedRef.current && phraseIdRef.current === currentPhraseId) {
        completedRef.current = true;
        onPlaybackComplete();
      }
    };
    
    // Attach event listeners
    standardAudio.addEventListener('ended', handleStandardAudioEnded);
    distinctAudio.addEventListener('ended', handleDistinctAudioEnded);
    
    // Start playback with standard audio first (reversed from before)
    startWordHighlighting("standard");
    standardAudio.play().catch(err => {
      console.error("Error playing standard audio:", err);
      handlePlaybackComplete();
    });
    
    // Return cleanup function
    return () => {
      // Remove event listeners before cleanup
      distinctAudio.removeEventListener('ended', handleDistinctAudioEnded);
      standardAudio.removeEventListener('ended', handleStandardAudioEnded);
      cleanup();
    };
  }, [phrase, onPlaybackComplete]);

  if (!phrase) {
    return (
      <div className="phrase-display empty">
        <p>Click a bubble to hear a phrase</p>
      </div>
    );
  }

  // Get transcript words based on active audio type
  const transcriptWords = activeAudio && phrase.mediaBundle.audio.male[activeAudio]
    ? phrase.mediaBundle.audio.male[activeAudio].transcript.words
    : phrase.mediaBundle.audio.male.standard.transcript.words; // Default to standard instead of distinct

  return (
    <div className="phrase-display">
      <div className="phrase-text">
        {transcriptWords.map((word, index) => (
          <span
            key={index}
            className={index === currentWordIndex ? "highlighted-word" : ""}
          >
            {word.word}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PhraseDisplay;