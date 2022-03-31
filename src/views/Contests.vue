<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-sheet min-height="80vh" rounded="lg" class="pa-4">
        <p class="text-h5">Contests</p>

        <v-btn
          v-if="getUserName"
          color="link"
          class="float-right mr-4"
          to="/contest/create"
          outlined
        >
          <span>Create contest</span>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <br />
        <br />
        <v-data-table
          :headers="headers"
          :items="contests"
          :items-per-page="10"
          class="elevation-1"
        >
          <template #[`item.name`]="{ item }">
            <router-link
              :to="'/contest/' + item.id"
              style="text-decoration: none;"
            >
              {{ item.name }}
            </router-link>
          </template>
          <template #[`item.start_date`]="{ item }">
            {{ item.start_date.slice(0,-13) }}
          </template>
        </v-data-table>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import backendApi from "./../api/backendApi";

export default {
  name: "Contests",
  data: function () {
    return {
      contests: [],
      headers: [
        { text: "Name", value: "name", width: "50%" },
        { text: "Start date", value: "start_date" },
        { text: "Created by", value: "created_by" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getUserName"]),
  },
  created: function () {
    backendApi
      .get("/api/contests")
      .then(({ data }) => {
        if (data.status === "success") {
          this.contests = data.contests;
        }
      })
      .catch(() => alert("Something went wrong while fetching contests."));
  },
};
</script>
