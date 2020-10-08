import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ authUser }) => (
  <div className="col-md-6 col-md-offset-3">
    <p>
      <Link to="/login">Login</Link>
    </p>
    <h1>Mulu/AnswerBite: Engineering Test</h1>
  </div>
);

export default HomePage;
