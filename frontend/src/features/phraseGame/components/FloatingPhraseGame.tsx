import React, { useEffect, useRef, useState } from "react";
import { Phrase } from "../types";
import "./FloatingPhraseGame.css";
import cursorImage from "../../../assets/images/big-cursor.png"

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  phrase: Phrase;
  image: HTMLImageElement;
  isClicked: (x: number, y: number) => boolean;
  isImageLoaded: boolean;
}

class BubbleClass implements Bubble {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  phrase: Phrase;
  image: HTMLImageElement;
  isImageLoaded: boolean;

  constructor(phrase: Phrase, canvasWidth: number, canvasHeight: number, existingBubbles: Bubble[]) {
    this.phrase = phrase;
    this.radius = 150; // Fixed larger size for all bubbles
    this.isImageLoaded = false;
    
    // Use consistent but varied speeds for smoother movement
    this.speedX = (Math.random() > 0.5 ? 0.3 : -0.3) + (Math.random() * 0.4 - 0.2);
    this.speedY = (Math.random() > 0.5 ? 0.3 : -0.3) + (Math.random() * 0.4 - 0.2);
    
    // Find a position that doesn't overlap with existing bubbles
    let attempts = 0;
    do {
      this.x = Math.random() * (canvasWidth - this.radius * 2) + this.radius;
      this.y = Math.random() * (canvasHeight - this.radius * 2) + this.radius;
      attempts++;
    } while (
      this.hasSignificantOverlap(existingBubbles) && 
      attempts < 50
    );
    
    // Load the image
    this.image = new Image();
    this.image.onload = () => {
      this.isImageLoaded = true;
    };
    this.image.onerror = () => {
      console.error("Error loading image for phrase:", phrase);
    };
    
    // Set image source if available
    if (phrase.mediaBundle?.image?.url) {
      this.image.src = phrase.mediaBundle.image.url;
    }
  }

  hasSignificantOverlap(bubbles: Bubble[]): boolean {
    for (const bubble of bubbles) {
      const distance = Math.sqrt(
        Math.pow(this.x - bubble.x, 2) + Math.pow(this.y - bubble.y, 2)
      );
      // Require more space between bubbles initially
      if (distance < this.radius + bubble.radius) {
        return true;
      }
    }
    return false;
  }

  isClicked(x: number, y: number): boolean {
    const distance = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
    return distance <= this.radius;
  }
}

interface FloatingPhraseGameProps {
  phrases: Phrase[];
  onBubbleClick: (phrase: Phrase) => void;
  completedPhraseIds: string[];
  isInteractionDisabled: boolean;
}

const FloatingPhraseGame: React.FC<FloatingPhraseGameProps> = ({
  phrases,
  onBubbleClick,
  completedPhraseIds,
  isInteractionDisabled
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number | null>(null);
  
  // Combined effect for initialization and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Size canvas to fit viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial sizing
    resizeCanvas();
    
    // Listen for resize events
    window.addEventListener("resize", resizeCanvas);
    
    // Initialize bubbles if not already done
    if (bubblesRef.current.length === 0) {
      // Create bubbles for each phrase
      phrases.forEach(phrase => {
        // Ensure canvas has proper dimensions
        if (canvas.width > 0 && canvas.height > 0) {
          const newBubble = new BubbleClass(
            phrase, 
            canvas.width, 
            canvas.height,
            bubblesRef.current
          );
          bubblesRef.current.push(newBubble);
        }
      });
    }

    // Draw circular image
    const drawCircularImage = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, radius: number) => {
      // Create circular clipping path
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius - 2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      
      // Draw the image
      const size = radius * 2;
      ctx.drawImage(image, x - radius, y - radius, size, size);
      
      // Restore context
      ctx.restore();
      
      // Draw border circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    // Animation function
    const animateBubbles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Filter out completed bubbles
      const activeBubbles = bubblesRef.current.filter(bubble => {
        const phraseId = bubble.phrase.mediaBundle.audio.male.distinct.url;
        return !completedPhraseIds.includes(phraseId);
      });

      // Update bubble positions
      activeBubbles.forEach(bubble => {
        // Move bubble
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;
        
        // Handle wall collisions with good margin
        const margin = 10;
        
        // Right wall
        if (bubble.x + bubble.radius > canvas.width - margin) {
          bubble.x = canvas.width - bubble.radius - margin;
          bubble.speedX = -Math.abs(bubble.speedX);
        } 
        // Left wall
        else if (bubble.x - bubble.radius < margin) {
          bubble.x = bubble.radius + margin;
          bubble.speedX = Math.abs(bubble.speedX);
        }
        
        // Bottom wall
        if (bubble.y + bubble.radius > canvas.height - margin) {
          bubble.y = canvas.height - bubble.radius - margin;
          bubble.speedY = -Math.abs(bubble.speedY);
        } 
        // Top wall
        else if (bubble.y - bubble.radius < margin) {
          bubble.y = bubble.radius + margin;
          bubble.speedY = Math.abs(bubble.speedY);
        }
      });
      
      // Draw bubbles
      activeBubbles.forEach(bubble => {
        // Draw bubble background if image not loaded yet
        if (!bubble.isImageLoaded) {
          ctx.beginPath();
          ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(75, 119, 190, 0.7)";
          ctx.fill();
        } else {
          // Draw circular image if loaded
          drawCircularImage(ctx, bubble.image, bubble.x, bubble.y, bubble.radius);
        }
      });
      
      animationRef.current = requestAnimationFrame(animateBubbles);
    };

    // Start animation
    animateBubbles();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [phrases, completedPhraseIds]);

  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    // Ignore clicks if interaction is disabled
    if (isInteractionDisabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is inside any bubble that hasn't been completed
    for (const bubble of bubblesRef.current) {
      const phraseId = bubble.phrase.mediaBundle.audio.male.distinct.url;
      if (!completedPhraseIds.includes(phraseId) && bubble.isClicked(x, y)) {
        onBubbleClick(bubble.phrase);
        break;
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="floating-phrase-canvas"
      onClick={handleCanvasClick}
      style={{ 
        cursor: isInteractionDisabled 
          ? "not-allowed" 
          : `url(${cursorImage}) 25 25, pointer`
      }}
    />
  );
};

export default FloatingPhraseGame;