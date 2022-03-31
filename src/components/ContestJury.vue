<template>
  <v-card class="mx-auto mt-4" min-height="300px">
    <v-card-text>
      <p class="text-h5 text--primary">Jury members</p>
      <div class="text--primary">
        <ul>
          <li :key="adminName">
            <a
              target="__blank"
              :href="'https://meta.wikimedia.org/wiki/User:' + adminName"
            >
              {{ adminName }}</a
            >&nbsp;(Admin)
          </li>
          <li v-for="jury in juryNames" :key="jury">
            <a
              target="__blank"
              :href="'https://meta.wikimedia.org/wiki/User:' + jury"
            >
              {{ jury }}
            </a>
          </li>
        </ul>
      </div>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="teal"
            class="mt-4"
            outlined
            small
            v-bind="attrs"
            v-on="on"
          >
            Add jury
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="purple">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-title class="text-h5"> Add jury </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="formValid" lazy-validation>
              <v-text-field
                label="Username"
                v-model="newUsername"
                required
                counter="75"
                :rules="[rules.required, rules.counter]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="jurySubmit"> Add </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import backendApi from "./../api/backendApi";

export default {
  name: "ContestJury",
  props: ["admin", "juries", "contestId"],
  data: function () {
    return {
      dialog: false,
      formValid: false,
      newUsername: "",
      adminName: this.admin,
      juryNames: this.juries,
      contest_id: this.contestId,
      rules: {
        required: (a) => !!a || "Required.",
        counter: (a) => a.length <= 75 || "Max 75 characters",
      },
    };
  },
  methods: {
    jurySubmit() {
      if (this.$refs.form.validate()) {
        backendApi
          .post(
            "/api/addjury",
            {
              contest_id: this.contestId,
              jury_name: this.newUsername,
            },
            {
              crossDomain: true,
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then(({ data }) => {
            if (data.status === "success") {
              this.juryNames.push(this.newUsername);
              this.newUsername = "";
              this.dialog = false;
            } else {
              alert(data.msg);
            }
          })
          .catch((e) => {
            alert("Something went wrong: " + e.response.data.msg);
          });
      }
    },
  },
  watch: {
    admin: function (newVal) {
      this.adminName = newVal;
    },
    juries: function (newVal) {
      this.juryNames = newVal;
    },
    contestId: function (newVal) {
      this.contest_id = newVal;
    },
  },
};
</script>
