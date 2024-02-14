import { mapGetters, mapActions } from "vuex";
import ListInCard from "@/views/payment/deposit/components/listInCard";
export default {
  name: "Transfer",
  components: {
    ListInCard,
  },
  computed: {
    ...mapGetters(["depositCurrentTab", "getCashInData"]),
    listInCard() {      
      return this.getCashInData;
    },
  },
  methods: {
    ...mapActions(["updateCashInData"]),
  },
  created() {
    this.updateCashInData();
  },
};
