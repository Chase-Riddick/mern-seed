import React from "react";  
import { Box, List, ListItem, ListItemText, IconButton } from "@mui/material";  
import { VolumeUp } from "@mui/icons-material";  

interface ModelWord {  
  englishSpelling: string;  
  IPASpelling: string;  
  audioMale: string;  
}  

interface ModelWordsSectionProps {  
  words: ModelWord[];  
  onPlayWordAudio: (audioURL: string) => void;  
}  

const ModelWordsSection: React.FC<ModelWordsSectionProps> = ({  
  words,  
  onPlayWordAudio
}) => {  
  return (  
    <Box sx={{ display: "flex", padding: 2 }}>  
      <List sx={{ width: "100%"}}>  
          {words.map((word) => (  
            <ListItem  
              key={word.englishSpelling}  
              button  
              //onClick={() => onPlayWordVideo(word.wordVideoURL)}  
            >  
              <ListItemText  
                primary={word.englishSpelling}  
                secondary={word.IPASpelling}  
              />  
              <IconButton onClick={() => onPlayWordAudio(word.audioMale)}>  
                <VolumeUp />  
              </IconButton>  
            </ListItem>  
          ))}  
        </List>  
    </Box>  
  );  
};  

export default ModelWordsSection;