import { MenuAPI_URL } from "./constants";
import { useState, useEffect } from "react";

const useRestaurantMenu = (resid) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {

        const data = await fetch(MenuAPI_URL+resid+"&submitAction=ENTER");

        const json = await data.json();
        console.log(json);
        setResInfo(json.data);
    };

    return resInfo;
};

export default useRestaurantMenu;
