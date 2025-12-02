import { useEffect, useState } from "react";
//This window.addEventListner -> offline/online is used to make these types of online and offline status
const useOnlineStatus = () => {

    const [onlineStatus, setOnlineStatus] = useState(true);

    useEffect(() => {
        window.addEventListener("offline", () => {
            setOnlineStatus(false);
        });

        window.addEventListener("online", () => {
            setOnlineStatus(true);
        });

    }, [])

    return onlineStatus;
};

export default useOnlineStatus;