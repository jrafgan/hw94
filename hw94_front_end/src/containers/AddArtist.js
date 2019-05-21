import React, {Component} from 'react';
import {createArtist} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";
import FormElement from "../components/FormElement";

class AddArtist extends Component {

    state = {
        name: '',
        description: '',
        image: null,
    };

    submitFormHandler = e => {
        e.preventDefault();

        if (this.state.image) {
            const formData = new FormData();
            Object.keys(this.state).forEach(key => {
                if (this.state[key] !== null) {
                    formData.append(key, this.state[key]);
                }
            });
            this.props.addArtist(formData);
        } else {
            this.props.addArtist(this.state)
        }
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {

        return (
            <div className="form_div">
                <div className="main_nav">
                </div>
                <div className="artist_form">
                    <h3 className="h3">Добавить исполнителя</h3>
                    <form className="form" onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName="name"
                            title="Исполнитель"
                            type="text"
                            value={this.state.name}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('name')}
                            placeholder="Enter your desired name"
                            autocomplete="new-name"
                        />

                        <FormElement
                            propertyName="description"
                            title="Описание"
                            type="text"
                            value={this.state.description}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('description')}
                            placeholder="Enter your desired description"
                            autocomplete="new-description"
                        />

                        <label htmlFor="image">Изображение</label>
                        <input type="file" name="image" id="image" onChange={this.fileChangeHandler}/>
                        {this.getFieldError('image') && (<div className="invalid-feedback">
                            {this.getFieldError('image')}
                        </div>)}
                        <button type="submit" className="field_save_btn">Сохранить</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.music.error,
});

const mapDispatchToProps = dispatch => ({
    addArtist: (artistData) => dispatch(createArtist(artistData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddArtist);