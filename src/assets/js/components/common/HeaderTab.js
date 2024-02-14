export default {
  props: {
    tab_data: {
      tab1: {
        name: String,
        link: String,
        is_active: false,
      },
      tab2: {
        name: String,
        link: String,
        is_active: false,
      },
    },
  },
  methods: {
    route(link) {
      this.menuShow = false;
      let current_path = this.$router.currentRoute.name;
      if (link === current_path) {
        this.$router.go({ name: this.$router.currentRoute.name, force: true });
      } else {
        this.$router.push({ name: link });
      }
    },
    initialize() {
      if (this.tab_data.tab1.link == this.$router.currentRoute.name) {
        this.tab_data.tab1.is_active = true;
      } else {
        this.tab_data.tab2.is_active = true;
      }
    },
  },

  created() {
    this.initialize();
  },
};
