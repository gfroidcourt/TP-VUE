<template>
  <div class="card bg-base-100 shadow-xl mb-5 max-w-sm">
    <figure class="px-10 pt-10">
      <img src="../assets/sartek.jpg" alt="Sartek" class="rounded-sm w-96" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ movie.title }} ({{ movie.releaseDate }})</h2>
      <!-- <h3>
        Réalisé par {{ movie.produceur.firstName }}
        {{ movie.produceur.lastName }}, de nationalité
        {{ movie.produceur.nationality }} et né le
        {{ movie.produceur.birthdate }}.
      </h3> -->
      <h3>
        <b>Genre du film: {{ movie.genre }}</b>
      </h3>
      <p>{{ movie.synopsis }}</p>
      <div class="card-actions">
        <button @click="edit" class="btn btn-primary">Edit</button>
        <button @click="remove" class="btn btn-secondary">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    movie: Object,
  },
  methods: {
    edit() {
      this.$emit("edit", this.movie);
    },
    remove() {
      this.$emit("remove", this.movie.id);
    },
  },
};
</script>
