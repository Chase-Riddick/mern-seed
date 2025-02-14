import React, { useState } from "react";  
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";  
import VowelChartContainer from "./VowelChartContainer";  
import LetterReference from "./LetterReference";
import InfoIcon from "@mui/icons-material/Info"; // About icon  
import BarChartIcon from "@mui/icons-material/BarChart"; // Vowel Chart icon  
import BookIcon from "@mui/icons-material/Book"; // Letter Reference icon  

const IPAAppContainer: React.FC = () => {  
  // State for navigation  
  const [currentView, setCurrentView] = useState<string>("letter-reference");  

  return (  
    <Box  
      sx={{  
        margin: "10px 10px 10px 10px !important",  
        padding: "0",  
        width: "100%",
        flex: 1,
        height: "100%", 
        display: "flex",  
        flexDirection: "column",  
        maxWidth: "700px",  
        minWidth: "400px",  
        backgroundColor: "#fff",  
        boxShadow: 3,  
        borderRadius: 2,  
        overflow: "hidden",  
      }}  
    >  
    <Box  
        sx={{  
          flex: 1, // Dynamically takes up remaining space  
          overflowY: "auto", // Enables scrolling for overflowing content  
          padding: 2,  
        }}  
      >  
      {/* Render the current view */}  
      {currentView === "letter-reference" && <LetterReference />}  
      {currentView === "vowel-chart" && <VowelChartContainer />}  
      {currentView === "about" && (  
        <Box sx={{ textAlign: "center", padding: "20px" }}>  
          <h2>About the IPA App</h2>  
          <p>This app helps users explore the International Phonetic Alphabet (IPA).</p>  
        </Box>  
      )}  
      </Box> 

      {/* Bottom Navigation */}  
      <BottomNavigation  
        value={currentView}  
        onChange={(event, newValue) => setCurrentView(newValue)}  
        sx={{  
            marginTop: "auto",
        // position: "fixed",  
        //   bottom: 0,  
        //   left: 0,  
        //   right: 0,  
          width: "100%",
          bottom: 0,
          backgroundColor: "#fff",  
          boxShadow: 3,  
        }}  
      >  
        <BottomNavigationAction  
          label="Letter Reference"  
          value="letter-reference"  
          icon={<InfoIcon />}  
        />  
        <BottomNavigationAction  
          label="Vowel Chart"  
          value="vowel-chart"  
          icon={<BarChartIcon />}  
        />  
        <BottomNavigationAction  
          label="About"  
          value="about"  
          icon={<BookIcon />}  
        />  
      </BottomNavigation>  
    </Box>  
  );  
};  

export default IPAAppContainer;