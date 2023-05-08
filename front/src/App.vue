<template>
  <div class="mt-4 flex flex-col items-center">
    <div
      class="flex flex-col items-center justify-center border border-black rounded-r-md p-4"
    >
      <label for="title"> Titre du film </label>
      <input
        type="text"
        name="title"
        v-model="movie_to_add.title"
        class="input w-full max-w-xs border border-black"
      />
      <label for="releaseDate"> Année de sortie </label>
      <input
        type="date"
        name="releaseDate"
        v-model="movie_to_add.releaseDate"
        class="input w-full max-w-xs border border-black"
      />
      <label for="synopsis"> Synopsis </label>
      <textarea
        name="synopsis"
        v-model="movie_to_add.synopsis"
        class="input w-full max-w-xs border border-black"
      ></textarea>
      <label for="genre"> Genre </label>
      <input
        type="text"
        name="genre"
        v-model="movie_to_add.genre"
        class="input w-full max-w-xs border border-black"
      />
      <label for="producer"> Producteur </label>
      <select name="producer" class="input w-full max-w-xs border border-black">
        <option value="" disabled selected>Choose a producer</option>
        <!-- Get the id of the selected producer and store it into movie_to_add.producer -->
        <option
          v-for="(producer, index) in producers"
          :key="index"
          :value="producer.id"
        >
          {{ producer.firstName }} {{ producer.lastName }}
        </option>
      </select>
      <button @click="newMovie" class="btn mt-4">Add</button>
    </div>
    Search : <input type="text" v-model="search" />

    <div class="flex flex-row gap-10">
      <MovieItem
        v-for="(movie, index) in movies_search"
        v-bind:key="movie.title"
        v-bind:movie="movie"
        v-on:edit="edit"
        v-on:remove="remove(index)"
      />
    </div>
  </div>
</template>

<script>
import MovieItem from "./components/MovieItem.vue";
import API from "./services/Api";
export default {
  components: {
    MovieItem,
  },
  data() {
    return {
      search: "",
      movie_to_add: {},
      movies: [],
      producers: {},
    };
  },
  methods: {
    async newMovie() {
      const producerId = document.querySelector("select[name=producer]").value;
      const producer = API.getProducerById(producerId);
      this.movie_to_add.releaseDate = new Date(this.movie_to_add.releaseDate)
        .toISOString()
        .slice(0, 10);
      this.movie_to_add.producer = producer;
      const response = await API.createMovie(this.movie_to_add);
      this.movies.push(response);
    },
    async getMovies() {
      const response = await API.getMovies();
      this.movies = response;
    },
    async getProducers() {
      const response = await API.getProducers();
      // Get the id of the producer
      this.producers = response;
    },
    edit: async function (movie) {
      await API.updateMovie(movie);
    },
    remove: async function (id) {
      await API.deleteMovie(id);
      this.movies.splice(id, 1);
    },
  },
  computed: {
    movies_search: function () {
      const searchTerm = this.search.toLowerCase();
      return this.movies?.filter(
        (movie) =>
          [
            movie.title,
            movie.synopsis,
            // movie.producer.firstName,
            // movie.producer.lastName,
            movie.genre,
          ].some((field) => field.toLowerCase().includes(searchTerm)) ||
          movie.releaseDate.toString().includes(searchTerm)
      );
    },
  },
  mounted() {
    this.getMovies();
    this.getProducers();
  },
};
</script>

<style scoped>
input,
textarea {
  border: 1px solid black;
}
</style>
