import axios from "axios";

export const searchHero = async (name) => {
  try {
    const result = await axios.get(`http://localhost:5000/${name}`);
    return result;
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
    let data = res.data.token;
    return data;
  } catch (err) {
    let data = err.result.data;
    console.log(err.result.data);
    return data;
  }
};
