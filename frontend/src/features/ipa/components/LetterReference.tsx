import React, { useState, useEffect } from "react";  
import { Box } from "@mui/material";  
import SearchBar from "./SearchBar";  
import LetterTabs from "./LetterTabs";  
import SelectedLetterHeader from "./SelectedLetterHeader";  
import IPATabs from "./IPATabs";  
import PlayAndVideoSection from "./PlayAndVideoSection";  
import ModelWordsSection from "./ModelWordSection";  
import letterData from "../data/letterData.json"; 
import letterDataAlt from "../data/soundData.json";

const dataTemp = JSON.parse(JSON.stringify(letterDataAlt));
const lettersToIPATemp = dataTemp.lettersToIPA;
const IPASoundsData = dataTemp.IPASounds;

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
    console.log("Does this hit?");

    let associatedIPA;
    let associatedIPAdata: { [key: string]: any } = {};

    if (selectedLetter in lettersToIPATemp) {
      associatedIPA = lettersToIPATemp[selectedLetter];
      setIPASounds(associatedIPA);

      associatedIPA.forEach((ipa: string) => {
        if (ipa in IPASoundsData) {
          associatedIPAdata[ipa] = IPASoundsData[ipa];
        } else {
          console.error("selectedIPA value not found in IPASoundsData. This should not happen.");
        }
      });

      if (associatedIPAdata) {
        setCurrentLetterData(associatedIPAdata);
      } else {
        setCurrentLetterData({});
      }
      
    } else {
      console.error("selectedLetter value outside A-Z range. This should not happen.");
      
      setCurrentLetterData({});  
      setIPASounds([]);  
    }

  }, [selectedLetter, lettersData]);  

  useEffect(() => {  
    console.log("This hits");
    console.log(selectedIPA);
    console.log(currentLetterData);
    if (selectedIPA in currentLetterData) {
      setCurrentIPAData(currentLetterData[selectedIPA] || {});  
      console.log(currentIPAData);
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
            words={currentIPAData.exampleWords || []} 
            onPlayWordAudio={(audioURL) => {  
              const audio = new Audio(audioURL);  
              audio.play().catch((error) => {  
                console.error(`Failed to play audio: ${error.message}`);  
              });  
            }}  
          />  
          <PlayAndVideoSection  
            diagramURL={currentIPAData.vocalTractDiagram || ""}
            videoURL={currentIPAData.vocalTractMRI || ""} 
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