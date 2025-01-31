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
        <Tab key={ipa} label={ipa} value={ipa} />  
      ))}  
    </Tabs>  
  );  
};  

export default IPATabs;