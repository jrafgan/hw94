import axios from '../../axios-api';
import {push} from "connected-react-router";

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKSBYARTIST_SUCCESS = 'FETCH_TRACKSBYARTIST_SUCCESS';
export const FETCH_TRACKSBYALBUM_SUCCESS = 'FETCH_TRACKSBYALBUM_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const fetchArtistSuccess = artist => ({type: FETCH_ARTIST_SUCCESS, artist});
export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const fetchAlbumSuccess = album => ({type: FETCH_ALBUM_SUCCESS, album});
export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});
export const fetchTracksByArtistSuccess = tracks => ({type: FETCH_TRACKSBYARTIST_SUCCESS, tracks});
export const fetchTracksByAlbumSuccess = tracks => ({type: FETCH_TRACKSBYALBUM_SUCCESS, tracks});
export const fetchFailure = error => ({type: FETCH_FAILURE, error});

export const getArtists = id => {
    return dispatch => {
        let path = '/artists';

        if (id) {
            path += '?id=' + id;
        }
        return axios.get(path).then(
            response => {

                if (!id) {
                    dispatch(fetchArtistsSuccess(response.data));
                } else {
                    dispatch(fetchArtistSuccess(response.data));
                }
            });
    };
};
export const getAlbums = artistId => {
    return dispatch => {
        let path = '/albums';

        if (artistId) {
            path += '?artist=' + artistId;
        }
        return axios.get(path).then(
            response => {
                dispatch(fetchAlbumsSuccess(response.data));
            });
    };
};

export const getAlbum = id => {
    return dispatch => {
        return axios.get('/albums/' + id).then(
            response => {
                dispatch(fetchAlbumSuccess(response.data));

            });
    };
};

export const getTracks = () => {
    return dispatch => {
        return axios.get('/tracks').then(
            response => {
                dispatch(fetchTracksSuccess(response.data));
            });
    };
};
export const getTracksByAlbum = albumId => {
    return dispatch => {
        return axios.get('/tracks?album=' + albumId).then(
            response => {
                dispatch(fetchTracksSuccess(response.data));
            });
    };
};

export const createArtist = artistData => {
    return dispatch => {
        return axios.post('/artists', artistData).then(
            response => {
                dispatch(push('/'))
            },
            error => {
                if (error.response) {
                    dispatch(fetchFailure(error.response.data));
                } else {
                    dispatch(fetchFailure({global: "No network connection "}))
                }
            });
    };
};

export const createAlbum = albumData => {
    return dispatch => {

        return axios.post('/albums', albumData).then(
            response => {
                dispatch(push('/'));
            },
            error => {
                if (error.response) {
                    dispatch(fetchFailure(error.response.data));
                } else {
                    dispatch(fetchFailure({global: "No network connection "}))
                }
            });
    };
};

export const createTrack = albumData => {
    return dispatch => {
        return axios.post('/tracks', albumData).then(
            response => {
                dispatch(push('/'));
            },
            error => {
                if (error.response) {
                    dispatch(fetchFailure(error.response.data));
                } else {
                    dispatch(fetchFailure({global: "No network connection "}))
                }
            });
    };
};

export const deleteTrack = id => {
    return dispatch => {
        return axios.delete('/tracks?id=' + id).then(
            response => {
                dispatch(fetchTracksSuccess(response.data));
            });
    };
};

export const deleteArtist = id => {
    return dispatch => {
        return axios.delete('/artists?id=' + id).then(
            response => {
                dispatch(fetchArtistsSuccess(response.data));
            });
    };
};

export const deleteAlbum = id => {
    return dispatch => {
        return axios.delete('/albums?id=' + id).then(
            response => {
                dispatch(fetchAlbumsSuccess(response.data));
            });
    };
};

export const toggleTrackPublish = id => {
    return dispatch => {
        return axios.post('/tracks/' + id + '/toggle_published').then(
            response => {
                dispatch(fetchTracksSuccess(response.data));
            });
    };
};

export const toggleAlbumPublish = id => {
    return dispatch => {
        return axios.post('/albums/' + id + '/toggle_published').then(
            response => {
                dispatch(fetchAlbumsSuccess(response.data));
            });
    };
};

export const toggleArtistPublish = id => {
    return dispatch => {
        return axios.post('/artists/' + id + '/toggle_published').then(
            response => {
                dispatch(fetchArtistsSuccess(response.data));
            });
    };
};

