<template>
  <CheerHeader v-if="showCheer" />
  <NcbHeader v-else-if="showNcb" />
</template>

<script>
import commonConst from "@/const/common";
import pageInfoConst from "@/const/pageInfo";
import { mapGetters } from "vuex";
import CheerHeader from "@/components/header/CheerHeader";
import NcbHeader from "@/components/header/NcbHeader";
import { initHeadOfPc, initHeadOfSp } from "@/assets/js/common/header";

export default {
  name: "PageHeader",
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
    ...mapGetters("common", ["pageHeaderType"]),
    showCheer() {
      return this.isShow(commonConst.BRANCH_DIVISION.CHEER);
    },
    showNcb() {
      return this.isShow(commonConst.BRANCH_DIVISION.NCB);
    },
  },
  mounted() {
    if (this.pageHeaderType === pageInfoConst.HEADER_TYPE.MEMBER) {
      initHeadOfPc();
      initHeadOfSp();
    }
  },
  components: {
    CheerHeader,
    NcbHeader,
  },
};
</script>
