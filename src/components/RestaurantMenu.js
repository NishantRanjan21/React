import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuCDN_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const RestaurantMenu = () => {
  const dispatch = useDispatch();

  const handleAddItem = (itemInfo) => {
    dispatch(addItem(itemInfo))
  }

  const { resid } = useParams();

  const resInfo = useRestaurantMenu(resid); //custom Hooks

  const [openCategoryIndex, setOpenCategoryIndex] = useState(0);

  const handleCategoryClick = (index) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  };

  if (!resInfo) {
    return null;
  }

  const info = resInfo?.cards[2]?.card?.card?.info;
  const {
    name,
    cuisines,
    costForTwoMessage,
    cloudinaryImageId,
    avgRating,
    totalRatingsString,
  } = info || {};

  const cuisineText = Array.isArray(cuisines) ? cuisines.join(",") : "";

  const categories =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="Menu-container">
      <div className="Menu">
        <h1>{name}</h1>
        <div className="Menu-info">
          <h3>
            ⭐{avgRating}({totalRatingsString})
          </h3>
          <h3>{cuisineText}</h3>
          <h3>{costForTwoMessage}</h3>
        </div>
      </div>

      <div className="accordion">
        {categories.map((category, index) => (
          <div className="accordion-item" key={category?.card?.card?.title}>
            <div
              className="accordion-header"
              onClick={() => handleCategoryClick(index)}
            >
              <h3>
                {category?.card?.card?.title} (
                {category?.card?.card?.itemCards.length}){" "}
              </h3>
              <span>
                {openCategoryIndex === index ? (
                  <i className="ri-arrow-drop-up-line"></i>
                ) : (
                  <i className="ri-arrow-drop-down-line"></i>
                )}
              </span>
            </div>

            {openCategoryIndex === index && (
              <div className="accordion-content">
                {category?.card?.card?.itemCards.map((itemWrapper) => {
                  const itemInfo = itemWrapper?.card?.info;
                  return (

                    <div className="menu-item" key={itemInfo?.id}>

                      <div className="menu-content">
                        <h4>{itemInfo?.name}</h4>
                        <p>
                          {/* <span className="defaultprice">₹{item?.card?.info?.defaultPrice / 100}</span> */}
                          <span>  ₹{itemInfo?.finalPrice / 100 || itemInfo?.price / 100 || itemInfo?.defaultPrice
                            / 100}</span>
                        </p>
                      </div>
                      <div className="image-container">
                        <img
                          className="menu-logo"
                          src={MenuCDN_URL + itemInfo?.imageId}
                        />
                        <button className="add-btn" onClick={() => handleAddItem(itemInfo)}>ADD</button>

                      </div>


                    </div>

                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
