import React, { useState, useEffect } from "react";  
import { Box } from "@mui/material";  
import SearchBar from "./SearchBar";  
import LetterTabs from "./LetterTabs";  
import SelectedLetterHeader from "./SelectedLetterHeader";  
import IPATabs from "./IPATabs";  
import PlayAndVideoSection from "./PlayAndVideoSection";  
import ModelWordsSection from "./ModelWordSection";  
import letterData from "../data/letterData.json";  

const data = JSON.parse(JSON.stringify(letterData));  

const LetterReference: React.FC = () => {  
  // State management  
  const [selectedLetter, setSelectedLetter] = useState<string>("");  
  const [selectedIPA, setSelectedIPA] = useState<string>("");  
  const [ipaSounds, setIPASounds] = useState<string[]>([]);  
  const [currentIPAData, setCurrentIPAData] = useState<{ [key: string]: any }>({});  
  const [currentLetterData, setCurrentLetterData] = useState<{ [key: string]: any }>({});  
  const [lettersData] = useState<{ [key: string]: any }>(data);  

  // Handlers  
  const handleSearch = (query: string) => {  
    setSelectedLetter(query);  
  };  

  const handleSelectLetter = (letter: string) => {  
    setSelectedLetter(letter);  
    setSelectedIPA("");  
  };  

  const handleSelectIPA = (ipa: string) => {  
    setSelectedIPA(ipa);  
  };  

  // Effects  
  useEffect(() => {  
    const currentLetterDataTemp = lettersData.letters.find(  
      (letter: any) => letter.englishLetter === selectedLetter  
    );  

    if (currentLetterDataTemp) {  
      setCurrentLetterData(currentLetterDataTemp);  
      const ipaSoundsTemp = currentLetterDataTemp.sounds.map((sound: any) => sound.IPA);  
      setIPASounds(ipaSoundsTemp);  
    } else {  
      setCurrentLetterData({});  
      setIPASounds([]);  
    }  
  }, [selectedLetter, lettersData]);  

  useEffect(() => {  
    if (currentLetterData && selectedIPA) {  
      const currentIPADataTemp = currentLetterData.sounds.find(  
        (sound: any) => sound.IPA === selectedIPA  
      );  
      setCurrentIPAData(currentIPADataTemp || {});  
    }  
  }, [selectedIPA, currentLetterData]);  

  return (  
    <>  
      <SearchBar onSearch={handleSearch} />  
      <LetterTabs selectedLetter={selectedLetter} onSelectLetter={handleSelectLetter} />  
      <SelectedLetterHeader letter={selectedLetter} />  
      <IPATabs ipaSounds={ipaSounds} selectedIPA={selectedIPA} onSelectIPA={handleSelectIPA} />  
      {Object.keys(currentIPAData).length > 0 ? (  
        <>  
          <ModelWordsSection  
            words={currentIPAData.modelWords || []}  
            onPlayWordAudio={(audioURL) => console.log(`Play audio: ${audioURL}`)}  
            onPlayWordVideo={(videoURL) => console.log(`Play video: ${videoURL}`)}  
          />  
          <PlayAndVideoSection  
            videoURL={currentIPAData.audioURL || ""}  
            onPlay={() => console.log("Play IPA audio")}  
          />  
        </>  
      ) : (  
        <div style={{ padding: "16px", textAlign: "center" }}>  
          No IPA sounds available for this letter.  
        </div>  
      )}  
    </>  
  );  
};  

export default LetterReference;