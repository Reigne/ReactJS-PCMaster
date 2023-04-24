import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  let navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  const getProductSuggestions = async (value) => {
    const response = await fetch(`http://localhost:4000/api/v1/products?q=${value}`);
    const data = await response.json();
    return data.products;
  };
  
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <Autocomplete
          getItemValue={(product) => product.name}
          items={products}
          renderItem={(product) => <div key={product.id}>{product.name}</div>}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSelect={(value, product) => navigate(`/products/${product.id}`)}
          inputProps={{
            id: 'search_field',
            className: 'form-control',
            placeholder: 'Enter Product Name ...',
          }}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          menuStyle={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflowY: 'scroll',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            zIndex: '999',
          }}
          async
          fetch={getProductSuggestions}
          debounce={300}
          onFetchError={(error) => console.log(error)}
          renderInput={(props) => <input {...props} />}
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
