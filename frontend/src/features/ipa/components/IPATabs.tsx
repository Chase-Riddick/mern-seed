import React from "react";  
import { Tabs, Tab } from "@mui/material";  

interface IPATabsProps {  
  ipaSounds: string[];  
  selectedIPA: string;  
  onSelectIPA: (ipa: string) => void;  
}  

const IPATabs: React.FC<IPATabsProps> = ({  
  ipaSounds,  
  selectedIPA,  
  onSelectIPA,  
}) => {  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {  
    onSelectIPA(newValue);  
  };  

  return (  
    <Tabs  
      value={selectedIPA}  
      onChange={handleChange}  
      variant="fullWidth"  
      sx={{ borderBottom: 1, borderColor: "divider" }}  
    >  
      {ipaSounds.map((ipa) => (  
        <Tab
          key={ipa}
          label={ipa}
          value={ipa}
          sx={{  
            fontSize: "1.2rem", // Increase font size  
            fontWeight: "bold", // Make the font bold  
            textTransform: "none", // Prevent uppercase transformation  
            color: "primary.main", // Use theme's primary color  
            "&.Mui-selected": {  
              color: "secondary.main", // Change color when selected  
              fontSize: "1.4rem", // Make selected tab even bigger  
            },  
          }}   
        />  
      ))}  
    </Tabs>  
  );  
};  

export default IPATabs;