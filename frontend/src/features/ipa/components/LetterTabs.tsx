import React from "react";
import { Tabs, Tab } from "@mui/material";

interface LetterTabsProps {
    selectedLetter: string;
    onSelectLetter: (letter: string) => void;
}

const LetterTabs: React.FC<LetterTabsProps> = ({
    selectedLetter,
    onSelectLetter
}) => {

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); 

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        onSelectLetter(newValue);
    };

    return (
        <Tabs
            value={selectedLetter}
            onChange={handleChange}
            // indicatorColor="primary"
            // textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: "divider" }}
        >
            {letters.map((letter) => (
                <Tab key={letter} label={letter} value={letter} />
            ))}
        </Tabs>
    );
};

export default LetterTabs;