<template>
  <div class="pop-up water-update">
    <div class="pop-up__content">
      <h3>Voulez vous valider ?</h3>

      <h4>Date de l'arrosage</h4>
      <input type="date" v-model="plant.calendar" name="" id="" />

      <div class="btn-flex">
        <button class="remove">Annuler</button>
        <button class="update" @click="updatePlant()">Valider</button>
      </div>
    </div>
  </div>
</template>


<script>
import { Plant } from "~/types/plants";
export default {
  data() {
    return {
              
      plant:{
        calendar : null,
      },
      
    };
  },
 
  methods: {
    async updatePlant() {
      await Plant.updateWatering(this.$auth, this.$route.params.id, this.plant.calendar ).then((response) => {
        
      });
    },
    
  },
};
</script>
