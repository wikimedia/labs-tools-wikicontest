<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="purple" outlined small v-bind="attrs" v-on="on">View</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Submission</v-toolbar>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Page name</td>
                  <td>Jay</td>
                </tr>
                <tr>
                  <td>Created by</td>
                  <td>Jay</td>
                </tr>
                <tr>
                  <td>Assessment by</td>
                  <td>Jay</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <br />
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <td></td>
                  <td class="font-weight-bold">Before assessment</td>
                  <td class="font-weight-bold">After assessment</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Page size</td>
                  <td>Jay</td>
                  <td>Jay</td>
                </tr>
                <tr>
                  <td>Templates used</td>
                  <td>Jay</td>
                  <td>Jay</td>
                </tr>
                <tr>
                  <td>Images used</td>
                  <td>Jay</td>
                  <td>Jay</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <br />
          <p class="text-caption">
            Please consider, these values does not reflect against Page's
            current revision.
          </p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: "ViewSubmission",
  data: function () {
    return {
      pointTable: [],
    };
  },
};
</script>