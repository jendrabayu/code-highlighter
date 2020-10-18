<template>
  <div>
    <div class="code_item_header">
      <div class="buttons mb-0">
        <router-link
          :to="{ path: `code/${code.id}` }"
          class="button is-warning is-small"
          ><span> Edit</span>
          <span class="icon is-small"><i class="far fa-edit"></i> </span
        ></router-link>

        <v-button-icon
          :progress="deleteProgress"
          :disabled="deleteProgress"
          title="Delete"
          color="is-danger"
          size="is-small"
          icon="far fa-trash-alt"
          @click="deleteCode"
        />

        <v-button-icon
          :progress="downloadProgress"
          :disabled="downloadProgress"
          title="Download"
          color="is-primary"
          size="is-small"
          icon="fas fa-download"
          @click="downloadCode"
        />
      </div>
      <div>
        <small>{{ getCreatedAt }}</small>
      </div>
    </div>

    <data-code
      :code="code.code"
      :lang="code.lang"
      :isHighlighted="1"
    ></data-code>
  </div>
</template>

<script>
import DataCode from "../preset/DataCode";
import swal from "sweetalert";
import VButtonIcon from "../VButtonIcon";
import { saveAs } from "file-saver";
import date from "date-and-time";
export default {
  name: "v-code-item",
  components: {
    DataCode,
    VButtonIcon,
  },
  props: {
    dataCode: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      downloadProgress: false,
      deleteProgress: false,
      code: this.dataCode,
    };
  },
  methods: {
    downloadCode() {
      this.downloadProgress = true;

      this.$store
        .dispatch("code/getSingle", {
          userId: this.$store.state.user.id,
          codeId: this.code.id,
          highlighted: 0,
        })
        .then((response) => {
          const data = {
            lang: response.lang,
            fileName: response.fileName,
            highlight: response.highlight,
            twoslash: response.twoslash,
            download: 1,
            code: response.code,
          };
          this.$store
            .dispatch("code/getImage", data)
            .then((response) => {
              this.downloadProgress = false;
              console.log(response);
              saveAs(response, `${new Date().getTime()}-kode.png`);
            })
            .catch((error) => {
              this.downloadProgress = false;
              console.log(error);
            });
        })
        .catch((error) => {
          this.downloadProgress = false;
          console.log(error);
        });
    },
    deleteCode() {
      swal({
        title: "Delete Code?",
        text:
          "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.deleteProgress = true;
          this.$store
            .dispatch("code/delete", {
              userId: this.$store.state.user.id,
              codeId: this.code.id,
            })
            .then((response) => {
              swal(response, {
                icon: "success",
              });
              this.deleteProgress = false;
              console.log(response);
            })
            .catch((error) => {
              swal("Delete failed, please try again", {
                icon: "error",
              });
              this.deleteProgress = false;
              console.log(error);
            });
        }
      });
    },
  },
  watch: {
    dataCode() {
      this.code = this.dataCode;
    },
  },
  computed: {
    getCreatedAt() {
      return date.format(new Date(this.code.createdAt), "YYYY/MM/DD HH:mm:ss");
    },
  },
};
</script>

<style  scoped>
@import url("../../assets/css/highlighter.css");
.code_item_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}
</style>