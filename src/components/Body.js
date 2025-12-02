import RestaurantCard from "./RestaurantCard";
// import resList from "../utils/MokData";
import { useEffect, useState } from "react";
import Data from "../utils/restaurantData.json";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchtext, setsearchtext] = useState("");
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    setListOfRestaurants(Data);
    setFilteredRestaurant(Data);
  }, []);

  console.log(listOfRestaurants);

  if(onlineStatus === false) {
    return (
    <h1>Looks like you're offline!! Check your internet connectivity</h1>
    )
  };
  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type="text" placeholder="Search" className="search-box"
          value = {searchtext}
          onChange={(e) => {
            setsearchtext(e.target.value);
          }}
          />
          <button onClick={() => {
           const filteredRestaurant = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchtext.toLowerCase()));
           setFilteredRestaurant(filteredRestaurant);
          }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg></button>
        </div>
        {/* <button className="filter-btn" onClick={() => {
          
          const filteredList = listOfRestaurants.filter(
            (res) => res.info.avgRating > 4.4
          );
          setFilteredRestaurant(filteredList);
        }}>Top Rated Restaurant</button> */}
      </div>
      
      <div className="res-container">
        {filteredRestaurant
          .filter((restaurant) => restaurant?.info?.sla?.slaString)
          .map((restaurant) => (
            <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id}><RestaurantCard 
              resData={restaurant} 
            /></Link>
            
          ))
        }
      </div>
    </div>
  );
};

export default Body;