import axios from '../../axios-api';

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKSBYARTIST_SUCCESS = 'FETCH_TRACKSBYARTIST_SUCCESS';
export const FETCH_TRACKSBYALBUM_SUCCESS = 'FETCH_TRACKSBYALBUM_SUCCESS';

export const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const fetchArtistSuccess = artist => ({type: FETCH_ARTIST_SUCCESS, artist});
export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const fetchAlbumSuccess = album => ({type: FETCH_ALBUM_SUCCESS, album});
export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});
export const fetchTracksByArtistSuccess = tracks => ({type: FETCH_TRACKSBYARTIST_SUCCESS, tracks});
export const fetchTracksByAlbumSuccess = tracks => ({type: FETCH_TRACKSBYALBUM_SUCCESS, tracks});

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
                console.log(response.data);
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
                console.log(response.data);
            });
    };
};

export const createArtist = artistData => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.post('/artists', artistData, config).then(
            response => {
                console.log(response.data);
            });
    };
};

export const createAlbum = albumData => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.post('/albums', albumData, config).then(
            response => {
                console.log(response.data);
            });
    };
};

export const createTrack = albumData => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.post('/tracks', albumData, config).then(
            response => {
                console.log(response.data);
            });
    };
};

export const deleteTrack = id => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.delete('/tracks?id=' + id, config).then(
            response => {
                console.log(response.data);
            });
    };
};

export const deleteArtist = id => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.delete('/artists?id=' + id, config).then(
            response => {
                console.log(response.data);
            });
    };
};

export const deleteAlbum = id => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.delete('/albums?id=' + id, config).then(
            response => {
                console.log(response.data);
            });
    };
};

export const toggleTrackPublish = id => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.post('/tracks/' + id + '/toggle_published', config).then(
            response => {
                console.log(response.data);
            });
    };
};

export const toggleAlbumPublish = id => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.post('/albums/' + id + '/toggle_published', config).then(
            response => {
                console.log(response.data);
            });
    };
};

export const toggleArtistPublish = id => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.post('/artists/' + id + '/toggle_published', config).then(
            response => {
                console.log(response.data);
            });
    };
};

