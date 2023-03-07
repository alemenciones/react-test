import React, { useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavouriteIcon from './favouriteIcon';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);

function WishList() {

  const [isActive, setActive] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [list, setList] = useState([]);
  const [storageItem, setStorageItem] = useState(() => localStorage)

  const getList = () => {
    let news = [];
      Object.keys(storageItem).forEach(key => {
        if (key.includes("favourite")) {
          news.push(JSON.parse(storageItem[key]))
        }
      });
    setList(news);
    setIsEmpty(!news.length);
    }
  useEffect(() => {
      getList();
      window.addEventListener('storage', () => {
        setStorageItem(localStorage);
        getList();
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className='conditional-list'>
        <ul className="list" >
        {isEmpty ? (
            <div className="loading">Your wish list it's empty...</div>
         ) : list.map((item, index) => (
                <li
                key={index}
                className={`card ${isActive === index ? "card_active" : "card_normal"}`}
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}>
                    <a className="url" href={item.story_url} target="_blank" rel="noreferrer">
                        <span className="created_at" >
                            <AccessTimeIcon fontSize="small" className="timeIcon"></AccessTimeIcon>
                            <ReactTimeAgo date={Date.parse(item.created_at)} locale="en-US" />
                            {` by ${item.author}`}
                        </span>
                        <h2>
                            {item.story_title}
                        </h2>
                    </a>
                  <FavouriteIcon
                      data={JSON.stringify(item)}
                      id={`favourite_${item.objectID}_${item.story_id}_${item.author}`}
                    ></FavouriteIcon>
                </li>
              ))}
          </ul>
        </div>
    )
}
export default WishList;
