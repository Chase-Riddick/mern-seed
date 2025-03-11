import React, { useEffect } from "react";  
import { useParams } from "react-router-dom";  
import { useDispatch, useSelector } from "react-redux";  
import { useNavigate } from "react-router-dom";
import { fetchEpisodeById } from "../../../services/mockApi";  
import { setSelectedEpisode } from "../episodes.slice";  
import { RootState } from "../../../core/store/store";
import { Box } from "@mui/material";  
import GameContainer from "../components/GameContainer";

const getRandomSlice = (arr: any[]) => {  
  const shuffled = [...arr];  
  for (let i = shuffled.length - 1; i > 0; i--) {  
    const j = Math.floor(Math.random() * (i + 1));  
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];  
  }  
  return shuffled.slice(0, 5);  
}  

const GameModePage: React.FC = () => {  
  const { episodeId } = useParams();  
  const dispatch = useDispatch();  
  const navigate = useNavigate();  
  const selectedEpisode = useSelector((state: RootState) => state.episodes.selectedEpisode);  

  const videoUrl = selectedEpisode?.contentItems.video.url;
  // Define game modes  
  const gameModes = {  
    default: (episode: any) => <GameContainer onGameComplete={()=>{navigate(`/phrasegame`)}} videoUrl={videoUrl} phrases={getRandomSlice(episode.contentItems.phrases)} />,  
    videoOnly: (episode: any) => (  
      <div>  
        <h1>Video Mode</h1>  
        <video controls src={episode.contentItems.video.url}>  
          Your browser does not support the video tag.  
        </video>  
      </div>  
    ),  
  };  

  // Render the appropriate game mode dynamically  
  const renderGameMode = () => {  
    if (!selectedEpisode) return null;  

    // Example: dynamically choose a mode based on conditions  
    if (selectedEpisode.contentItems.phrases.length === 0) {  
      return gameModes.videoOnly(selectedEpisode);  
    }  
    return gameModes.default(selectedEpisode);  
  };  

  useEffect(() => {  
    const loadEpisode = async () => {  
      if (episodeId) {  
        const episode = await fetchEpisodeById(episodeId);  
        dispatch(setSelectedEpisode(episode));  
      }  
    };  

    loadEpisode();  
  }, [dispatch, episodeId]);  

  if (!selectedEpisode) {  
    return <div>Loading...</div>;  
  }  

  return <Box sx={{width: "100%", height: "100%"}}>{renderGameMode()}</Box>;  
};  

export default GameModePage;  