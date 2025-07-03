import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileSearch from "./MobileSearch";

export default function SearchWrapper() {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile) {

            navigate("/explore", { replace: true });
        }
    }, [isMobile, navigate]);

    return isMobile ? <MobileSearch /> : null;
}
