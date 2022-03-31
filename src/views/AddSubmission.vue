<template>
    <v-row justify="center">
      <v-col cols="12">
        <v-sheet class="pa-4" min-height="80vh" rounded="lg">
          <v-row v-if="getUserName">
            <v-col>
            <v-row v-if="!Object.keys(checkRules).length">
              <v-col cols="6">
                <v-text-field v-model="pageName" placeholder="Page name"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-btn class="ma-2 white--text" color="blue-grey" @click="checkPage">Check page</v-btn>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th>Rule</th>
                      <th>Expected value</th>
                      <th>Obtained value</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="isExisted('namespaceMain')">
                      <td>The article should be in the main namespace.</td>
                      <td>{{ checkRules['namespaceMain']['expected']}}</td>
                      <td>{{ checkRules['namespaceMain']['actual']}} </td>
                      <td>
                        <v-icon color="green" v-if="checkRules['namespaceMain']['check']">mdi-check</v-icon>
                        <v-icon color="red" v-else>mdi-close</v-icon>
                      </td>
                    </tr>
                    <tr v-if="isExisted('creationInRange') ">
                      <td>The article should be created within contest dates.</td>
                      <td>{{ checkRules['creationInRange']['expected']}}</td>
                      <td>{{ checkRules['creationInRange']['actual']}} </td>
                      <td>
                        <v-icon color="green" v-if="checkRules['creationInRange']['check']">mdi-check</v-icon>
                        <v-icon color="red" v-else>mdi-close</v-icon>
                      </td>
                    </tr>
                    <tr v-if="isExisted('submitterRegDate')">
                      <td>The account of submitter should be registered before</td>
                      <td>{{ checkRules['submitterRegDate']['expected'].slice(0,7) }}</td>
                      <td>{{ checkRules['submitterRegDate']['actual'].slice(0,7)}} </td>
                      <td>
                        <v-icon color="green" v-if="checkRules['submitterRegDate']['check']">mdi-check</v-icon>
                        <v-icon color="red" v-else>mdi-close</v-icon>
                      </td>
                    </tr>
                    <tr v-if="isExisted('pageSize')">
                      <td>The article should have at least ({{ checkRules['pageSize']['mode']}}): </td>
                      <td>{{ checkRules['pageSize']['expected']}}</td>
                      <td>{{ checkRules['pageSize']['actual']}} </td>
                      <td>
                        <v-icon color="green" v-if="checkRules['pageSize']['check']">mdi-check</v-icon>
                        <v-icon color="red" v-else>mdi-close</v-icon>
                      </td>
                    </tr>
                    <tr v-if="isExisted('pageSizeBySubmitter')">
                      <td>The submitter should have at least contribution on the page
                        ({{ checkRules['pageSizeBySubmitter']['mode']}}):
                      </td>
                      <td>{{ checkRules['pageSizeBySubmitter']['expected']}}</td>
                      <td>{{ checkRules['pageSizeBySubmitter']['actual']}} </td>
                      <td>
                        <v-icon color="green" v-if="checkRules['pageSizeBySubmitter']['check']">mdi-check</v-icon>
                        <v-icon color="red" v-else>mdi-close</v-icon>
                      </td>
                    </tr>
                    <tr v-if="isExisted('authorOnly')">
                      <td>The article will only be submitted by the author only.</td>
                      <td>{{ checkRules['authorOnly']['expected']}}</td>
                      <td>{{ checkRules['authorOnly']['actual']}} </td>
                      <td>
                        <v-icon color="green" v-if="checkRules['authorOnly']['check']">mdi-check</v-icon>
                        <v-icon color="red" v-else>mdi-close</v-icon>
                      </td>
                    </tr>
                    <tr v-if="isExisted('minImages')">
                      <td>The article should have minimum images.</td>
                      <td>{{ checkRules['minImages']['expected']}}</td>
                      <td>{{ checkRules['minImages']['actual']}} </td>
                      <td>
                        <v-icon color="green" v-if="checkRules['minImages']['check']">mdi-check</v-icon>
                        <v-icon color="red" v-else>mdi-close</v-icon>
                      </td>
                    </tr>
                    <tr v-if="isExisted('minTemplates')">
                      <td> The article should have minimum templates.</td>
                      <td>{{ checkRules['minTemplates']['expected']}}</td>
                      <td>{{ checkRules['minTemplates']['actual']}} </td>
                      <td>
                        <v-icon color="green" v-if="checkRules['minTemplates']['check']">mdi-check</v-icon>
                        <v-icon color="red" v-else>mdi-close</v-icon>
                      </td>
                    </tr>
                    <tr v-if="isExisted('minCategories')">
                      <td>The article should have minimum categories.</td>
                      <td>{{ checkRules['minCategories']['expected']}}</td>
                      <td>{{ checkRules['minCategories']['actual']}} </td>
                      <td>
                        <v-icon color="green" v-if="checkRules['minCategories']['check']">mdi-check</v-icon>
                        <v-icon color="red" v-else>mdi-close</v-icon>
                      </td>
                    </tr>
                    <tr v-if="isExisted('minLangLinks')">
                      <td>The article should have minimum language links.</td>
                      <td>{{ checkRules['minLangLinks']['expected']}}</td>
                      <td>{{ checkRules['minLangLinks']['actual']}} </td>
                      <td>
                        <v-icon color="green" v-if="checkRules['minLangLinks']['check']">mdi-check</v-icon>
                        <v-icon color="red" v-else>mdi-close</v-icon>
                      </td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <br>
                <v-btn :disabled="!checkAll" elevation="2" color="success" @click="submitPage">Submit page</v-btn>
              </v-col>
            </v-row>
            </v-col>
          </v-row>
          <p v-else>
            You are not a logged in user.
          </p>
        </v-sheet>
      </v-col>
    </v-row>
</template>

<script>
import backendApi from "@/api/backendApi";
import {mapGetters} from 'vuex';

export default {
  name: "AddSubmission",
  data: function () {
    return {
      pageName: '',
      checkRules: {},
      checkAll: false
    }
  },
  computed: {
    ...mapGetters(['getUserName']),
  },
  components: {},
  methods: {
    checkPage: function () {
      backendApi
          .get("/api/checkpage", {
            params: {
              "pageName": this.pageName,
              "contestId": this.$route.params.id
            }
          })
          .then(({data}) => {
            if (data.status === "success") {
              this.checkRules = data.checks;
              this.checkAll = data.checkAll;
            }
          })
          .catch((e) => alert("Something went wrong while fetching contest."));
    },
    submitPage: function () {
      if( !this.checkAll ){
        alert("Page does not satisfy the current rules.");
      }

      backendApi
          .post(
              "/api/submitpage",
              {
                "contestId": this.$route.params.id,
                "pageName": this.pageName,
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
              this.$router.push({ "name": 'Contest', "params": { id: this.$route.params.id } })
            } else {
              alert(data.msg);
            }
          })
          .catch((e) => {
            alert("Something went wrong: " + e.response.data.msg);
          });
    },
    isExisted: function (key) {
      return this.checkRules && this.checkRules[key] && this.checkRules[key]['expected']
    }
  },
};
</script>