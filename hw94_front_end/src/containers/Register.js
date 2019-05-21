import React, {Component} from 'react';
import {registerUser} from "../store/actions/usersActions";
import {connect} from 'react-redux';
import FormElement from "../components/FormElement";

class Register extends Component {
    state = {
        username: '',
        password: '',
        name: '',
        image: ''
    };

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    submitFormHandler = e => {
        e.preventDefault();
        if (this.state.image) {
            const formData = new FormData();
            Object.keys(this.state).forEach(key => {
                if (this.state[key] !== null) {
                    formData.append(key, this.state[key]);
                }
            });
            this.props.registerUser(formData);
        } else {
            this.props.registerUser({...this.state});
        }

    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    fileChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

    render() {
        return (
            <div className="form_div">
                <h2>Register New User</h2>
                {this.props.error && this.props.error.global && (
                    <div>{this.props.error.global}
                    </div>
                )}
                <form className="form" onSubmit={this.submitFormHandler}>

                    <FormElement
                        propertyName="username"
                        title="Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('username')}
                        placeholder="Enter your desired username"
                        autocomplete="new-username"
                    />
                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('password')}
                        placeholder="Enter new secure password"
                        autocomplete="new-password"
                    />
                    <FormElement
                        propertyName="name"
                        title="Display name"
                        type="name"
                        value={this.state.name}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('name')}
                        placeholder="Enter new-name"
                        autocomplete="new-name"
                    />
                    <label htmlFor="image">Изображение</label>
                    <input type="file" name="image" id="image" onChange={this.fileChangeHandler}/>
                    <div>
                        <button type="submit" className="submit_btn">Register</button>
                    </div>
                </form>
            </div>
        )
    };
}

const mapStateToProps = state => ({
    error: state.users.registerError,
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);