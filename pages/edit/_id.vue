<template>
  <div v-if="this.plant">
    <!-- <input :value="this.plant.title.rendered" type="text"></input>
    <input type="text" :value="this.plant.content.rendered"></input>
    <div v-for="img in this.plant.acf.plant_img_repeater" :key="img.ID">
      <div class="edit-img">
      <img :src="img.url" alt="" />
      <button class="delete" @click="deleteImage($route.params.id, img.ID )">X</button>
      </div>
    </div> -->
     <edit-plant :plantArray="plant"/>
  </div>
</template>

<script>
import { Plant } from "~/types/plants";
export default {
  data() {
    return {
      plant: null,
    };
  },
  created() {
   
    this.getPlant(this.$route.params.id);
  },
  methods: {
    async deleteImage(id_plant, imageId) {
        await Plant.deleteImg(this.$auth, id_plant, imageId).then((response)=>{

        })
    },
    async getPlant(id) {
      await Plant.getById(this.$auth, id).then((response) => {
        console.log(response.auth);
        this.plant = response.auth;
        console.log(this.plant.title["rendered"]);
      });
    },
  },
};
</script>
