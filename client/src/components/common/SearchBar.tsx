import { TextField } from '@material-ui/core';
import React, { FC, useCallback, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

// Pass the function that updates the 'filter' value to filter your content
type SearchBarProps = {
  setFilterFunction: (searchText: string) => void;
};

function SearchBar({ setFilterFunction }: SearchBarProps) {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterFunction(e.target.value);
    },
    [],
  );

  return (
    <>
      <TextField
        placeholder="Search..."
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
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
