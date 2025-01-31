import React, { useState } from "react";  
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
            <div>{JSON.stringify(ipaSounds, null, 2)}</div>
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