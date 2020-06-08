import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './index.css';

@inject(`uiStore`, `dataStore`)
@observer
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: ``,
      gender: `woman`,
      message: ``
    };
  }

  onLogin(e) {
    e.preventDefault();
    this.props.dataStore.login(this.state);
  }

  onValueChange({ field, value }) {
    this.setState({
      ...this.state,
      [field]: value
    });
  }

  render() {

    if (this.props.dataStore.user)
      return ``;

    return (
      <div className={`login`}>
        <div className={`title`}>
          <h1>Introduce Yourself.</h1>
        </div>
        <form className={`login__input`} onSubmit={ (e) => this.onLogin(e) }>
          <p><span>What's your name?</span></p>
          <input maxLength={20} type={`text`} name={`name`} onChange={e => this.onValueChange({ field: `displayName`, value: e.target.value })} required />
          <p><span>What do do you want to talk about <i>(your interests, hobbies...)</i>?</span></p>
          <input maxLength={40} type={`text`} name={`message`} onChange={e => this.onValueChange({ field: `message`, value: e.target.value })} required />
          <div>
            <p><span>What's your gender?</span></p>
            <select onChange={e => this.onValueChange({ field: `gender`, value: e.target.value })}>
              <option value={`woman`}>female</option>
              <option value={`man`}>Male</option>
              <option value={`woman`}>Other</option>
            </select>
          </div>
          <input type={`submit`} value={`Find people near you`} />
        </form>
      </div>
    );
  }
}

export default Login;
