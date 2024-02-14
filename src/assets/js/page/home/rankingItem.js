import swiper from "@/assets/js/common/swiper";
export default {
  props: {
    ranking: Array,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {
    swiper.swiperSingle();
  },
};
