import { InputProps, TextField } from "@material-ui/core";
import React, { FC, useCallback } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

// Pass the function that updates the 'filter' value to filter your content
type SearchBarProps = {
  setFilterFunction: (searchText: string) => void;
};

const SearchBar: FC<SearchBarProps & InputProps> = ({
  setFilterFunction,
  ...inputProps
}: SearchBarProps) => {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterFunction(e.target.value);
    },
    [setFilterFunction]
  );

  return (
    <TextField
      {...inputProps}
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
      autoFocus
    />
  );
};

export default SearchBar;
