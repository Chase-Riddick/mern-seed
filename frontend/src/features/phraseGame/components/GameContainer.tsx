import React, { useState, useEffect, useRef } from "react";
import FloatingPhraseGame from "./FloatingPhraseGame";
import PhraseDisplay from "./PhraseDisplay";
import { Phrase } from "../types";
import "./GameContainer.css";


interface GameContainerProps {
  phrases: Phrase[];
  onGameComplete: () => void;
  videoUrl?: string; // Optional video to show when game completes
}

const GameContainer: React.FC<GameContainerProps> = ({ 
  phrases, 
  onGameComplete,
  videoUrl 
}) => {
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const [completedPhraseIds, setCompletedPhraseIds] = useState<string[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle bubble click
  const handleBubbleClick = (phrase: Phrase) => {
    // Ignore clicks if audio is already playing
    if (isAudioPlaying) return;
    
    // Set the selected phrase and mark it as playing
    setSelectedPhrase(phrase);
    setIsAudioPlaying(true);
  };

  // Handle audio playback completion
  const handleAudioComplete = () => {
    if (selectedPhrase) {
      // Add to completed phrases
      const phraseId = selectedPhrase.mediaBundle.audio.male.distinct.url; // Use URL as unique ID
      setCompletedPhraseIds(prev => [...prev, phraseId]);
      
      // IMPORTANT: Clear the selected phrase after completion
      // This prevents PhraseDisplay from re-triggering with the same phrase
      setSelectedPhrase(null);
    }
    
    setIsAudioPlaying(false);
  };

  // Check for game completion
  useEffect(() => {
    if (completedPhraseIds.length >= phrases.length && !gameCompleted && phrases.length > 0) {
      setGameCompleted(true);
    }
  }, [completedPhraseIds, phrases.length, gameCompleted]);

  // Handle game completion
  useEffect(() => {
    if (gameCompleted) {
      if (videoUrl && videoRef.current) {
        // Play video
        videoRef.current.style.display = "block";
        videoRef.current.play().catch(err => 
          console.error("Error playing completion video:", err)
        );
        
        // Call onGameComplete when video ends
        videoRef.current.onended = onGameComplete;
      } else {
        // No video, just complete the game
        onGameComplete();
      }
    }
  }, [gameCompleted, videoUrl, onGameComplete]);

  return (
    <div className="game-container">
      {!gameCompleted ? (
        <>
          <FloatingPhraseGame 
            phrases={phrases}
            onBubbleClick={handleBubbleClick}
            completedPhraseIds={completedPhraseIds}
            isInteractionDisabled={isAudioPlaying}
          />
          {selectedPhrase && (
            <PhraseDisplay 
              phrase={selectedPhrase} 
              onPlaybackComplete={handleAudioComplete} 
            />
          )}
        </>
      ) : videoUrl ? (
        <video 
          ref={videoRef}
          src={videoUrl}
          style={{ display: "none", width: "100%", height: "auto" }}
          controls={false}
        />
      ) : null}
    </div>
  );
};

export default GameContainer;