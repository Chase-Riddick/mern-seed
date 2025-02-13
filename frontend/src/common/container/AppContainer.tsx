
import React from "react";  
import { Box } from "@mui/material";  

interface AppContainerProps {
    children: React.ReactNode;
    }

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {  
  return (  
    <Box  
      sx={{  
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",  
        alignItems: "center",  
        width: "100%",
        height: "100vh",  
        minHeight: "100vh",  
        backgroundColor: "#f5f5f5",  
        overflow: "hidden",  
      }}  
    >  
      {children}
    </Box>
    );
}

export default AppContainer;