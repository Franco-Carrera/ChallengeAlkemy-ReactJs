import axios from "axios";

axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: "141857151526362",
};

const baseUrl = "https://superheroapi.com/api/141857151526362";

export const searchHero = async (name) => {
  try {
    const result = await axios.get(`${baseUrl}/search/${name}`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (email, password) => {
  try {
    const res = await axios.post(`http://challenge-react.alkemy.org/`, {
      email,
      password,
    });
    let data = {
      status: res.status,
      message: res.data,
    };
    return data;
  } catch (err) {
    let data = {
      status: err.result.status,
      message: err.result.data,
    };
    return data;
  }
};

//result o response
