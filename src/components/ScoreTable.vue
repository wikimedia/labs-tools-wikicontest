<template>
  <v-card class="mx-auto mt-4" min-height="400px">
    <v-card-text>

      <v-row>
        <v-col cols="6">
          <p class="text-h5 text--primary">Score</p>
        </v-col>
        <v-col cols="6">
          <v-btn
              v-if="getUserName"
              color="link"
              class="float-right mr-4"
              :to="'/contest/'+ $route.params.id + '/addsubmission'"
              small
              outlined
          >
            <span>Add submission</span>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div class="text--primary">
        <v-expansion-panels>
          <user-score />
          <user-score />
          <user-score />
        </v-expansion-panels>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import UserScore from "./UserScore.vue";
import {mapGetters} from "vuex";

export default {
  name: "ScoreTable",
  data: function () {
    return {
      pointTable: [],
    };
  },
  computed: {
    ...mapGetters(["getUserName"]),
  },
  components: {
    "user-score": UserScore,
  },
};
</script>
