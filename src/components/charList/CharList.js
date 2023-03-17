import React from 'react';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    myRef = [];

    setRef = (ref) => {
        this.myRef.push(ref);
    }


    onAddActive = (id) => {
        this.myRef.forEach(item => {
            item.classList.remove('char__item_selected')
        });
        this.myRef[id].classList.add('char__item_selected');
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }


        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
       
    }

    renderItems(arr) {
        const items = arr.map((item, i) => {
        let clazz = item.thumbnail.indexOf('image_not_available') !== -1 ? {objectFit: "contain"} : {objectFit: "cover"};

            return (
                <li className="char__item"
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.onAddActive(i);
                    }}
                    ref={this.setRef}>
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

    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;

        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {content}
                {errorMessage}
                {spinner}
                <button 
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;