<template>
  <NcbHeaderOfMember v-if="showMember" />
  <NcbHeaderOfGuest v-else-if="showGuest" />
</template>

<script>
import pageInfoConst from "@/const/pageInfo";
import { mapGetters } from "vuex";
import NcbHeaderOfMember from "@/components/header/NcbHeaderOfMember";
import NcbHeaderOfGuest from "@/components/header/NcbHeaderOfGuest";

export default {
  name: "NcbHeader",
  data() {
    return {};
  },
  methods: {
    isShow(headerType) {
      if (this.pageHeaderType === headerType) {
        return true;
      }

      return false;
    },
  },
  computed: {
    ...mapGetters("common", ["pageHeaderType"]),
    showMember() {
      return this.isShow(pageInfoConst.HEADER_TYPE.MEMBER);
    },
    showGuest() {
      return this.isShow(pageInfoConst.HEADER_TYPE.GUEST);
    },
  },
  components: {
    NcbHeaderOfMember,
    NcbHeaderOfGuest,
  },
};
</script>
