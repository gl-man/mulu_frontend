import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '_services';

const LoginPage = ({ location, history }) => {
  const [credential, setCredential] = useState({
    firstname: '',
    lastname: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    // stop here if form is invalid
    if (!(credential.firstname && credential.lastname)) {
      return;
    }

    setLoading(true);
    userService.login(credential.firstname, credential.lastname).then(
      (user) => {
        const { from } = location.state || {
          from: { pathname: '/home' },
        };
        history.push(from);
      },
      (error) => {
        setLoading(false);
        setErrorMsg(error);
      }
    );
  };

  return (
    <div className="col-md-6 col-md-offset-3">
      <p>
        <Link to="/">Back to Landing Page</Link>
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}>
        <div className="alert alert-info m-2">
          First Name: Daniel
          <br />
          Last Name: Neil
        </div>
        <div style={{ borderLeft: '2px solid grey' }}></div>
        <div className="alert alert-info m-2">
          First Name: John
          <br />
          Last Name: Doe
        </div>
      </div>
      <h2>Login</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className={'form-group' + (submitted && !credential.firstname ? ' has-error' : '')}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            value={credential.firstname}
            onChange={handleChange}
          />
          {submitted && !credential.firstname && (
            <div className="help-block">First name is required</div>
          )}
        </div>
        <div className={'form-group' + (submitted && !credential.lastname ? ' has-error' : '')}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            value={credential.lastname}
            onChange={handleChange}
          />
          {submitted && !credential.lastname && (
            <div className="help-block">Last name is required</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary" disabled={loading}>
            <span>Login</span>
            {loading && (
              <span style={{ paddingLeft: 8 }}>
                <img
                  alt="loading"
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                />
              </span>
            )}
          </button>
        </div>
        {errorMsg && <div className={'alert alert-danger'}>{errorMsg}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
