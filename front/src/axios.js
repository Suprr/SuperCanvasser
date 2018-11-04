import axios from "axios";

const instance = axios.create({
  //baseURL: "https://cse308-de3df.firebaseio.com"
  baseURL : "http://localhost:3000"
  
});

export default instance;
