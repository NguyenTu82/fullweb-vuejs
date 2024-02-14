export default {
  name: "girdButton",
  title: "girdButton",
  props: ["value"],
  methods: {
    parentDirectory(dir) {
      if (dir.slice(-1) === "/") {
        const lastSlash = dir.lastIndexOf("/");
        if (lastSlash === -1) {
          return dir;
        }
        if (lastSlash === 0) {
          return "/";
        }
        return dir.substring(0, lastSlash);
      } else {
        return dir;
      }
    },
    activeBtn(pathBtn, key = null) {
      const currentPath = this.$route.path;
      return this.parentDirectory(currentPath.toLowerCase()) ===
        this.parentDirectory(pathBtn.toLowerCase()) ||
        (currentPath.toLowerCase().split("/").pop() == "edit" && key == "1")
        ? "button__square--selected"
        : "button__square";
    },
  },
};
