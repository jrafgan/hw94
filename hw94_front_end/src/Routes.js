import React, {Fragment} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Main from "./containers/Main";
import AddArtist from "./containers/AddArtist";
import AddAlbum from "./containers/AddAlbum";
import AlbumInfo from "./components/AlbumInfo";
import TrackInfo from "./components/TrackInfo";
import TrackHistory from "./containers/TrackHistory";
import AddTrack from "./containers/AddTrack";
import AdminBackOffice from "./components/AdminBackOffice";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/login"/>
};

const Routes = ({user}) => {
    return (
        <Fragment>
            <Switch>
                <Route path="/" exact component={Main} />
                <ProtectedRoute
                    isAllowed={user && user.role === 'admin'}
                    path="/admin_office/"
                    exact
                    component={AdminBackOffice}
                />
                <Route path="/add_artist" exact component={AddArtist} />
                <Route path="/add_album" exact component={AddAlbum} />
                <Route path="/add_track" exact component={AddTrack} />
                <Route path="/track_history/" exact component={TrackHistory} />
                <Route path="/album_info/:id" exact component={AlbumInfo} />
                <Route path="/track_info/:id" exact component={TrackInfo} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Fragment>
    );
};

export default Routes;