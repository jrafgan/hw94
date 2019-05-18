import React, {Component, Fragment} from 'react';
import ImageThumbnail from "./ImageThumbnail";
import {
    deleteAlbum,
    deleteArtist,
    deleteTrack,
    getAlbums,
    getArtists,
    getTracks, toggleAlbumPublish, toggleArtistPublish,
    toggleTrackPublish
} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";

class AlbumInfo extends Component {

    componentDidMount() {
        this.props.getArtists();
        this.props.getAlbums();
        this.props.getTracks();
    }

    deleteArtist = e => {
        this.props.deleteArtist(e.target.id);
    };

    deleteAlbum = e => {
        this.props.deleteAlbum(e.target.id);
    };

    deleteTrack = e => {
        this.props.deleteTrack(e.target.id);
    };

    togglePublishArtist = e => {
        this.props.togglePublishArtist(e.target.id);

    };

    togglePublishAlbum = e => {
        this.props.togglePublishAlbum(e.target.id);
    };

    togglePublishTrack = e => {
        this.props.togglePublishTrack(e.target.id);
    };

    render() {
        return (
            <Fragment>
                <div className="column">
                    <p className="album_p">Артисты</p>
                    {this.props.artists ? this.props.artists.map(artist => <div className="artist_thumbnail"
                                                                                key={artist._id}>
                        <ImageThumbnail image={artist.image}/>
                        <p>{artist.name}</p>
                        {!artist.published ? <button id={artist._id} className="publish_btn"
                                                     onClick={this.togglePublishArtist}>Опубликовать</button> :
                            <button id={artist._id} className="delete_btn"
                                    onClick={this.deleteArtist}>Удалить</button>}

                    </div>) : null}
                    <Fragment>
                        <p className="album_p">Альбомы</p>
                        {this.props.albums ? this.props.albums.map(item => {
                            return <div className="artist_thumbnail" key={item._id}>
                                <ImageThumbnail image={item.image}/>
                                <p>{item.title}</p>
                                <p>{item.year}-год</p>
                                {!item.published ? <button id={item._id} className="publish_btn"
                                                           onClick={this.togglePublishAlbum}>Опубликовать</button> :
                                    <button id={item._id} className="delete_btn"
                                            onClick={this.deleteAlbum}>Удалить</button>}
                            </div>
                        }) : null}
                    </Fragment>
                    <Fragment>
                        <p className="album_p">Трэки</p>
                        {this.props.tracks ? this.props.tracks.map(item => {
                            return <div className="artist_thumbnail" key={item._id}>
                                <span>{item.number}. </span>
                                <span id={item._id}> {item.title} </span>
                                <span> {item.duration} </span>
                                {!item.published ? <button id={item._id} className="publish_btn"
                                                           onClick={this.togglePublishTrack}>Опубликовать</button> :
                                    <button id={item._id} className="delete_btn"
                                            onClick={this.deleteTrack}>Удалить</button>}
                            </div>
                        }) : null}
                    </Fragment>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.music.artists,
    albums: state.music.albums,
    tracks: state.music.tracks,
});

const mapDispatchToProps = dispatch => ({
    getArtists: () => dispatch(getArtists()),
    getAlbums: () => dispatch(getAlbums()),
    getTracks: () => dispatch(getTracks()),
    deleteTrack: id => dispatch(deleteTrack(id)),
    deleteArtist: id => dispatch(deleteArtist(id)),
    deleteAlbum: id => dispatch(deleteAlbum(id)),
    togglePublishTrack: id => dispatch(toggleTrackPublish(id)),
    togglePublishAlbum: id => dispatch(toggleAlbumPublish(id)),
    togglePublishArtist: id => dispatch(toggleArtistPublish(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumInfo);