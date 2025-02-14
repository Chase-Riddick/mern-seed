import React, { useEffect, useRef } from "react";  

interface HorizontalFlipImageProps {  
  imageUrl: string;  
}  

const HorizontalFlipImage: React.FC<HorizontalFlipImageProps> = ({ imageUrl }) => {  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);  

  useEffect(() => {  
    const canvas = canvasRef.current;  
    if (!canvas) return;  

    const ctx = canvas.getContext("2d");  
    if (!ctx) return;  

    const img = new Image();  
    img.src = imageUrl;  

    img.onload = () => {  
      // Set canvas dimensions to match the image  
      canvas.width = img.width;  
      canvas.height = img.height;  

      // Flip the canvas horizontally  
      ctx.translate(canvas.width, 0); // Move the canvas origin to the right edge  
      ctx.scale(-1, 1); // Flip horizontally  

      // Draw the image on the flipped canvas  
      ctx.drawImage(img, 0, 0);  
    };  
  }, [imageUrl]);  

  return <canvas ref={canvasRef}></canvas>;  
};  

export default HorizontalFlipImage;  