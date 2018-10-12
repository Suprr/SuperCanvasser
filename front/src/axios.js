import axios from "axios";

const instance = axios.create({
  baseURL: "https://cse308-de3df.firebaseio.com/"
});

export default instance;
