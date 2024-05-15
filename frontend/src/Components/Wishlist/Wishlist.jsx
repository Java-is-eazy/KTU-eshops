import React, {useEffect, useState} from 'react';
import styles from "./Wishlist.module.css";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        let storedWishlist = JSON.parse(localStorage.getItem('wishList'));
        if (storedWishlist) {
            setWishlist(storedWishlist);
        }
    }, []);

    const handleWishListClear = () => {
        localStorage.removeItem('wishList');
        setWishlist([]);
    };
    return (
        <>
            {
                wishlist ? (
                    <>
                        <div className={styles.wishListHeader}>
                            <button className={styles.submitBtn} onClick={handleWishListClear}>CLEAR WISHLIST</button>
                        </div>
                        <div className={styles.wishListContainer}>
                            {wishlist.map(item => (
                                <div key={item.id} className={styles.wishListWrapper}>
                                    <div className={styles.overflowHidden}>{item.title}</div>
                                    <img className={styles.wishListImg} src={item.image} alt=""/>
                                </div>
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