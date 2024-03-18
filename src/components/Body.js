import ResturantCard from "./ResturantCard";
import { useState, useEffect }  from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


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
    // console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    // console.log(json);
     setListOfResturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
     setFilteredResturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

  };

 const onlineStatus = useOnlineStatus();

 if(onlineStatus === false){
  return (
     <h1>
        Looks like you're offline!! Please check your internet connection;
     </h1>
  )
 }
 

    return listOfResturants.length === 0 ? ( 
    <Shimmer/>
    ) : (
      <div className ="body">
        <div className="filter flex">
          <div className = "search m-4 p-4">
            <input 
            type="text" 
            className = "border border-solid border-black" 
            value={searchText} 
            onChange ={(e) => {
            setSearchText(e.target.value);
            }}
            />
            <button className = "px-4 py-2 bg-green-100 m-4 rounded-lg"
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

          <div className="search m-4 p-4 flex items-center">
          <button className = "px-4 py-2 bg-gray-100 rounded-lg"
           onClick = {() => {
            
            const filterList = listOfResturants.filter(
                (res) => res.info.avgRating > 4.4
                );
                setListOfResturant(filterList);
            }}
            >Top Rated Resturants</button> 
          </div>
         
        </div>
        <div className="flex flex-wrap">
      {filteredResturant.map((restaurant) => (
    <Link key={restaurant.info.id} to={"resturants/" + restaurant.info.id}>
      <ResturantCard resData={restaurant} />
    </Link>
  ))}
</div>

      </div>
    );
  };
  export default Body;
