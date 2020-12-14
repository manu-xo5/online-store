import React from "react";
import { withRouter } from "react-router-dom";
import { Input } from "../../components/Form";

const SearchBox = ({ history }) => {
  const handleSearch = ev => {
    if (ev.key === "Enter") history.push(`/search/${ev.target.value}`);
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

export default withRouter(SearchBox);
