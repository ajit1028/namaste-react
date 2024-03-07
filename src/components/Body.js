import ResturantCard from "./ResturantCard";
import { useState }  from "react";
 import resList from "../utils/mockData";
const Body = () => {

    //Local State Variable  - Super Powerful Variable 
  const [listOfResturants, setListOfResturant] = useState(resList);

    return(
      <div className ="body">
        <div className="filter">
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
        { listOfResturants.map((resturant) => (
         <ResturantCard key={resturant.info.id} resData={resturant}/>
         ))}
        </div>
      </div>
    );
  };
  export default Body;
