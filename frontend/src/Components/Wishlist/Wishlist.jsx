import React, {useEffect, useState} from "react";
import styles from "./Wishlist.module.css";
import ItemCard from "../ItemCard";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        let storedWishlist = JSON.parse(localStorage.getItem("wishList"));
        if (storedWishlist) {
            setWishlist(storedWishlist);
        }
    }, []);

    const handleWishListClear = () => {
        localStorage.removeItem("wishList");
        setWishlist([]);
    };
    return (
        <>
            {
                wishlist ? (
                    <>
                        <div className={styles.wishListHeader}>
                            <button className="submit-btn" onClick={handleWishListClear}>CLEAR WISHLIST</button>
                        </div>
                        <div className={styles.wishListContainer}>
                            {wishlist.map(item => (
                            <ItemCard key={item.id} item={item} isAdmin={undefined} token={undefined}/>
                        ))}
                        </div>
                    </>
) : (
    <div className={styles.wishListContainer}>
        WishList is Empty!
    </div>
)
            }
        </>
    );
}

export default Wishlist;