<template>
  <div v-if="this.plant">
    <div class="container-plant">
      <div class="container-plant__gallery">
        <carousel v-bind="options">
          <slide
            v-for="img in this.plant.acf.plant_img_repeater"
            :key="img.ID"
            class="img-wrapper"
          >
            <img class="container-plant__img" :src="img.url" alt="" />
          </slide>
        </carousel>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#f3f4f5"
            fill-opacity="1"
            d="M0,96L120,96C240,96,480,96,720,85.3C960,75,1200,53,1320,42.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div class="container-plant__content">
        <div class="container-plant__title">
          <h1 v-html="this.plant.title.rendered"></h1>
        </div>
        <div class="container-flex__water">
          <div class="container-plant__water">
            <svg
              id="container-plant__water-icon"
              width="44"
              height="54"
              viewBox="0 0 44 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.9998 0.333313C7.7865 12.4666 0.666504 22.9466 0.666504 31.8C0.666504 45.08 10.7998 53.6666 21.9998 53.6666C33.1998 53.6666 43.3332 45.08 43.3332 31.8C43.3332 22.9466 36.2132 12.4666 21.9998 0.333313ZM21.9998 48.3333C13.0665 48.3333 5.99984 41.48 5.99984 31.8C5.99984 25.56 11.1998 17.2933 21.9998 7.42665C32.7998 17.2933 37.9998 25.5333 37.9998 31.8C37.9998 41.48 30.9332 48.3333 21.9998 48.3333ZM10.8798 32.3333C11.8665 32.3333 12.6665 33.0266 12.8532 33.9866C13.9465 39.9066 18.9332 41.9333 22.5598 41.64C23.7065 41.5866 24.6665 42.4933 24.6665 43.64C24.6665 44.7066 23.8132 45.5866 22.7465 45.64C17.0665 45.9866 10.4265 42.7333 8.9065 34.6533C8.86016 34.3674 8.87647 34.0748 8.9543 33.7959C9.03214 33.5169 9.16963 33.2581 9.35729 33.0375C9.54495 32.8169 9.77828 32.6397 10.0412 32.5181C10.304 32.3965 10.5902 32.3334 10.8798 32.3333Z"
                fill="#D5DAD4"
              />
            </svg>
            <p id="container-plant__water-content">
              Arrosage dans : <br />
              <span> {{ this.plant.watering.dayDifference }} jours </span>
            </p>
            <svg
              id="container-plant__water-blob"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#D0E2FF"
                d="M60.7,-22.8C68,2.7,55.8,31.3,34.8,46.3C13.7,61.2,-16.2,62.3,-35.2,48.5C-54.2,34.7,-62.2,5.9,-54.6,-20.1C-46.9,-46.2,-23.4,-69.6,1.6,-70.1C26.7,-70.6,53.4,-48.3,60.7,-22.8Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <div class="container-plant__calendar">
            <p id="container-plant__water-content">
             
              <button @click="isWatering = !isWatering"> J'ai arrosé ! </button>
              
            </p>
          </div>
        </div>
        <div class="container-plant__description">
          <h3>Description</h3>
          <div v-html="this.plant.content.rendered"></div>
        </div>
        <div class="container-plant__historique">
          <h3>Historique</h3>
          <div v-for="historique in this.plant.acf.historique" :key="historique.ID">
            <div class="card-historique">
              <div class="card-historique__img">
                <div class="card-historique__img-border">
                  <svg
                    width="54"
                    height="46"
                    viewBox="0 0 54 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M44.0057 9.25334C42.0324 11.2 41.5258 14 42.4591 16.4L34.6724 24.1867V18.6667C34.6724 17.2 33.4724 16 32.0058 16H29.2591C29.3391 15.5467 29.3391 15.12 29.3391 14.6667C29.3391 6.56001 22.7791 6.44993e-06 14.6724 6.44993e-06C11.6516 -0.0028266 8.70366 0.927689 6.23188 2.66426C3.76009 4.40084 1.88519 6.85866 0.863627 9.70152C-0.157933 12.5444 -0.27625 15.6334 0.524859 18.5461C1.32597 21.4587 3.00738 24.0528 5.33908 25.9733V42.6667C5.33908 44.1333 6.53908 45.3333 8.00575 45.3333H32.0058C33.4724 45.3333 34.6724 44.1333 34.6724 42.6667V31.7067L46.2191 20.16C48.6191 21.0933 51.4191 20.6133 53.3391 18.6667L44.0057 9.25334ZM5.47242 16C5.41908 15.5467 5.33908 15.12 5.33908 14.6667C5.33908 9.52001 9.52575 5.33334 14.6724 5.33334C19.8191 5.33334 24.0058 9.52001 24.0058 14.6667C24.0058 15.12 23.9258 15.5467 23.8724 16H5.47242Z"
                      fill="#F8F8F8"
                    />
                  </svg>
                </div>
              </div>
              <div class="card-historique__content">
                <p>{{ historique.date_historique }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="edit-plant">
      <NuxtLink :to="`/edit/${this.$route.params.id}`">
        <svg
          width="49"
          height="49"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43.4667 16.8L32.1333 5.59998L35.8667 1.86665C36.8889 0.844424 38.1449 0.333313 39.6347 0.333313C41.1244 0.333313 42.3796 0.844424 43.4 1.86665L47.1333 5.59998C48.1556 6.6222 48.6889 7.85598 48.7333 9.30131C48.7778 10.7466 48.2889 11.9795 47.2667 13L43.4667 16.8ZM39.6 20.7333L11.3333 49H0V37.6666L28.2667 9.39998L39.6 20.7333Z"
            fill="#F8F8F8"
          />
        </svg>
      </NuxtLink>
    </div>
    <div v-if="isWatering">
    <update-water/>

    </div>
  </div>
</template>

<script>
import { Plant } from "~/types/plants";
export default {
  data() {
    return {
      isWatering : false,
      plant: null,
      options: {
        loop: true,
        perPage: 1,
        paginationEnabled: false,
      },
    };
  },
  created() {
    this.getPlant(this.$route.params.id);
  },
  methods: {
    async getPlant(id) {
      await Plant.getById(this.$auth, id).then((response) => {
        console.log(response.auth);
        this.plant = response.auth;
        this.plant.watering = this.getDate(
          this.plant.acf.last_arrosage,
          this.plant.acf.frequency_arrosage
        );
      });
    },
    getDate(last, frequency) {
      console.log(last);
      console.log(frequency);
      const [day, month, year] = last.split("/");
      const date = new Date(`${year}-${month}-${day}`);
      console.log(date);

      date.setDate(date.getDate() + parseInt(frequency));
      console.log(date);

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
