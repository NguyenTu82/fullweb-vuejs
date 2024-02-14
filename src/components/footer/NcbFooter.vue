<template>
  <NcbFooterOfNormal v-if="showNormal" />
</template>

<script>
import { mapGetters } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import NcbFooterOfNormal from "@/components/footer/NcbFooterOfNormal";

export default {
  name: "NcbFooter",
  data() {
    return {};
  },
  methods: {
    isShow(footerType) {
      if (this.pageFooterType === footerType) {
        return true;
      }

      return false;
    },
  },
  computed: {
    ...mapGetters("common", ["pageFooterType"]),
    showNormal() {
      return this.isShow(pageInfoConst.FOOTER_TYPE.NORMAL);
    },
  },
  components: {
    NcbFooterOfNormal,
  },
};
</script>
