<template>
  <v-card class="mx-auto mt-4" min-height="300px">
    <v-card-text>
      <p class="text-h5 text--primary">Rules</p>
      <div class="text--primary">
        <ul>
          <li v-if="rules.namespaceMain">The article should be in the main namespace.</li>
          <li v-if="rules.pageSize.status && rules.pageSize.mode === 'bytes'">
            The article should have {{ rules.pageSize.bytes }} bytes.
          </li>
          <li v-if="rules.pageSize.status && rules.pageSize.mode === 'words'">
            The article should have {{ rules.pageSize.words }} words.
          </li>
          <li v-if="rules.creationInRange">The article should be created within contest dates.</li>
          <li v-if="rules.submitterRegDate.status">
            The account of submitter should be registered before {{ rules.submitterRegDate.value }}.
          </li>
          <li v-if="rules.authorOnly">The article will only be submitted by the author.</li>
          <li v-if="rules.pageSizeBySubmitter.status && rules.pageSizeBySubmitter.mode === 'bytes'">
            The submitter should contribute at least {{ rules.pageSizeBySubmitter.bytes }} bytes.
          </li>
          <li v-if="rules.minImages.status">
            The article should have minimum {{ rules.minImages.value || 0 }} images.
          </li>
          <li v-if="rules.minTemplates.status">
            The article should have minimum {{ rules.minTemplates.value || 0 }} templates.
          </li>
          <li v-if="rules.minCategories.status">
            The article should have minimum {{ rules.minCategories.value || 0 }} categories.
          </li>
          <li v-if="rules.minLangLinks.status">
            The article should have minimum {{ rules.minLangLinks.value || 0 }} language links.
          </li>
        </ul>
      </div>
      <v-dialog v-model="editRuleDialog" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mt-4" color="pink" outlined small v-bind="attrs" v-on="on">
            Add/Edit rules
          </v-btn>
        </template>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-btn dark icon @click="editRuleDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Editing rules</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="submitEditRules">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-row>
            <v-col cols="6">
              <v-list>
                <v-subheader>Status</v-subheader>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="newRules.namespaceMain" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>The article should be in the main namespace.</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="newRules.creationInRange" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>The article should be created within contest dates.</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="newRules.submitterRegDate.status" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      The account of submitter should be registered before: {{ newRules.submitterRegDate.value }}
                    </v-list-item-title>
                    <v-row>
                      <v-col cols="4">
                        <v-dialog ref="regDialog" v-model="regDialogModal"
                                  :return-value.sync="newRules.submitterRegDate.value"
                                  persistent width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="newRules.submitterRegDate.value"
                                :disabled="!newRules.submitterRegDate.status"
                                label="Pick month"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="newRules.submitterRegDate.value" color="pink accent-4" type="month">
                            <v-btn color="primary" text @click="regDialogModal = false">Cancel</v-btn>
                            <v-btn color="primary" text @click="$refs.regDialog.save(newRules.submitterRegDate.value)">
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="newRules.pageSize.status" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span>The article should have at least: </span>
                    </v-list-item-title>
                    <v-radio-group v-model="newRules.pageSize.mode" :disabled="!newRules.pageSize.status" row>
                      <v-radio label="bytes" value="bytes"></v-radio>
                      <v-radio label="words" value="words"></v-radio>
                    </v-radio-group>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                            v-if="newRules.pageSize.mode === 'bytes'"
                            v-model.number="newRules.pageSize.bytes" type="number"
                            :disabled="!newRules.pageSize.status" label="Bytes"
                        ></v-text-field>
                        <v-text-field
                            v-if="newRules.pageSize.mode === 'words'"
                            v-model.number="newRules.pageSize.words" type="number"
                            :disabled="!newRules.pageSize.status" label="Words"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="newRules.pageSizeBySubmitter.status" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span>The submitter should have at least contribution on the page: </span>
                    </v-list-item-title>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                            v-if="newRules.pageSizeBySubmitter.mode === 'bytes'"
                            v-model.number="newRules.pageSizeBySubmitter.bytes" type="number"
                            :disabled="!newRules.pageSizeBySubmitter.status" label="Bytes"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
            </v-col>
            <v-col cols="6">
              <v-list>
                <v-subheader>Status</v-subheader>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="newRules.authorOnly" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>The article will only be submitted by the author only.</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="newRules.minImages.status" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      The article should have minimum images.
                    </v-list-item-title>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                            v-model="newRules.minImages.value"
                            :disabled="!newRules.minImages.status"
                            label="No."
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="newRules.minTemplates.status" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      The article should have minimum templates.
                    </v-list-item-title>
                    <v-row>
                      <v-col cols="12" md="3" sm="6">
                        <v-text-field
                            v-model="newRules.minTemplates.value"
                            :disabled="!newRules.minTemplates.status"
                            label="No."
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="newRules.minCategories.status" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      The article should have minimum categories.
                    </v-list-item-title>
                    <v-row>
                      <v-col cols="12" md="3" sm="6">
                        <v-text-field
                            v-model="newRules.minCategories.value"
                            :disabled="!newRules.minCategories.status"
                            label="No."
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch v-model="newRules.minLangLinks.status" color="orange"></v-switch>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      The article should have minimum language links.
                    </v-list-item-title>
                    <v-row>
                      <v-col cols="12" md="3" sm="6">
                        <v-text-field
                            v-model="newRules.minLangLinks.value"
                            :disabled="!newRules.minLangLinks.status"
                            label="No."
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import backendApi from "@/api/backendApi";

export default {
  name: "ContestRule",
  props: ['rule'],
  data: function () {
    return {
      editRuleDialog: false,
      regDialogModal: false,
      rules: this.rule,
      newRules: JSON.parse(JSON.stringify(this.rule)),  // Hack to create a copy
    }
  },
  methods: {
    submitEditRules: function () {
      backendApi
          .post(
              "/api/editrules",
              {
                contest_id: this.$route.params.id,
                rules: this.newRules,
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
              this.$router.go(0);
            } else {
              alert(data.msg);
            }
          })
          .catch((e) => {
            alert("Something went wrong: " + e.response.data.msg);
          });
    }
  },
  watch: {
    rule: function (newVal) {
      this.rules = newVal;
    }
  }
}
</script>