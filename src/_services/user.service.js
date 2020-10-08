import { auth } from '_helpers';
import api from './base_api';

function login(firstname, lastname) {
  return api.post('/get_current_agent', { firstname, lastname }).then((user) => {
    // login successful if there's a user in the response
    // store user details and basic auth credentials in local storage
    // to keep user logged in between page refreshes
    auth.set(user);

    return user;
  });
}

function logout() {
  // remove user from local storage to log user out
  auth.remove();
}

function getCurrentUser() {
  const { firstname, lastname } = auth.get().data;
  return api.post('/get_current_agent', { firstname, lastname });
}

function getAllAgent() {
  return api.post('/get_all_agent');
}

function getAllContacts() {
  return api.post('/get_all_contact');
}

function getNearByContacts(agent) {
  return api.post('/get_nearby_contact', agent);
}

export default {
  login,
  logout,
  getCurrentUser,
  getAllAgent,
  getAllContacts,
  getNearByContacts,
};
