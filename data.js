const axios =  require('axios');
const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

const data = axios.get(url).then((response) => {
  console.log(response.data);
});

export default data;
