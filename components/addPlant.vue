<template>
  <div>
  
    <form @submit.prevent="addPlant">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="plant.title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="plant.content" required></textarea>
      </div>
      <div>
        <label for="watering">Dernier arrosage:</label>
        <input type="date" id="watering" v-model="plant.watering" required />
      </div>
      <div>
        <label for="frequency">Dernier arrosage:</label>
        <input type="number" id="frequency" v-model="plant.frequency" required />
      
      </div>
      <div>
        <!-- <label for="image-upload"
          >Select one or more images:</label
        > -->
        <input
          type="file"
          @change="onImageSelected"
          id="image"
          name="image-upload[]"
          accept="image/*"
          multiple
        />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
    <div id="thumbnails"></div>
  </div>
</template>

<script>
import { Plant } from "~/types/plants";

export default {
  data() {
    return {
      plant: {
        title: "",
        content: "",
        watering:null,
        frequency : 0,
        photos: [],
      },
      selectedImages: [],
    };
  },
  mounted() {
    const imageUpload = document.getElementById("image");
    const thumbnailsContainer = document.getElementById("thumbnails");

    imageUpload.addEventListener("change", (event) => {
      const files = event.target.files;
      thumbnailsContainer.innerHTML = "";
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const thumbnail = document.createElement("div");
          thumbnail.classList.add("thumbnail");
          thumbnail.style.backgroundImage = `url(${reader.result})`;
          thumbnailsContainer.appendChild(thumbnail);
        };
      }
    });
  },
  methods: {
    async addPlant() {
      // Call the save method on the Plant class to save the new plant
      await Plant.save(this.$auth, this.plant);
      // Redirect to the plants list page
      this.$router.push("/plants");
    },
    onImageSelected(event) {
      // Add the selected image(s) to the list of images to upload
      this.plant.photos = event.target.files;
      console.log(this.plant.photos);
    },
  },
};
</script>

<style>
#image-upload {
  display: none;
}
label[for="image-upload"] {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
label[for="image-upload"]:hover {
  background-color: #0062cc;
}
#thumbnails {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.thumbnail {
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 1px solid #ccc;
  background-size: cover;
  background-position: center;
}
</style>
