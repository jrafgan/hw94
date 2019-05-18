import React, {Component} from 'react';
import {createArtist} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";

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

    render() {

        return (
            <div className="form_div">
                <div className="main_nav">
                </div>
                <div className="artist_form">
                    <h3 className="h3">Добавить исполнителя</h3>
                    <form className="form" onSubmit={this.submitFormHandler}>
                        <label htmlFor="name">Исполнитель</label>
                        <input type="text" name="name" id="name" value={this.state.name} onChange={this.inputChangeHandler}/>
                        <label htmlFor="description">Описание</label>
                        <input type="text" name="description" id="description" value={this.state.description} onChange={this.inputChangeHandler}/>
                        <label htmlFor="image">Изображение</label>
                        <input type="file" name="image" id="image" onChange={this.fileChangeHandler}/>
                        <button type="submit" className="field_save_btn">Сохранить</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addArtist: (artistData) => dispatch(createArtist(artistData)),
});

export default connect(null, mapDispatchToProps)(AddArtist);