<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-sheet min-height="80vh" rounded="lg" class="pa-4">
        <div v-if="getUserName">
          <v-col cols="6">
            <p class="text-h5">Create contest</p>
            <v-form ref="form" v-model="formValid" lazy-validation>
              <v-text-field
                  label="Name"
                  placeholder="Enter contest name"
                  v-model="name"
                  required
                  counter="120"
                  :rules="[rules.required, rules.counter]"
              ></v-text-field>
              <br/>
              <v-textarea
                  clearable
                  outlined
                  label="Description"
                  placeholder="Enter contest description"
                  v-model="description"
                  :auto-grow="true"
                  rows="8"
                  :rules="[rules.required]"
              ></v-textarea>
              <br/>
              <v-select
                  :items="projects"
                  label="Project"
                  v-model="selectedProject"
              ></v-select>
              <v-text-field
                  label="Language"
                  placeholder="Enter language code"
                  v-model="langCode"
                  required
                  counter="3"
                  :rules="[rules.required, rules.langCounter]"
              ></v-text-field>
              <br/>
              <span>Contest start date <small>(UTC)</small>: </span>
              <datetime
                  style="border: 1px grey solid; display: inline-block"
                  type="datetime"
                  v-model="startDate"
              ></datetime>
              <br/>
              <br/>
              <span>Contest end date <small>(UTC)</small>: </span>
              <datetime
                  style="border: 1px grey solid; display: inline-block"
                  type="datetime"
                  v-model="endDate"
                  zone="UTC"
              ></datetime>
              <br/>
              <br/>
              <v-btn color="primary" :loading="submitted" @click="formSubmit"
              >Create
              </v-btn
              >
            </v-form>
          </v-col>
        </div>
        <div v-else>
          <p class="red--text">
            You are not logged in. Creating new contest is allowed for only
            logged in users.
          </p>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from "vuex";
import backendApi from "./../api/backendApi";

export default {
  name: "ContestCreate",
  data: () => {
    return {
      submitted: false,
      formValid: false,
      name: "",
      description: "",
      projects: [
        {text: "Wikipedia", value: "wikipedia"},
        {text: "Wikibooks", value: "wikibooks"},
        {text: "Wikiversity", value: "wikiversity"},
        {text: "Wikiquote", value: "wikiquote"},
        {text: "Wikinews", value: "wikinews"},
        {text: "Wiktionary", value: "wiktionary"},
      ],
      selectedProject: "wikipedia",
      langCode: "",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 120 || "Max 60 characters",
        langCounter: (value) => value.length <= 3 || "Max 3 characters",
      },
    };
  },
  computed: {
    ...mapGetters(["getUserName"]),
  },
  methods: {
    formSubmit() {
      if (this.$refs.form.validate()) {
        this.submitted = true;
        backendApi
            .post(
                "/api/contest/create",
                {
                  name: this.name,
                  description: this.description,
                  language: this.langCode,
                  project: this.selectedProject,
                  start_date: this.startDate,
                  end_date: this.endDate,
                },
                {
                  crossDomain: true,
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
            )
            .then(({data}) => {
              if (data.status === "success") {
                this.$router.push("/contest/" + data.contestId);
              } else {
                alert("Something went wrong while creating contest.");
                this.submitted = false;
              }
            })
            .catch((e) => {
              alert("Something went wrong while creating contest.");
              this.submitted = false;
            });
      }
    },
  },
};
</script>

<style>
.vdatetime input {
  padding: 8px;
  font-size: 14px;
}
</style>