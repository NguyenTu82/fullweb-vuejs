import { mapGetters } from "vuex";
import commonConst from "@/const/common";

export default {
  title: "メンテナンス",
  name: "maintenance",
  components: {},
  data() {
    return {
      maintenanceData: {},
    };
  },
  computed: {
    ...mapGetters("common", ["branchDivision"]),
  },
  methods: {
    isShowCheer() {
      return this.branchDivision === commonConst.BRANCH_DIVISION.CHEER;
    },
  },
  created() {
    this.maintenanceData = this.$store.getters.MaintenanceData;

    if (Object.keys(this.maintenanceData).length === 0) {
      this.$router.push({ name: "Home" });
    }
  },
};
