import React from 'react';
import imageNotAvailable from '../assets/images/photo5801815967637023005.jpg';
import {apiURL} from "../constants";

const ImageThumbnail = props => {
    let image = imageNotAvailable;

    if (props.facebookId) {
        image = props.image;
        return <img src={image} className={props.class} alt='Artist' />
    }
    if (props.image) {
        image = apiURL + '/uploads/' + props.image;
    }

    return <img src={image} className={props.class} alt='Artist' />
};

export default ImageThumbnail;