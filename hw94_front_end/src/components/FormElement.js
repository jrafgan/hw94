import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const FormElement = props => {
    return (
        <Fragment>
            <label htmlFor={props.propertyName} >{props.title}</label>
                <input type={props.type}
                       id={props.propertyName}
                       name={props.propertyName}
                       value={props.value}
                       onChange={props.onChange}
                       required={props.required}
                       autoComplete={props.autoComplete}
                       style={props.error ? {"background":"red"} : null}
                />
                {props.error && (<div className="invalid-feedback">
                    {props.error}
                </div>)}
        </Fragment>
    );
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    autocomplete: PropTypes.string,
};


export default FormElement;