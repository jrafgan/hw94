import React, {Component} from 'react';
import {createAlbum, getArtists} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";

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

    render() {

        return (
            <div className="form_div">

                <div className="main_nav">
                </div>
                <div className="album_form">
                    <h3 className="h3">Добавить альбом</h3>
                    <form className="form" onSubmit={this.submitFormHandler}>
                        <label htmlFor="title">Название</label>
                        <input type="text" name="title" id="title" value={this.state.title} onChange={this.inputChangeHandler}/>
                        <label htmlFor="artist">Исполнитель</label>
                        <select id="artist" onChange={this.selectChangeHandler} required>
                            <option value=''>--Выберите исполнителя--</option>
                            {this.props.artists ? this.props.artists.map(item => {
                                return <option value={item._id} key={item._id}>{item.name}</option>
                            }) : null}
                        </select>
                        <label htmlFor="year">Год выпуска</label>
                        <input type="text" name="year" id="year" value={this.state.year} onChange={this.inputChangeHandler}/>
                        <label htmlFor="image">Изображение</label>
                        <input type="file" name="image" id="image" onChange={this.fileChangeHandler}/>
                        <button type="submit" className="field_save_btn">Сохранить</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.music.artists,
});

const mapDispatchToProps = dispatch => ({
    addAlbum: (albumData) => dispatch(createAlbum(albumData)),
    getArtists: () => dispatch(getArtists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAlbum);