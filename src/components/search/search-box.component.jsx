import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Form';

const SearchBox = ({ history }) => {
  const navigate = useNavigate()
  const handleSearch = (ev) => {
    if (ev.key === 'Enter') navigate(`/search/${ev.target.value}`);
  };

  return (
    <Input
      name="search"
      type="search"
      placeholder="Search here..."
      onKeyDown={handleSearch}
    />
  );
};

export default SearchBox;
