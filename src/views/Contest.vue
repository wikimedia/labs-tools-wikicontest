<template>
  <v-row justify="center">
    <v-col cols="12">
      <contest-basicinfo v-if="contest" :contestDetails="contest"/>
      <v-row>
        <v-col cols="6">
          <contest-jury
              v-if="juries !== []"
              :admin="contest.created_by"
              :contestId="contest.id"
              :juries="juries"
          />
        </v-col>
        <v-col cols="6">
          <contest-rule v-if="rules" :rule="rules" />
        </v-col>
      </v-row>
      <score-table/>
    </v-col>
  </v-row>
</template>

<script>
import backendApi from "./../api/backendApi";
import ContestBasicInfo from "./../components/ContestBasicInfo.vue";
import ContestJury from "./../components/ContestJury.vue";
import ContestRule from "./../components/ContestRule.vue";
import ScoreTable from "../components/ScoreTable.vue";

export default {
  name: "Contest",
  data: function () {
    return {
      contest: {},
      juries: [],
      rules: null
    };
  },
  components: {
    "contest-basicinfo": ContestBasicInfo,
    "contest-rule": ContestRule,
    "contest-jury": ContestJury,
    "score-table": ScoreTable,
  },
  created: function () {
    backendApi
        .get("/api/contest/" + this.$route.params.id)
        .then(({data}) => {
          if (data.status === "success") {
            this.contest = data.contest;
            this.rules = data.rules;
            data.juries.forEach((item) => {
              this.juries.push(item.username);
            });
          }
        })
        .catch(() => alert("Something went wrong while fetching contest."));
  },
};
</script>
