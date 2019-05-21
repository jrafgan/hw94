import React, {Component} from 'react';
import {createTrack, getAlbums, getArtists} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";
import FormElement from "../components/FormElement";

class AddTrack extends Component {

    state = {
        title: '',
        artist: '',
        album: '',
        duration: '',
        youtube: ''
    };


    componentDidMount() {
        this.props.getArtists();
    }

    submitFormHandler = e => {
        e.preventDefault();

        this.props.createTrack(this.state);
        console.log(this.state);
    };

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    selectChangeHandler = e => {
        console.log(e.target.id, e.target.value);
        if (e.target.id === 'artist') {
            this.props.getAlbums(e.target.value);
        }

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
                    <h3 className="h3">Добавить трэк</h3>
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
                        <label htmlFor="album">Альбом</label>
                        <select id="album" onChange={this.selectChangeHandler} required>
                            <option value=''>--Выберите исполнителя--</option>
                            {this.props.albums ? this.props.albums.map(item => {
                                return <option value={item._id} key={item._id}>{item.title}</option>
                            }) : null}
                        </select>
                        <FormElement
                            propertyName="duration"
                            title="Продолжительность трэка"
                            type="text"
                            value={this.state.duration}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('duration')}
                            placeholder="Enter your desired duration"
                            autocomplete="new-duration"
                        />

                        <FormElement
                            propertyName="youtube"
                            title="Ссылка на youtube"
                            type="text"
                            value={this.state.youtube}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('youtube')}
                            placeholder="Enter in this format https://www.youtube.com/embed/Izf0BJBQ5e8"
                            autocomplete="new-youtube"
                        />

                        <button type="submit" className="field_save_btn">Сохранить</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.music.artists,
    albums: state.music.albums,
    error: state.music.error,
});

const mapDispatchToProps = dispatch => ({
    getAlbums: artistId => dispatch(getAlbums(artistId)),
    getArtists: () => dispatch(getArtists()),
    createTrack: trackData => dispatch(createTrack(trackData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);