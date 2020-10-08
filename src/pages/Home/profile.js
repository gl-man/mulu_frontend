import React from 'react';

const Profile = ({ user }) => (
  <div>
    <h4>Hi! {user.firstname}</h4>
    <h6>Here is your profile</h6>
    <p>
      Full name: {user.firstname} {user.lastname}
    </p>
    <p>Age: {user.age}</p>
    <p>Gender: {user.gender}</p>
    <p>Zip: {user.zipcode}</p>
    <p>Profession: {user.profession}</p>
  </div>
);

export default Profile;
