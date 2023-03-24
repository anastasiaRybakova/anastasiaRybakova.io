import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';


const ComicsList = () => {

    const [comicList, setComicList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnd] = useState(false);

    const {loading, error, getComics} = useMarvelService();

    useEffect(() => {
        onComicsRequest(offset, true);
    }, [])

    const onComicsRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComics(offset)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (newComicList) => {
        let ended = false;
        if (newComicList.length < 8) {
            ended = true;
        }

        setComicList(comicList => [...comicList, ...newComicList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnd(comicsEnded => ended);
    }

    function renderItems(arr) {
        const items = arr.map(item => {
            return (
                <li className="comics__item"
                    key={item.id}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li> 
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {items}
            {errorMessage}
            {spinner}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => onComicsRequest(offset)}
                    style={{'display': comicsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;