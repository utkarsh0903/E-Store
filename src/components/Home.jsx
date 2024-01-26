import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import FilterItem from "./FilterItem";

const Home = () => {
  const dispatch = useDispatch();

  const [productList, setProductList] = useState([]);
  const [searchItemName, setSearchItemName] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const onChangeInSearch = (e) => {
    let itemName = e.target.value;
    setSearchItemName(itemName);
  };

  
  const handleEnterKey = event => {
    if(event.key === "Enter"){
      searchItem();
    }
  }

  const searchItem = () => {
    console.log(searchItemName);
    setIsSearch(true);
    setIsFilter(false);
    setIsFirstLoad(false);
  };

  const handleFilterChange = ({ event }) => {
    const { value, checked } = event.target;
    setIsFilter(true);
    setIsSearch(false);
    setIsFirstLoad(false);

    if (checked) {
      setFilteredOptions((prevSelected) => [...prevSelected, value]);
    } else {
      if (!filteredOptions) setIsFilter(false); setIsSearch(true) ;
      setFilteredOptions((prevSelected) =>
        prevSelected.filter((option) => option !== value)
      );
    }

  };

  // console.log('Filtered Options:', filteredOptions);

  const addToCartHandler = (options) => {
    toast.success("Added to cart");
    dispatch({
      type: "addToCart",
      payload: options,
    });
    dispatch({ type: "calculatePrice" });
  };

  useEffect(() => {
    const apiUrl =
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductList(data);
      });
  }, []);

  return (
    <div className="home">
      <div className="search-bar">
        <input
          type="text"
          onChange={(e) => onChangeInSearch(e)}
          placeholder="Search for products..."
          onKeyDown = {handleEnterKey}
        />
        <button onClick={searchItem} className="search-button-container">
          <FiSearch />
        </button>
      </div>
      <div className="item-section">
        <div className="filter-section">
          <FilterItem
            key={"color"}
            title={"Colour"}
            filterOptions={[
              "Black",
              "Blue",
              "Pink",
              "Green",
              "Red",
              "Grey",
              "Purple",
              "White",
              "Yellow",
            ]}
            handleFilterChange={handleFilterChange}
          />
          <FilterItem
            key={"gender"}
            title={"Gender"}
            filterOptions={["Men", "Women"]}
            handleFilterChange={handleFilterChange}
          />
          <FilterItem
            key={"price"}
            title={"Price"}
            filterOptions={["0 - Rs250", "Rs251 - Rs450", "Rs451 - Rs600"]}
            handleFilterChange={handleFilterChange}
          />
          <FilterItem
            key={"type"}
            title={"Type"}
            filterOptions={["Polo", "Hoodie", "Basic"]}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div className="itemList-section">
          {/* First Time Load  */}
          {isFirstLoad &&
            productList.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  imgSrc={item.imageURL}
                  id={item.id}
                  maxQuantity={item.quantity}
                  handler={addToCartHandler}
                />
              );
            })}
          {/* Search Section */}
          {isSearch &&
            productList
              .filter(
                (item) =>
                  item.color.toLowerCase().includes(searchItemName.toLowerCase()) ||
                  item.type.toLowerCase().includes(searchItemName.toLowerCase()) ||
                  item.name.toLowerCase().includes(searchItemName.toLowerCase())
              )
              .map((item) => {
                return (
                  <ProductCard
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    imgSrc={item.imageURL}
                    id={item.id}
                    maxQuantity={item.quantity}
                    handler={addToCartHandler}
                  />
                );
              })}
          {/* Filter Section */}
          {isFilter &&
            filteredOptions.map((option) => {
              console.log(option);
              return productList
                .filter(
                  (item) =>
                    item.color.includes(option) ||
                    item.type.includes(option) ||
                    item.gender.includes(option)
                )
                .map((item) => {
                  return (
                    <ProductCard
                      key={item.id}
                      name={item.name}
                      price={item.price}
                      imgSrc={item.imageURL}
                      id={item.id}
                      maxQuantity={item.quantity}
                      handler={addToCartHandler}
                    />
                  );
                });
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
