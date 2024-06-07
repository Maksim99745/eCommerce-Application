import SearchIcon from '@mui/icons-material/Search';
import { alpha, Button, InputBase, styled, useEventCallback } from '@mui/material';
import React, { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

const searchBackgroundAlpha = 0.15;
const searchBackgroundHoverAlpha = 0.25;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, searchBackgroundAlpha),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, searchBackgroundHoverAlpha),
  },
  width: 'auto',
  maxWidth: 400,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  flex: 1,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: `calc(1em)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export function SearchComponent() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const handleSearch = useEventCallback(() =>
    navigate({
      pathname: 'search',
      search: createSearchParams({ q: value }).toString(),
    }),
  );

  const keyDownHandle = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });

  return (
    <Search>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={keyDownHandle}
      />
      <Button
        variant="contained"
        color="info"
        onClick={handleSearch}
        sx={{ p: 1, borderRadius: '50%', height: 30, minWidth: 30, width: 30 }}
      >
        <SearchIcon sx={{ height: 22, width: 22 }} />
      </Button>
    </Search>
  );
}
