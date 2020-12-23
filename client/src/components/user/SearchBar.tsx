import { TextField } from "@material-ui/core";
import React, { FC, useCallback, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

// Pass the function that updates the 'filter' value to filter your content
type SearchBarProps = {
  setFilterFunction: (string) => void;
};

function SearchBar({ setFilterFunction }: SearchBarProps) {
  const [filterValue, setFilterValue] = useState("");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(e.target.value);
      setFilterFunction(e.target.value);
    },
    [filterValue]
  );

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
      />
    </>
  );
}

export default SearchBar;
