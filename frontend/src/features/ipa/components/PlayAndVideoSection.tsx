import React from "react";  
import { Box, IconButton } from "@mui/material";  
import { PlayCircle } from "@mui/icons-material";  

interface PlayAndVideoSectionProps {  
  videoURL: string;  
  onPlay: () => void;  
}  

const PlayAndVideoSection: React.FC<PlayAndVideoSectionProps> = ({  
  videoURL,  
  onPlay,  
}) => {  
  return (  
    <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>  
      <Box sx={{ width: "80px", textAlign: "center" }}>  
        <IconButton onClick={onPlay} sx={{ fontSize: 48 }}>  
          <PlayCircle fontSize="inherit" />  
        </IconButton>  
      </Box>  
      <Box sx={{ flex: 1 }}>  
        <video  
          src={"/videos/g.mp4"}  
          controls  
          style={{ width: "100%", borderRadius: 8 }}  
        />  
      </Box>  
    </Box>  
  );  
};  

export default PlayAndVideoSection;