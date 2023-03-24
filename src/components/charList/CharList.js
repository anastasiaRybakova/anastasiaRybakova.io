import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {
    
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnd] = useState(false);
    
    const {loading, error, getAllCharacters} = useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }


    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnd(charEnded => ended);
    }

    const myRef = useRef([]);


    const onAddActive = (id) => {
        myRef.current.forEach(item => {
        item.classList.remove('char__item_selected')
        });
        myRef.current[id].classList.add('char__item_selected');
    }

    
    function renderItems(arr) {
        const items = arr.map((item, i) => {
        let clazz = item.thumbnail.indexOf('image_not_available') !== -1 ? {objectFit: "contain"} : {objectFit: "cover"};

            return (
                <li className="char__item"
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        onAddActive(i);
                    }}
                    ref={el => myRef.current[i] = el}>
                    <img src={item.thumbnail} alt={item.name} style={clazz}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                    {items}
            </ul>
        )
    }

        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;
        
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button 
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

export default CharList;