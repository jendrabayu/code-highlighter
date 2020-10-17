<template>
  <div>
    <div class="code_item_header">
      <div class="buttons mb-0">
        <router-link :to="{ path: `code/${code.id}` }" class="button is-small"
          ><span> Edit</span>
          <span class="icon is-small"><i class="far fa-edit"></i> </span
        ></router-link>
        <button
          :class="{ 'is-loading': deleteProgress }"
          :disabled="deleteProgress"
          class="button is-small"
          @click="deleteCode"
        >
          <span>Delete</span>
          <span class="icon is-small"><i class="far fa-trash-alt"></i></span>
        </button>
        <button
          :class="{ 'is-loading': downloadProgress }"
          :disabled="downloadProgress"
          class="button is-small"
          @click="downloadCode"
        >
          <span>Download</span>
          <span class="icon is-small"><i class="fas fa-download"></i></span>
        </button>
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
import { saveAs } from "file-saver";
import date from "date-and-time";
export default {
  name: "v-code-item",
  components: {
    DataCode,
  },
  props: {
    dataCode: {
      type: Object,
      required: true,
    },
  },
  created() {
    // console.log(this.dataCode);
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

.button {
  border: 1.5px solid #273a6e;
}
</style>