<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-sheet min-height="80vh" rounded="lg" className="pa-4">
        <p>{{ getUserName }}</p>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "Home",
  computed: mapGetters(['getUserName']),
  components: {},
};
</script>
