<template>
  <v-expansion-panel class="mt-2 elevation-0">
    <v-expansion-panel-header>
      <v-row no-gutters>
        <v-col cols="8"> User </v-col>
        <v-col cols="4" class="text--secondary">
          <v-row no-gutters style="width: 100%">
            <v-col cols="6"> Total submit: 27 </v-col>
            <v-col cols="6"> Total points: 207 </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left" width="50%">Page</th>
              <th class="text-left">Point</th>
              <th class="text-left">Submmited on</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
              <td>{{ new Date().toUTCString() }}</td>
              <td>
                <view-submission />
                <v-btn class="ml-1" color="cyan" outlined small>Assessment</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import ViewSubmission from "./ViewSubmission.vue";

export default {
  name: "UserScore",
  data: function () {
    return {
      open: [],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
    };
  },
  components: {
    "view-submission": ViewSubmission,
  },
};
</script>