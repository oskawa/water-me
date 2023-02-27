<template>
  <div>
    <ul class="listing-single__ul" v-for="plant in plants" :key="plant.id">
      <NuxtLink :to="`/plant/${plant.auth.id}`">
        <li>
          <div class="listing-single">
            <div class="listing-single__image">
              <img
                v-if="plant.auth.acf.plant_img_repeater[0]"
                :src="plant.auth.acf.plant_img_repeater[0].sizes.thumbnail"
                alt=""
              />
            </div>
            <div class="listing-single__content">
              <h4 v-html="plant.auth.acf.title"></h4>
              <p v-if="plant.auth.watering">Prochain arrosage : {{plant.auth.watering.waterDate}}</p>
            </div>
          </div>
        </li></NuxtLink
      >
    </ul>
  </div>
</template>

<script>
import { Plant } from "~/types/plants";

export default {
  data() {
    return {
      plants: [],
    };
  },

  mounted() {
    this.loadPlants();
  },
  methods: {
    async loadPlants() {
      console.log(this.$auth.strategy.token.get());
      this.plants = JSON.parse(JSON.stringify(await Plant.getAll(this.$auth)));

      this.plants.forEach((plant) => {
        if (plant.auth.acf.last_arrosage) {
          plant.auth.watering = this.getDate(
            plant.auth.acf.last_arrosage,
            plant.auth.acf.frequency_arrosage
          );
        }
      });
      console.log(this.plants[0].auth.watering)
    },
    getDate(last, frequency) {
      const [day, month, year] = last.split("/");
      const date = new Date(`${year}-${month}-${day}`);

      date.setDate(date.getDate() + parseInt(frequency));

      const today = new Date();
      const timeDifference = date.getTime() - today.getTime();
      const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      const newDateString = `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
      return { waterDate: newDateString, dayDifference: dayDifference };
    },
  },
};
</script>
