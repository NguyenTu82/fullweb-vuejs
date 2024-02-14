<template>
  <CheerFooterOfNormal v-if="showNormal" />
</template>

<script>
import { mapGetters } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import CheerFooterOfNormal from "@/components/footer/CheerFooterOfNormal";

export default {
  name: "CheerFooter",
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
    CheerFooterOfNormal,
  },
};
</script>
