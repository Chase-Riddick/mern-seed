import React from "react";
import { Typography, Box } from "@mui/material";

interface SelectedLetterHeaderProps {
    letter: string;
}

const SelectedLetterHeader: React.FC<SelectedLetterHeaderProps> = ({ letter }) => {
    return (
        <Box sx={{ textAlign: "center", margin: 2}} >
            <Typography variant="h3" component={"h1"} color="primary">
                {letter}
            </Typography>
        </Box>
    );
};

export default SelectedLetterHeader;