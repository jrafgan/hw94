import React, {Component} from 'react';
import {createAlbum, getArtists} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";
import FormElement from "../components/FormElement";

class AddAlbum extends Component {

    state = {
        title: '',
        artist: '',
        year: '',
        image: null,
    };


    componentDidMount() {
        this.props.getArtists();
    }

    submitFormHandler = e => {
        e.preventDefault();

        if (this.state.image) {
            const formData = new FormData();
            Object.keys(this.state).forEach(key => {
                if (this.state[key] !== null) {
                    formData.append(key, this.state[key]);
                }
            });
            this.props.addAlbum(formData);
        } else {
            this.props.addAlbum(this.state)
        }
    };

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    fileChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

    selectChangeHandler = e => {
        this.setState({
            [e.target.id]: e.target.value
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
                <div className="album_form">
                    <h3 className="h3">Добавить альбом</h3>
                    <form className="form" onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName="title"
                            title="Название"
                            type="text"
                            value={this.state.title}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('title')}
                            placeholder="Enter your desired title"
                            autocomplete="new-title"
                        />

                        <label htmlFor="artist">Исполнитель</label>
                        <select id="artist" onChange={this.selectChangeHandler} required>
                            <option value=''>--Выберите исполнителя--</option>
                            {this.props.artists ? this.props.artists.map(item => {
                                return <option value={item._id} key={item._id}>{item.name}</option>
                            }) : null}
                        </select>
                        <FormElement
                            propertyName="year"
                            title="Год выпуска"
                            type="text"
                            value={this.state.year}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('year')}
                            placeholder="Enter your desired year"
                            autocomplete="new-year"
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
    artists: state.music.artists,
    error: state.music.error,
});

const mapDispatchToProps = dispatch => ({
    addAlbum: (albumData) => dispatch(createAlbum(albumData)),
    getArtists: () => dispatch(getArtists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAlbum);