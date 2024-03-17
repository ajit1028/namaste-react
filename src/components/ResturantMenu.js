
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useResturantMenu from "../utils/useResturantMenu";

const ResturantMenu = () => {
    
    const {resId} = useParams();

    const resInfo = useResturantMenu(resId);

    
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