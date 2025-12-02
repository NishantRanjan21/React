import CDN_URL from "../utils/constants";
const starImage = new URL('../../images/star.png', import.meta.url);
const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo } = resData?.info;
  return (
    <div className="res-card">
      <img className="res-logo"
        src={CDN_URL + cloudinaryImageId} />
      <h3>{name}</h3>
      <p>{cuisines.join(',')}</p>
      <p className="price">{costForTwo}</p>
      <div className="rating">
        <button>
          <img src={starImage} alt="star" />
          <p>{avgRating}</p>
        </button>
        <p>{resData.info.sla.slaString}</p>
      </div>


    </div>
  );
};

export default RestaurantCard;