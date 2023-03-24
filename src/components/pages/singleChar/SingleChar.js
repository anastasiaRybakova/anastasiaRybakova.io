import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from '../../appBanner/AppBanner';

import './singleChar.scss';

const SingleChar = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();
    
    useEffect(() => {
        updateChar();
    }, [charId])
    
    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
       <>
       <AppBanner/>
        {errorMessage}
        {spinner}
        {content}
       </>
    )
}

    const View = ({char}) => {
    const {title, description, thumbnail} = char;
    
    return (
        <div className="single-char">
        <img src={thumbnail} alt={title} className="single-char__img"/>
        <div className="single-char__info">
            <h2 className="single-char__name">{title}</h2>
            <p className="single-char__descr">{description}</p>
        </div>
    </div>
    )
}

export default SingleChar;

