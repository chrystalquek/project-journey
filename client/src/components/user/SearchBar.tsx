import { TextField } from "@material-ui/core";
import React, { FC } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

// Pass the function that updates the 'filter' value to filter your content
type SearchBarProps = {
  setFilterFunction: () => void;
};

function SearchBar(props) {
  const handleSearchChange = (e) => {
    props.setFilterFunction === undefined
      ? console.log("setFilterFunction property is not passed")
      : props.setFilterFunction(e.target.value);
  };
  return (
    <>
      <TextField
        placeholder="Search..."
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon></SearchIcon>
            </InputAdornment>
          ),
        }}
        fullWidth
        variant="outlined"
        margin="dense"
      ></TextField>
      <div>Hello</div>
    </>
  );
}

export default SearchBar;
