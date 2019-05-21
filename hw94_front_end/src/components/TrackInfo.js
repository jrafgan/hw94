import React, {Component} from 'react';
import ImageThumbnail from "./ImageThumbnail";
import {getAlbum, getTracksByAlbum} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";
import {saveTrack} from "../store/actions/usersActions";
import btnImg from "../assets/images/yt_btn.png";

class TrackInfo extends Component {

    state = {
        showPlayer: false,
        src: '',
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getAlbum(id);
        this.props.getTracksByAlbum(id);
    }

    onSaveTrack = e => {
        let id = e.target.id;
        if (e.target.id.length > 24) {
            id = e.target.parentNode.id;
        }
        this.props.saveTrack(id);
    };

    closePlayer = () => {
        this.setState({showPlayer: false})
    };

    handler = e => {
        const id = e.target.id;
        this.setState({showPlayer: true, src: id});
    };

    render() {
        return (
            <div className="column">
                {this.state.showPlayer ? <div className="iframe_wrapper" onClick={this.closePlayer}>
                    <div className="yt_frame">
                        <iframe title="hw94"
                                id="player"
                                width="640"
                                height="360"
                                src={this.state.src}
                                allowFullScreen
                        />
                    </div>
                </div> : null}
                <div className="one_artist">
                    {this.props.album ? <div className="one_artist_thumbnail" key={this.props.album.artist._id}>
                        <div><ImageThumbnail image={this.props.album.artist.image} class="small_img_thumbnail"/>
                        <p>{this.props.album.artist.name}</p>
                        </div>
                        <p>{this.props.album.artist.description}</p>
                    </div> : null}
                </div>
                {this.props.album ? <div className="artist_thumbnail">
                    <ImageThumbnail image={this.props.album.image} class="img_thumbnail"/>
                    <p>{this.props.album.title}</p>
                    <p>{this.props.album.year}-год</p>
                </div> : null}
                <div className="track_thumbnail">
                    <p>Трэки</p>
                    {this.props.tracks ? this.props.tracks.map(track => {
                        return <div key={track._id} id={track._id} onClick={this.props.user ? this.onSaveTrack : null}
                                    className={this.props.user ? "tracks_div" : null}>
                            <span>{track.number}. </span>
                            <span id={track._id}> {track.title} </span>
                            <span> {track.duration} </span>
                            {track.youtube ?
                                <img src={btnImg} onClick={this.handler} alt="btn" className="yt_btn"
                                     id={track.youtube} /> : null}
                            <p className="not_published">{track.published ? '' : 'not published'}</p>
                        </div>
                    }) : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    album: state.music.album,
    tracks: state.music.tracks,
    user: state.users.user

});

const mapDispatchToProps = dispatch => ({
    getTracksByAlbum: (id) => dispatch(getTracksByAlbum(id)),
    getAlbum: (albumId) => dispatch(getAlbum(albumId)),
    saveTrack: (trackId) => dispatch(saveTrack(trackId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackInfo);