import ResturantCard from "./ResturantCard";
import { useState, useEffect }  from "react";
import Shimmer from "./Shimmer";


const Body = () => {

    //Local State Variable  - Super Powerful Variable 
  const [listOfResturants, setListOfResturant] = useState([]);
  const [filteredResturant, setFilteredResturant] = useState([]);

  const [ searchText, setSearchText] = useState("");

  console.log("Body rendered");
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
     // console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
     console.log(json);
     setListOfResturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
     setFilteredResturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

  };
 

    return listOfResturants.length === 0 ? ( 
    <Shimmer/>
    ) : (
      <div className ="body">
        <div className="filter">
          <div className = "search">
            <input 
            type="text" 
            className = "search-box" 
            value={searchText} 
            onChange ={(e) => {
            setSearchText(e.target.value);
            }}
            />
            <button 
             onClick={() => {
             console.log(searchText);

             const filteredResturant = listOfResturants.filter(
              (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
             );
             setFilteredResturant(filteredResturant);
              
         
             }}  
            >
              Search</button>

          </div>
          <button className = "filter-btn"
           onClick = {() => {
            
            const filterList = listOfResturants.filter(
                (res) => res.info.avgRating > 4.4
                );
                setListOfResturant(filterList);
            }}
            >Top Rated Resturants</button> 
        </div>
        <div className="res-container">
        { filteredResturant.map((resturant) => (
         <ResturantCard key={resturant.info.id} resData={resturant}/>
         ))}
        </div>
      </div>
    );
  };
  export default Body;
