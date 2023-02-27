<template>
  <div>
    <h1>Ajout de plantes</h1>
    <p>Ajoutez vos plantes en utilisant les champs ci-dessous</p>
    <add-plant />
    <!-- <form @submit.prevent="addPlant">
      <button type="submit">Register</button>
    </form> -->
  </div>
</template>

<script>
import AddPlant from "~/components/addPlant.vue";
import { Plant } from "~/types/plants";

export default {
  data() {
    return {
      plants: [],
    };
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push("/");
    }
  },
  mounted() {
    this.loadPlants();
  },
  methods: {
    async addPlant() {
      await Plant.save(this.$auth, { title: "Ma super plante", content: "mon content" });
    },
    async loadPlants() {
      this.plants = await Plant.getAll(this.$auth);
      console.log(this.plants);
    },
  },
};
</script>
