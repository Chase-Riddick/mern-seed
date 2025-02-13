import React from "react";  
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";  
import SearchIcon from "@mui/icons-material/Search";  

interface SearchBarProps {  
  onSearch: (query: string) => void;  
}  

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {  
    const query = event.target.value.toUpperCase();
    if (query.length === 1 && /^[A-Z]$/.test(query)) {
      onSearch(query);
    }
  };  

  return (  
    <TextField
      fullWidth  
      variant="outlined"  
      placeholder="Search letters..."  
      onChange={handleSearch}  
      InputProps={{  
        startAdornment: (  
          <InputAdornment position="start">  
            <SearchIcon />  
          </InputAdornment>  
        ),  
      }}  
      sx={{ margin: 0 }}  
    />  
  );  
};  

export default SearchBar;