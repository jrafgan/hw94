import React, {Component} from 'react';
import ImageThumbnail from "./ImageThumbnail";
import {Link} from "react-router-dom";
import {getAlbums, getArtists} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";

class AlbumInfo extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getArtist(id);
        this.props.getAlbums(id);
    }

    render() {
        return (
            <div>
                <div className="column">

                    <p className="album_p">Альбомы</p>
                    <div className="one_artist">
                        {this.props.artist ? <div className="one_artist_thumbnail" key={this.props.artist._id}>
                            <div>
                                <ImageThumbnail image={this.props.artist.image} class="small_img_thumbnail"/>
                                <p>{this.props.artist.name}</p>
                            </div>
                            <p>{this.props.artist.description}</p>
                        </div> : null}
                    </div>
                    {this.props.albums ? this.props.albums.map(item => {
                        return <div className="artist_thumbnail" key={item._id}>
                            <ImageThumbnail image={item.image} class="img_thumbnail"/>/>
                            <p className="not_published">{item.published ? '' : 'not published'}</p>
                            <p>{item.title}</p>
                            <p>{item.year}-год</p>
                            <Link to={"/track_info/" + item._id}>Трэки</Link>
                        </div>
                    }) : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    artist: state.music.artist,
    albums: state.music.albums,
});

const mapDispatchToProps = dispatch => ({
    getArtist: (id) => dispatch(getArtists(id)),
    getAlbums: (artistId) => dispatch(getAlbums(artistId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumInfo);