import React, { useState } from "react";  
    import { Box, Button, ButtonGroup } from "@mui/material";  
    import HorizontalFlipImage from "./HorizontalFlipImage";  

    interface PlayAndVideoSectionProps {  
      diagramURL: string;  
      videoURL: string;  
      onPlay: () => void;  
    }  

    const PlayAndVideoSection: React.FC<PlayAndVideoSectionProps> = ({  
      diagramURL,  
      videoURL,  
      onPlay,  
    }) => {  
      const [selected, setSelected] = useState<"image" | "video">("image");  

      const handleSelection = (choice: "image" | "video") => {  
        setSelected(choice);  
      };  

      return (  
        <Box sx={{ padding: 2 }}>  
          {/* Button Group to toggle between Image and Video */}  
          <ButtonGroup variant="outlined" color="primary" fullWidth>  
            <Button  
              onClick={() => handleSelection("image")}  
              variant={selected === "image" ? "contained" : "outlined"}  
            >  
              Show Image  
            </Button>  
            <Button  
              onClick={() => handleSelection("video")}  
              variant={selected === "video" ? "contained" : "outlined"}  
            >  
              Show Video  
            </Button>  
          </ButtonGroup>  

          {/* Conditional rendering based on selection */}  
          <Box sx={{ marginTop: 2 }}>  
            {selected === "image" && (  
              <HorizontalFlipImage imageUrl={diagramURL} />  
            )}  
            {selected === "video" && (  
              <video  
                src={videoURL}  
                controls  
                style={{ width: "100%", borderRadius: 8 }}  
              />  
            )}  
          </Box>  
        </Box>  
      );  
    };  

    export default PlayAndVideoSection;  