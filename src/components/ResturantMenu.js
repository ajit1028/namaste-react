import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const ResturantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    

    useEffect(() => {
     fetchMenu(); 
   },[]);


    
   const {resId} = useParams();

//    const Api = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.4358011&lng=81.846311&restaurantId=";

//    const menuApi = Api + resId;

   const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();

   /// console.log(json);
    setResInfo(json.data);
    // console.log(json.data);

   };

   if(resInfo === null) return <Shimmer />;
    

   const {name, cuisines , costForTwo} = resInfo?.cards[0]?.card?.card?.info;

   // const {itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

   const categories = resInfo ?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
       (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
   );
    
   console.log(categories);
   
   const itemCards = categories[0].card.card.itemCards;
   console.log("itemcards",itemCards);

    return  (
        <div className="menu" >
            <h1>{name}</h1>
            <p>{cuisines.join(",")} - {costForTwo}</p>
            <h2>Menu</h2>
            <ul>
                {
                itemCards.map((item) => (
                 <li>
                    {item.card.info.name} - {"Rs."}
                    {item.card.info.price / 100 || item.card.info.defaultPrice /100}
                    </li>
                  ))
                  }
            </ul>
            
       

           
        </div>
    )
}
export default ResturantMenu;
//item.card.name
//resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card;