export {}

// import { Phrase } from "../types";  

// export class Bubble {  
//   x: number;  
//   y: number;  
//   radius: number; // Radius of the bubble container  
//   velocityX: number;  
//   velocityY: number;  
//   imageSize: number; // Diameter of the image  
//   image: HTMLImageElement;  
//   phrase: Phrase; // Associated phrase  

//   constructor(phrase: Phrase, canvasWidth: number, canvasHeight: number) {  
//     this.phrase = phrase;  

//     // Set the bubble's size dynamically based on the viewport size  
//     const baseSize = Math.min(canvasWidth, canvasHeight) * 0.4; // 10% of the smaller dimension  
//     this.radius = baseSize / 2; // Radius of the container  
//     this.imageSize = baseSize * 0.85; // Image size is slightly smaller than the container  

//     // Set initial position and velocity  
//     this.x = Math.random() * (canvasWidth - this.radius * 2) + this.radius;  
//     this.y = Math.random() * (canvasHeight - this.radius * 2) + this.radius;  
//     this.velocityX = (Math.random() - 0.5) * 3; // Random velocity  
//     this.velocityY = (Math.random() - 0.5) * 3;  

//     // Load the image  
//     this.image = new Image();  
//     this.image.src = phrase.mediaBundle.image.url;  
//   }  

//   draw(ctx: CanvasRenderingContext2D) {  
//     // Draw the container circle  
//     ctx.save();  
//     ctx.beginPath();  
//     ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);  
//     ctx.fillStyle = "#fff"; // Background color for the container  
//     ctx.fill();  

//     // Draw the image inside the container  
//     ctx.beginPath();  
//     ctx.arc(this.x, this.y, this.imageSize / 2, 0, 2 * Math.PI);  
//     ctx.clip(); // Clip the image to fit inside the smaller circle  
//     ctx.drawImage(  
//       this.image,  
//       this.x - this.imageSize / 2,  
//       this.y - this.imageSize / 2,  
//       this.imageSize,  
//       this.imageSize  
//     );  
//     ctx.restore();  
//   }  

//   update(canvasWidth: number, canvasHeight: number) {  
//     // Move the bubble  
//     this.x += this.velocityX;  
//     this.y += this.velocityY;  

//     // Bounce off edges  
//     if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) {  
//       this.velocityX *= -1;  
//     }  
//     if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {  
//       this.velocityY *= -1;  
//     }  
//   }  

//   isClicked(x: number, y: number): boolean {  
//     // Check if the click is within the bubble's radius  
//     return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2) <= this.radius;  
//   }  
// }  

// export const animateBubbles = (  
//   ctx: CanvasRenderingContext2D,  
//   canvas: HTMLCanvasElement,  
//   bubbles: Bubble[]  
// ) => {  
//   const render = () => {  
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas  
//     bubbles.forEach((bubble) => {  
//       bubble.update(canvas.width, canvas.height);  
//       bubble.draw(ctx);  
//     });  
//     requestAnimationFrame(render); // Continue the animation loop  
//   };  

//   render();  
// };  