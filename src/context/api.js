import axios from "axios";

const baseURL = "https://superheroapi.com/api/141857151526362/";

async function getHeroes(byName) {
  try {
    const result = await axios.get(`${baseURL}/search/${byName}`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default getHeroes;
