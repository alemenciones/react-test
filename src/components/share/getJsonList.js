import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavouriteIcon from './favouriteIcon';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);

function GetJsonList() {

    const [isActive, setActive] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isLoadingMore, setLoadingMore] = useState(false);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    let selectedOptionValue = localStorage.getItem('selectedOption') || null;
    
    let dropdown = [
        {
            value: 0,
            text: 'Angular',
            icon: require("../../assets/images/angular.png"),
            url: `https://hn.algolia.com/api/v1/search_by_date?query=angular&page=${page}`
        },
        {
            value: 1,
            text: 'react',
            icon: require("../../assets/images/react.png"),
            url: `https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=${page}`
        },
        {
            value: 2,
            text: 'vue',
            icon: require("../../assets/images/vue.png"),
            url: `https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page=${page}`
        },
    ];
    const handleChange = e => {
        selectedOptionValue = e.value;
        localStorage.setItem('selectedOption', selectedOptionValue);
        setSelectedOption(e);
        setPage(0);
        setLoading(true);
        getList();
    }
    const getList = () => {
        let url = dropdown[selectedOptionValue].url;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let news = Array.from(data.hits);
            if(page > 0){
                setList([...list, ...news]);
            }else{
                setList(news);
            }
        })
        .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false);
                setLoadingMore(false);
            });
    }
    useEffect(() => {
        if (selectedOptionValue) {
            setLoading(true);
            setSelectedOption(dropdown[selectedOptionValue]);
            getList();
        }
    }, []);
    useEffect(() => {
        getList();
    }, [page]);
    window.addEventListener('scroll', function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            let newPage = page + 1;
            setPage(newPage);
            setLoadingMore(true);
        }
    });
    return(
        <div className='conditional-list'>
            <Select
                className="select"
                placeholder="Select your news"
                value={selectedOption}
                options={dropdown}
                onChange={handleChange}
                getOptionLabel={e => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={e.icon} alt={e.text}/>
                    <span style={{ marginLeft: 5 }}>{e.text}</span>
                </div>
                )}
            />
            {isLoading && selectedOption? (
                <div className="loading">Loading...</div>
            ) : (
                <ul className="list" >
                    {list.map((item, index) => (
                        item.author && item.story_title && item.created_at && item.story_url
                        ? (
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
                        )
                        : null
                    ))}
                </ul>
            )}
            {isLoadingMore && !isLoading? (
                <div className="loading">Loading more...</div>
            ) : null}
        </div>
    )
}
export default GetJsonList;
