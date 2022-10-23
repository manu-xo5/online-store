import React from 'react';
import { useNavigate } from 'react-router-dom';

const FtItem = ({ src, title, item }) => {
  const navigate = useNavigate();

  function goToProductPage() {
    navigate(`/products/overview/${item._id}`, { item });
  }
  return (
    <div className="FtItem" onClick={goToProductPage}>
      <div className="bg">
        <img src={src} alt={title} />
      </div>
      <p>{title}</p>
    </div>
  );
};

export default FtItem;
