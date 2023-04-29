import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-autocomplete";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  const handleSelect = (value) => {
    setKeyword(value);
  };

  const getProductSuggestions = async (value) => {
    try {
      if (keyword.trim()) {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/v1/products?keyword=${value}`
        );
        const data = await response.json();
        const products = data.products.map((product) => product.name);

        // Sort the product list by relevance to the search query
        const sortedProducts = products.sort((a, b) => {
          const aIndex = a.toLowerCase().indexOf(value.toLowerCase());
          const bIndex = b.toLowerCase().indexOf(value.toLowerCase());

          if (aIndex === bIndex) {
            return a.localeCompare(b);
          } else {
            return aIndex - bIndex;
          }
        });

        setProducts(products);
      } else {
        navigate(`/`);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Clear the suggestions when the keyword changes
    setProducts([]);
  }, [keyword]);

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <Autocomplete
          id="search_field"
          items={products}
          getItemValue={(item) => item}
          renderItem={(item, isHighlighted) => (
            <div
              key={item}
              style={{
                background: isHighlighted ? "#3B71CA" : "white",
                color: isHighlighted ? "#FBFBFB" : "#333",
                fontWeight: isHighlighted ? "bold" : "normal",
              }}
              className="p-2"
            >
              {isHighlighted ? `${item} is selected` : item}
            </div>
          )}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            getProductSuggestions(e.target.value);
          }}
          onSelect={handleSelect}
          inputProps={{
            className: "form-control",
            placeholder: "Enter Product Name ...",
          }}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
