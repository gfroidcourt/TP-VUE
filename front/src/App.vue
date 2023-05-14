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
        type="number"
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

    <!-- Same as above but for the producers -->
    <div
      class="flex flex-col items-center justify-center border border-black rounded-r-md p-4"
    >
      <label for="firstName">Nom du producteur:</label>
      <input
        type="text"
        name="firstName"
        v-model="producer_to_add.firstName"
        class="input w-full max-w-xs border border-black"
      />
      <label for="lastName">Prénom du producteur:</label>
      <input
        type="text"
        name="lastName"
        v-model="producer_to_add.lastName"
        class="input w-full max-w-xs border border-black"
      />
      <label for="nationality">Nationalité</label>
      <input
        type="text"
        name="nationality"
        v-model="producer_to_add.nationality"
        class="input w-full max-w-xs border border-black"
      />
      <label for="birthDate">Date de naissance</label>
      <input
        type="number"
        name="birthDate"
        v-model="producer_to_add.birthDate"
        class="input w-full max-w-xs border border-black"
      />
      <button @click="addProducer" class="btn mt-4">Add</button>
    </div>
    Search : <input type="text" v-model="search" />

    <!-- Add modal -->
    <div
      v-if="showModal"
      class="flex flex-col items-center justify-center border border-black rounded-r-md p-4"
    >
      <h2 class="text-lg font-bold mb-4">Edit Movie</h2>
      <label for="editTitle"> Titre du film </label>
      <input
        type="text"
        id="editTitle"
        v-model="selectedMovie.title"
        class="input w-full max-w-xs border border-black"
      />
      <label for="editReleaseDate"> Année de sortie </label>
      <input
        type="number"
        id="editReleaseDate"
        v-model="selectedMovie.releaseDate"
        class="input w-full max-w-xs border border-black"
      />
      <label for="editSynopsis"> Synopsis </label>
      <textarea
        id="editSynopsis"
        v-model="selectedMovie.synopsis"
        class="input w-full max-w-xs border border-black"
      ></textarea>
      <label for="editGenre"> Genre </label>
      <input
        type="text"
        id="editGenre"
        v-model="selectedMovie.genre"
        class="input w-full max-w-xs border border-black"
      />
      <label for="editProducer"> Producteur </label>
      <select
        id="editProducer"
        class="input w-full max-w-xs border border-black"
        v-model="selectedMovie.producer"
      >
        <option disabled selected>Choose a producer</option>
        <option
          v-for="(producer, index) in producers"
          :key="index"
          :value="producer.id"
        >
          {{ producer.firstName }} {{ producer.lastName }}
        </option>
      </select>
      <button @click="edit" class="btn mt-4">Update</button>
    </div>
    <!-- End of modal -->
    <div class="flex flex-row gap-10">
      <MovieItem
        v-for="movie in movies_search"
        v-bind:key="movie.title"
        v-bind:movie="movie"
        v-bind:producer="movie.producer"
        v-on:edit="showEditModal($event)"
        v-on:remove="remove($event)"
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
      showModal: false,
      selectedMovie: {},
      producer_to_add: {},
    };
  },
  methods: {
    showEditModal(movie) {
      this.showModal = true;
      this.selectedMovie = { ...movie };
    },
    async newMovie() {
      const producerId = document.querySelector("select[name=producer]").value;
      const producer = API.getProducerById(producerId);
      this.movie_to_add.producer = producer;
      this.movie_to_add.producerId = producerId;
      const response = await API.createMovie(this.movie_to_add);
      this.movies.push(response);
    },
    async getMovies() {
      const response = await API.getMovies();
      this.movies = response;
    },
    async getProducers() {
      const response = await API.getProducers();
      this.producers = response;
    },
    async getProducerById(id) {
      const response = await API.getProducerById(id);
      return response;
    },
    async addProducer() {
      const response = await API.createProducer(this.producer_to_add);
      this.producers.push(response);
    },
    edit: async function () {
      const movieToEdit = this.selectedMovie;
      await API.updateMovie(movieToEdit);
      this.showModal = false;
      // Replace the old movie with the new one
      const index = this.movies.findIndex(
        (movie) => movie.id === movieToEdit.id
      );
      this.movies.splice(index, 1, movieToEdit);
    },
    remove: async function (id) {
      await API.deleteMovie(id);
      this.movies = this.movies.splice(id, 1);
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
