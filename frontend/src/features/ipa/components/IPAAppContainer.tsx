import React, { useState, useEffect } from "react";  
import { Box } from "@mui/material"
import SearchBar from "./SearchBar";
import LetterTabs from "./LetterTabs";
import SelectedLetterHeader from "./SelectedLetterHeader";
import IPATabs from "./IPATabs";
import letterData from "../data/letterData.json";

const data = JSON.parse(JSON.stringify(letterData));

const IPAAppContainer: React.FC = () => {
    const [ selectedLetter, setSelectedLetter ] = useState<string>("");
    const [ selectedIPA, setSelectedIPA ] = useState<string>("");
    const [ ipaSounds, setIPASounds ] = useState<string[]>([]);
    const [ currentIPAData, setCurrentIPAData ] = useState<{[key: string]: any}>({});
    const [ currentLetterData, setCurrentLetterData ] = useState<{[key: string]: any}>({});
    const [ lettersData ] = useState<{[key: string]: any}>(data);
    
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

    useEffect(() => {  
        const currentLetterDataTemp = lettersData.letters.find(  
            (letter: any) => letter.englishLetter === selectedLetter  
        );  
        console.log(currentLetterDataTemp); // Logs the correct data  

        if (currentLetterDataTemp) {  
            setCurrentLetterData(currentLetterDataTemp);  

            // Update IPA sounds for the selected letter  
            const ipaSoundsTemp = currentLetterDataTemp.sounds.map((sound: any) => sound.IPA);  
            setIPASounds(ipaSoundsTemp);  
        } else {  
            // Reset states if no letter matches  
            setCurrentLetterData({});  
            setIPASounds([]);  
        }  
    }, [selectedLetter, lettersData]);  

    // const currentLetterData = lettersData.letters.find((letter: any) => letter.englishLetter === selectedLetter);

    // const ipaSounds = currentLetterData?.sounds.map((sound: any) => sound.ipa) || [];

    // const currentIPAData = currentLetterData?.sounds.find((sound: any) => sound.ipa === selectedIPA);

    return (
        <Box
        sx={{
            // display: "flex",
            // flexDirection: "column",
            // minHeight: "100vh",
            width: "100%",
            maxWidth: "700px",
            minWidth: "400px",
            backgroundColor: "#fff",
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
        }}
        >
            <SearchBar onSearch={handleSearch} />
            <LetterTabs
            selectedLetter={selectedLetter}  
            onSelectLetter={handleSelectLetter}  
            />
            <SelectedLetterHeader letter={selectedLetter} />
            <pre>{JSON.stringify(currentLetterData, null, 2)}</pre>
            <IPATabs
                ipaSounds={ipaSounds}
                selectedIPA={selectedIPA}
                onSelectIPA={handleSelectIPA}
            />


            {/* {children} */}
        </Box>
    );
}

export default IPAAppContainer;