<template>
  <CheerFooter v-if="showCheer" />
  <NcbFooter v-else-if="showNcb" />
</template>

<script>
import commonConst from "@/const/common";
import { mapGetters } from "vuex";
import CheerFooter from "@/components/footer/CheerFooter";
import NcbFooter from "@/components/footer/NcbFooter";

export default {
  name: "PageFooter",
  data() {
    return {};
  },
  methods: {
    isShow(branchDivision) {
      if (this.branchDivision === branchDivision) {
        return true;
      }

      return false;
    },
  },
  computed: {
    ...mapGetters("common", ["branchDivision"]),
    showCheer() {
      return this.isShow(commonConst.BRANCH_DIVISION.CHEER);
    },
    showNcb() {
      return this.isShow(commonConst.BRANCH_DIVISION.NCB);
    },
  },
  components: {
    CheerFooter,
    NcbFooter,
  },
};
</script>
