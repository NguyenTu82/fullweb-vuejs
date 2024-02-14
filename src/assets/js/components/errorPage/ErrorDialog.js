import { mapGetters } from "vuex";

export default {
  name: "ErrorDialog",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("common", ["apiErrorMsgConfig"]),
  },
};
