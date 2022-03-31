<template>
  <v-card class="mx-auto">
    <v-card-text>
      <p class="text-h5 text--primary">Basic information</p>
      <div class="text--primary">
        <div class="mt-2">
          <span class="font-weight-bold">Name: </span>
          <span>{{ contest.name }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Description: </span>
          <span>{{ contest.description }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Language: </span>
          <span>{{ contest.language }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Project: </span>
          <span>{{ contest.project }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Start date: </span>
          <span>{{ contest.start_date }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">End date: </span>
          <span>{{ contest.end_date }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ContestBasicInfo",
  props: ["contestDetails"],
  data: function () {
    return {
      contest: this.contestDetails,
    };
  },
  watch: {
    contestDetails: function (newVal) {
      this.contest = newVal;
    },
  },
};
</script>
