const API_BASE_URL = `http://localhost:3000`;

const headers = {
  "Content-Type": "application/json",
};

const getMovies = async () => {
  const response = await fetch(`${API_BASE_URL}/movies`, {
    method: "GET",
    headers: headers,
  });
  return response.json();
};

const getMovieById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
    method: "GET",
    headers: headers,
  });
  return response.json();
};

const createMovie = async (movie) => {
  const response = await fetch(`${API_BASE_URL}/movies`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(movie),
  });
  return response.json();
};

const updateMovie = async (movie) => {
  const response = await fetch(`${API_BASE_URL}/movies/${movie.id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(movie),
  });
  return response.json();
};

const deleteMovie = async (id) => {
  const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  return response.json();
};

const getProducers = async () => {
  const response = await fetch(`${API_BASE_URL}/producers`, {
    method: "GET",
    headers: headers,
  });
  return response.json();
};

const getProducerById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/producers/${id}`, {
    method: "GET",
    headers: headers,
  });
  return response.json();
};

const createProducer = async (producer) => {
  const response = await fetch(`${API_BASE_URL}/producers`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(producer),
  });
  return response.json();
};

const updateProducer = async (producer) => {
  const response = await fetch(`${API_BASE_URL}/producers/${producer.id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(producer),
  });
  return response.json();
};

const deleteProducer = async (id) => {
  const response = await fetch(`${API_BASE_URL}/producers/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  return response.json();
};

const API = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getProducers,
  getProducerById,
  createProducer,
  updateProducer,
  deleteProducer,
};

export default API;
