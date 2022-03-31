<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-icon color="amber" x-large class="mr-5 ml-3">
        mdi-pencil-plus-outline
      </v-icon>

      <v-toolbar-title size="large">Wiki Contest</v-toolbar-title>

      <v-btn href="#" text plain :ripple="false" to="/">
        <span class="mr-2">Home</span>
      </v-btn>

      <v-btn href="#" text plain :ripple="false" to="/contests">
        <span class="mr-2">Contests</span>
      </v-btn>

      <v-btn href="#" text plain :ripple="false" to="/about">
        <span class="mr-2">About</span>
      </v-btn>

      <v-spacer></v-spacer>

      <div v-if="getUserName">
        <v-btn
            href="https://github.com/vuetifyjs/vuetify/releases/latest"
            target="_blank"
            text
            color="link"
        >
          <span class="mr-2">{{ getUserName }}, Logout</span>
          <v-icon color="red">mdi-login</v-icon>
        </v-btn>
      </div>

      <div v-else>
        <v-btn
            href="https://github.com/vuetifyjs/vuetify/releases/latest"
            target="_blank"
            text
            color="link"
        >
          <span class="mr-2">Login</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view/>
      </v-container>
      <v-overlay :value="isLoading">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["getUserName", "isLoading"]),
  },
  methods: {
    ...mapActions(["getUserDetails"]),
  },
  created: function () {
    this.getUserDetails();
  },
};
</script>
