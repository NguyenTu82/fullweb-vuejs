<template>
  <CheerHeaderOfMember v-if="showMember" />
  <CheerHeaderOfGuest v-else-if="showGuest" />
  <OpenHeader v-else-if="showOpen" />
</template>

<script>
import pageInfoConst from "@/const/pageInfo";
import CheerHeaderOfMember from "@/components/header/CheerHeaderOfMember";
import CheerHeaderOfGuest from "@/components/header/CheerHeaderOfGuest";
import { mapGetters, mapState } from "vuex";
import OpenHeader from "@/components/header/OpenHeader";

export default {
  name: "CheerHeader",
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
    ...mapState("common", ["isPreserve"]),
    showMember() {
      return this.isShow(pageInfoConst.HEADER_TYPE.MEMBER);
    },
    showGuest() {
      return this.isShow(pageInfoConst.HEADER_TYPE.GUEST);
    },
    showOpen() {
      return this.isShow(pageInfoConst.HEADER_TYPE.OPEN_HEADER);
    },
  },
  components: {
    CheerHeaderOfMember,
    CheerHeaderOfGuest,
    OpenHeader,
  },
};
</script>
