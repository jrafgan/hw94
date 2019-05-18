import React, {Fragment, Component} from 'react';
import {getHistory} from "../store/actions/usersActions";
import connect from "react-redux/es/connect/connect";

class TrackHistory extends Component {

    componentDidMount() {
        this.props.getHistory();
    }

    render() {
        return (
            <Fragment>
                <p>Прослушанные вами трэки</p>
                {this.props.history ? this.props.history.map(item=> {
                    return <div key={item._id} className="history_div">
                        <span>{item.trackTitle}</span>
                        <span>{item.artistName}</span>
                        <span>{new Date(item.datetime).toLocaleString()}</span>
                    </div>
                }) : null}
            </Fragment>
        );
    }

};


const mapStateToProps = state => ({
    history: state.users.history,
});

const mapDispatchToProps = dispatch => ({
    getHistory: () => dispatch(getHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackHistory);