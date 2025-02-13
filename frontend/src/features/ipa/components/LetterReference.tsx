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
    // #1 Find the selected letter in lettersToIPATemp
    // This is key - value pair; the key is a letter, uppercase,
    // .. and the value is an array of associated IPA sounds

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

    // const currentLetterDataTemp = lettersData.letters.find(  
    //   (letter: any) => letter.englishLetter === selectedLetter  
    // );  

  //#2 I need to build an object containing the IPA sounds for the selected letter
  // This object will be used to populate the IPATabs component
  // In the previous operation, I'll get the array of IPA sounds for the selected letter
  // For each IPA sound, I'll find the corresponding IPA sound object in IPASoundsTemp,
  // and will incorporate that into currentLetterDataTemp

  // I'll then set IPASounds item.ipaSymbol into the IPA sounds array

    // if (currentLetterDataTemp) {  
    //   setCurrentLetterData(currentLetterDataTemp);  
    //   const ipaSoundsTemp = currentLetterDataTemp.sounds.map((sound: any) => sound.IPA);  
    //   setIPASounds(ipaSoundsTemp);  
    // } else {  
    //   setCurrentLetterData({});  
    //   setIPASounds([]);  
    // }  

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
            onPlayWordAudio={(audioURL) => console.log(`Play audio: ${audioURL}`)}  
            onPlayWordVideo={(videoURL) => console.log(`Play video: ${videoURL}`)}  
          />  
          <PlayAndVideoSection  
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