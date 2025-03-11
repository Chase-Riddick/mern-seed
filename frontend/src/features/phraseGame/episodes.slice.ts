// src/features/phraseGame/episodes.slice.ts  
import { createSlice, PayloadAction } from "@reduxjs/toolkit";  
import { EpisodeMetadata, EpisodeData } from "./";  

interface EpisodesState {  
  list: EpisodeMetadata[];  
  selectedEpisode?: EpisodeData;  
}  

const initialState: EpisodesState = {  
  list: [],  
  selectedEpisode: undefined,  
};  

const episodesSlice = createSlice({  
  name: "episodes",  
  initialState,  
  reducers: {  
    setEpisodes(state, action: PayloadAction<EpisodeMetadata[]>) {  
      state.list = action.payload;  
    },  
    setSelectedEpisode(state, action: PayloadAction<EpisodeData | undefined>) {  
      state.selectedEpisode = action.payload;  
    },  
  },  
});  

export const { setEpisodes, setSelectedEpisode } = episodesSlice.actions;  
export default episodesSlice;  