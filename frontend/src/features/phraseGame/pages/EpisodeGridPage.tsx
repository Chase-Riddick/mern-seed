import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";  
import { fetchEpisodes } from "../../../services/mockApi";  
import { EpisodeMetadata } from "../types";
import { setEpisodes } from "../episodes.slice";  
import { RootState } from "../../../core/store/store";  
import { Grid, Card, CardMedia, CardContent, Typography, TextField, Box } from "@mui/material";  

const EpisodeGridPage: React.FC = () => { 
  const navigate = useNavigate();  
  const dispatch = useDispatch();  
  const episodes = useSelector((state: RootState) => state.episodes.list);  

  // Local state for the search query  
  const [searchQuery, setSearchQuery] = useState("");  


  const handleCardClick = (episodeId: string) => {  
    navigate(`/game/${episodeId}`);  
  };  

  // Fetch episodes from the mock API and store them in Redux  
  useEffect(() => {  
    const loadEpisodes = async () => {  
      const episodes = await fetchEpisodes(); // Fetch episodes from mock API  
      dispatch(setEpisodes(episodes as EpisodeMetadata[])); // Dispatch episodes to Redux store  
    };  

    loadEpisodes(); // Call the function when the component mounts  
  }, [dispatch]);  

  // Filter episodes based on the search query  
  const filteredEpisodes = episodes.filter((episode) =>  
    episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||  
    episode.description.toLowerCase().includes(searchQuery.toLowerCase())  
  );  

  return (  
    <Box sx={{ padding: 2 }}>  
      {/* Search bar */}  
      <TextField  
        label="Search Episodes"  
        variant="outlined"  
        fullWidth  
        sx={{ marginBottom: 3 }}  
        value={searchQuery} // Bind the input value to the local state  
        onChange={(e) => setSearchQuery(e.target.value)} // Update the search query on input change  
      />  

      {/* Episode grid */}  
      <Grid container spacing={3}>  
        {filteredEpisodes.map((episode) => (  
          <Grid item xs={12} sm={6} md={4} lg={3} key={episode.episodeId}>  
            <Card 
            sx={{ cursor: "pointer", "&:hover": { boxShadow: 6 } }}
            onClick={() => handleCardClick(episode.episodeId)} 
            >  
              {episode.contentItems.image && (
              <CardMedia  
                component="img"  
                height="140"  
                image={episode.contentItems.image.url}  
                alt={episode.title}  
              />  
              )}
              <CardContent>  
              <Typography variant="h6">{episode.title}</Typography>  
              <Typography variant="body2" color="text.secondary">  
                {episode.description}  
              </Typography>  
              </CardContent>  
            </Card>  
          </Grid>  
        ))}  
      </Grid>  
    </Box>  
  );  
};  

export default EpisodeGridPage;  