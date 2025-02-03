import React from "react";  
import { Box, List, ListItem, ListItemText, IconButton } from "@mui/material";  
import { VolumeUp } from "@mui/icons-material";  

interface ModelWord {  
  englishSpelling: string;  
  IPASpelling: string;  
  wordAudioURL: string;  
  wordVideoURL: string;  
}  

interface ModelWordsSectionProps {  
  words: ModelWord[];  
  onPlayWordAudio: (audioURL: string) => void;  
  onPlayWordVideo: (videoURL: string) => void;  
}  

const ModelWordsSection: React.FC<ModelWordsSectionProps> = ({  
  words,  
  onPlayWordAudio,  
  onPlayWordVideo,  
}) => {  
  return (  
    <Box sx={{ display: "flex", padding: 2 }}>  
      <List sx={{ width: "100%"}}>  
          {words.map((word) => (  
            <ListItem  
              key={word.englishSpelling}  
              button  
              onClick={() => onPlayWordVideo(word.wordVideoURL)}  
            >  
              <ListItemText  
                primary={word.englishSpelling}  
                secondary={word.IPASpelling}  
              />  
              <IconButton onClick={() => onPlayWordAudio(word.wordAudioURL)}>  
                <VolumeUp />  
              </IconButton>  
            </ListItem>  
          ))}  
        </List>  
      {/* <Box sx={{ width: "40%", overflowY: "auto", maxHeight: "300px" }}>  
        <List>  
          {words.map((word) => (  
            <ListItem  
              key={word.englishSpelling}  
              button  
              onClick={() => onPlayWordVideo(word.wordVideoURL)}  
            >  
              <ListItemText  
                primary={word.englishSpelling}  
                secondary={word.IPASpelling}  
              />  
              <IconButton onClick={() => onPlayWordAudio(word.wordAudioURL)}>  
                <VolumeUp />  
              </IconButton>  
            </ListItem>  
          ))}  
        </List>  
      </Box>  
      <Box sx={{ flex: 1 }}>  
        <video  
          controls  
          style={{ width: "100%", borderRadius: 8 }}  
        />  
      </Box>   */}
    </Box>  
  );  
};  

export default ModelWordsSection;