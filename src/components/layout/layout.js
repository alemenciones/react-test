import Header from './header'
import WishList from '../share/wishList'
import GetJsonList from '../share/getJsonList';
import React, { useEffect, useState } from 'react';
function Layout() {
    const [wishList, seeWishList] = useState(localStorage.getItem('seeWishList'));
    useEffect(() => {
        localStorage.setItem('seeWishList', wishList);
      }, [wishList]);
    return(
        <main>
            <Header></Header>
            <div className="main-wrapper">
                <ul className="main-navitation">
                    <li
                    className={`nav ${!wishList? "nav_active" : "nav_normal"}`}
                    onClick={() => seeWishList(0)} >All</li>
                    <li
                    className={`nav ${wishList ? "nav_active" : "nav_normal"}`}
                    onClick={() => seeWishList(1)} >My Faves</li>
                </ul>
                {!wishList ? (
                    <GetJsonList></GetJsonList>
                ) : (
                    <WishList></WishList>
                )}
            </div>
        </main>
    )
};
export default Layout;