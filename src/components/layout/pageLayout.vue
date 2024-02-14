<template>
  <head>
    <title>{{ pageTittle }}</title>
  </head>
  <PageHeader />
  <Popup />
  <ExceptionError />
  <slot></slot>
  <PageFooter />
</template>

<script>
import { mapGetters } from "vuex";
import PageHeader from "@/components/header/PageHeader";
import PageFooter from "@/components/footer/PageFooter";
import Popup from "@/components/common/popup/Popup";
import ExceptionError from "@/components/common/dialog/ExceptionError";
import commonIndex from "@/assets/js/common";

export default {
  name: "PageLayout",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("common", ["pageTittle"]),
  },
  mounted() {
    commonIndex.scrollTop.initScrollTop();
  },
  components: {
    PageHeader,
    PageFooter,
    Popup,
    ExceptionError,
  },
};
</script>
