import { useState } from "react";
import { Helmet } from "react-helmet";


import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoudary from "../errorBoundary/ErrorBoudary";
import CharForm from "../charForm/CharForm";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);
    

    const onCharSelected = (id) => {
        setChar(id);
    }
    
    return (
        <>
        <Helmet>
        <meta
            name="description"
            content="Marvel information portal"
        />
    <title>Marvel information portal</title>
        </Helmet>
        <ErrorBoudary>
            <RandomChar/>  
        </ErrorBoudary>
        <div className="char__content">
            <ErrorBoudary>
                <CharList onCharSelected={onCharSelected}/>
            </ErrorBoudary>
            <div>
            <ErrorBoudary>
                <CharInfo charId={selectedChar}/>
            </ErrorBoudary>
            <ErrorBoudary>
                <CharForm/>
            </ErrorBoudary>
            </div>
           
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;