import axios from 'axios';

// function that take in a token
const setAuthToken = token => {
// check to see if there is a token in local storage 
  if (token) {
    //   if there is a token, add set it to what is passed in
    axios.defaults.headers.common['x-auth-token'] = token;
  // if what is passed in is not a token, delete it from the headers
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;