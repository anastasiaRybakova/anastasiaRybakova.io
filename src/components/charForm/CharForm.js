import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { Link } from "react-router-dom";

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from "../errorMessage/ErrorMessage";

import './charForm.scss';

const CharForm = () => {
    
    const [char, setChar] = useState(null);
    const {error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }
    
    const updateChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(onCharLoaded);
    }


    const errorMessage = error ? <div className="char__form-critical-error"><ErrorMessage/></div> : null;
    const results = !char ? null : char.length > 0 ? 
                                    <div className="char__form-wrapper">
                                        <div className="char__form-success">
                                        There is! Visit {char[0].name} page?
                                        </div>
                                       <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                                            <div className="inner">To page</div>
                                       </Link> 
                                    </div> :
                                    <div className="char__form-error">
                                        The character was not found. Check the name and try again
                                    </div>


    return (
       <div className="char__form">
            <Formik
        initialValues= {{   
            name: ''
        }}
        validationSchema={Yup.object({
            name: Yup.string()
                        .required('This field is required')})}
        onSubmit={({name}) => updateChar(name)}>

        <Form>
            <label className="char__form-label" htmlFor="name" >Or find a character by name:</label>
            <div className="char__form-wrapper">
            <Field
            id="name"
            type="text"
            name="name"
            placeholder="Enter name"
            />
            <button className="button button__main"
                    type="submit">
                <div className="inner">find</div>
            </button>
            </div>
            <FormikErrorMessage className="char__form-error" name='name' component='div'/>
        </Form>
        </Formik>
       {results}
       {errorMessage}
       </div>
    )
}

export default CharForm;
