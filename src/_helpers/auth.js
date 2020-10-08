function get() {
  // return authorization header with basic auth credentials
  let authToken = localStorage.getItem('accessToken');
  let data;
  try {
    data = JSON.parse(window.atob(authToken));
  } catch (error) {}

  if (authToken) {
    return { token: 'Custom ' + authToken, data };
  } else {
    return {};
  }
}

function set(user) {
  const authToken = window.btoa(
    JSON.stringify({ firstname: user.firstname, lastname: user.lastname })
  );
  localStorage.setItem('accessToken', authToken);
}

function remove() {
  localStorage.removeItem('accessToken');
}

export default {
  get,
  set,
  remove,
};
