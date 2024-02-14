import UserLogout from "@/views/settings/user/logout/index";
import constant from "@/const/common";
import commonJs from "@/assets/js/common/common";

export default {
  props: {},
  components: {
    UserLogout,
  },
  data() {
    return {
      logoutUser: false,
      isHidden: false,
      headerLinkList: [
        {
          title: "ホーム",
          slug: "home",
          extraData: [],
          children: [],
        },
        {
          title: "国内株式",
          slug: "transaction/jp",
          extraData: [
            {
              title: "取扱銘柄一覧",
              slug: "brand",
            },
            {
              title: "お気に入り銘柄一覧",
              slug: "brand/favorite",
            },
          ],
          children: [
            {
              title: "委託取引",
              slug: "?typeTransaction=2",
            },
            {
              title: "店頭取引",
              slug: "?typeTransaction=1",
            },
            {
              title: "ランキング一覧",
              slug: "ranking",
            },
          ],
        },
        {
          title: "米国株式",
          slug: "transaction",
          extraData: [],
          children: [
            {
              title: "取扱銘柄一覧",
              slug: "us/brand",
            },
            {
              title: "お気に入り銘柄一覧",
              slug: "us/brand/favorite",
            },
            {
              title: "ランキング一覧",
              slug: "ranking/us",
            },
          ],
        },
        {
          title: "投資信託",
          slug: "transaction",
          extraData: [],
          children: [
            {
              title: "取扱銘柄一覧",
              slug: "investment/brand",
            },
            {
              title: "お気に入り銘柄一覧",
              slug: "investment/brand/favorite",
            },
            {
              title: "ランキング一覧",
              slug: "ranking/investment",
            },
          ],
        },
        {
          title: "資産・照会",
          slug: "reference",
          extraData: [],
          children: [
            {
              title: "資産状況",
              slug: "condition",
            },
            {
              title: "注文一覧",
              slug: "order/jp",
            },
            {
              title: "約定一覧",
              slug: "contract/jp",
            },
            {
              title: "預り金増減",
              slug: "deposit",
            },
          ],
        },
        {
          title: "入出金",
          slug: "payment",
          extraData: [],
          children: [
            {
              title: "入金(リアルタイム入金ページ)",
              slug: "deposit",
            },
            {
              title: "出金",
              slug: "withdrawal",
            },
            {
              title: "入出金履歴",
              slug: "history",
            },
          ],
        },
        {
          title: "口座・設定",
          slug: "settings",
          children: [],
        },
      ],
      isOpen: false,
      isOpenList: "",
      headerItems: "",
      hamburger: "",
      spmenu: "",
      spIsOpen: false,
      spMenuItems: "",
      isReaded: false,
    };
  },
  methods: {
    logout() {
      // Logout
      this.$router.replace({ path: "/", query: { isLogout: "true" } });
      this.$store.commit("logout");
      commonJs.removeDataBySecureLS("user_pwd");
      commonJs.removeDataBySecureLS("auto_login");
    },
    userLogout() {
      this.logoutUser = !this.logoutUser;
      // this.$router.push({ name: "SettingUserLogout" });
    },
    notices() {
      this.$router.push({
        name: "Notice",
      });
    },
    checkUrgentNoticeReadStatus() {
      let params = {
        apiType: constant.API_TYPE.COMMON,
        SEND_TYPE: 1,
        SINCE_OPEN_DT: "",
        ONLY_COUNT: 0,
      };

      this.$store.dispatch("getNotices", params).then(() => {
        let notices = this.$store.getters.notices;
        let data = notices["DATA"];
        this.isReaded = (data["PUBLIC_NOTICE_UNREAD"] > 0) || (data["INDIVIDUAL_NOTICE_UNREAD"] > 0);
      });

      params.SEND_TYPE = 2;
      this.$store.dispatch("getNotices", params).then(() => {
        let notices = this.$store.getters.notices;
        let data = notices["DATA"];
        this.isReaded = this.isReaded || (data["PUBLIC_NOTICE_UNREAD"] > 0) || (data["INDIVIDUAL_NOTICE_UNREAD"] > 0);
      });
    },
    handleClick(item) {
      // 初期化
      this.headerItems.forEach((headerItem) => {
        headerItem.classList.remove("header__sub-item--active");
      });
      const links = document.querySelector(".header__sub-links");
      while (links.firstChild) {
        links.removeChild(links.firstChild);
      }
      // クリックした要素の表示
      item.classList.toggle("header__sub-item--active");
      const clickedItem = this.headerLinkList.filter(
        (headerLink) => headerLink.title === item.textContent
      );
      const clickedItemIndex = this.headerLinkList.indexOf(clickedItem[0]);
      if (clickedItem[0].children.length > 0) {
        this.isOpen = !this.isOpenList[clickedItemIndex];
        this.isOpenList = this.isOpenList.map(() => false);
        this.isOpenList[clickedItemIndex] = this.isOpen;
      } else {
        this.isOpenList = this.isOpenList.map(() => false);
        this.isOpen = false;
      }
      if (this.isOpen) {
        document.querySelector(".header__sub-list").classList.remove("hidden");
        links.classList.remove("hidden");
        clickedItem[0].children.forEach((child) => {
          const childLink = this.createLink(
            child,
            clickedItem[0].slug,
            clickedItem[0].extraData
          );
          links.appendChild(childLink);
        });
      } else {
        item.classList.remove("header__sub-item--active");
        document.querySelector(".header__sub-list").classList.add("hidden");
        links.classList.add("hidden");
      }
    },
    createLink(children, parentSlug, extraData) {
      let element;
      // 追加データがある場合、データを追加する(今は国内株式のみ)
      if (extraData.length > 0) {
        const links = extraData.map((extra) => ({
          title: extra.title,
          slug: `/${parentSlug}/${extra.slug}${children.slug}`,
        }));
        element = document.createElement("div");
        element.classList.add("header__sub-links--jp");
        element.innerHTML =
          children.slug !== "ranking"
            ? `
        <p>${children.title}</p>
        <div class="header__sub-links--extra">
            <img src="/assets/images/triangle.png"/><a href="${links[0].slug}">${links[0].title}</a>
            <img src="/assets/images/triangle.png"/><a href="${links[1].slug}">${links[1].title}</a>
        </div>
        `
            : `<a href="/ranking/jp"><img src="/assets/images/triangle.png"/>${children.title}</a>`;
      } else {
        element = document.createElement("a");
        if (parentSlug==="") {
          element.innerHTML =
            '<img src="/assets/images/triangle.png"/>' + children.title;
          element.href = `/${children.slug}`;
        } else if (children.slug == "ranking/us") {
          element.innerHTML =
            '<img src="/assets/images/triangle.png"/>' + children.title;
          element.href = `/${children.slug}`;
        } else if (children.slug == "ranking/investment") {
          element.innerHTML =
            '<img src="/assets/images/triangle.png"/>' + children.title;
          element.href = `/${children.slug}`;
        } else {
          element.innerHTML =
            '<img src="/assets/images/triangle.png"/>' + children.title;
          element.href = `/${parentSlug}/${children.slug}`;
        }
      }
      return element;
    },
    allClear() {
      this.headerItems.forEach((headerItem) => {
        headerItem.classList.remove("header__sub-item--active");
      });
      this.isOpenList = this.isOpenList.map(() => false);
      this.isOpen = false;
      document.querySelector(".header__sub-list").classList.add("hidden");
    },
    showMenu() {
      this.headerItems = document.querySelectorAll(".header__sub-item");
      this.isOpenList = this.headerLinkList.map(() => false);
      // this.headerItems = documents.querySelectorAll('.header__sub-item')
      document.querySelectorAll(".header__sub-item").forEach((item) => {
        item.addEventListener("click", () => this.handleClick(item));
      });
      // documents.addEventListener('click', (e) => {
      //   if (!e.target.closest('.header__sub-item')) {
      //     this.allClear()
      //   }
      // })
    },
    handleClear() {
      window.addEventListener('click', (e) => {
        if (!e.target.closest('.header__sub-item')) {
          this.allClear()
        }
      })
    },
    handleHamburgerClick() {
      this.spIsOpen = !this.spIsOpen;
      if (this.spIsOpen) {
        this.hamburger.src = "/assets/images/close.png";
        this.spmenu.classList.remove("sp_close");
      } else {
        this.hamburger.src = "/assets/images/hamburger.png";
        this.spmenu.classList.add("sp_close");
      }
    },
    handleSpLinkClick(spMenuItem) {
      // 初期化
      const allSpMenuSubItems = document.querySelectorAll(
        ".header__spmenu-sub"
      );
      allSpMenuSubItems.forEach((spMenuSubItem) => {
        while (spMenuSubItem.firstChild) {
          spMenuSubItem.removeChild(spMenuSubItem.firstChild);
        }
      });
      const clickedSpItem = this.headerLinkList.filter(
        (headerLink) => headerLink.title === spMenuItem.textContent
      );
      const clickedSpItemIndex = this.headerLinkList.indexOf(clickedSpItem[0]);
      clickedSpItem[0].children.forEach((child) => {
        const childSpLink = this.createSpLink(
          child,
          clickedSpItem[0].slug,
          clickedSpItem[0].extraData
        );
        const appendArea = document.querySelector(
          `#sp_item_${clickedSpItemIndex}`
        );
        appendArea.appendChild(childSpLink);
      });
    },
    createSpLink(children, parentSlug, extraData) {
      let element;
      // 追加データがある場合、データを追加する(今は国内株式のみ)
      if (extraData.length > 0) {
        const links = extraData.map((extra) => ({
          title: extra.title,
          slug: `/${parentSlug}/${extra.slug}${children.slug}`,
        }));
        element = document.createElement("div");
        element.classList.add("header__spmenu-links--jp");
        element.innerHTML =
          children.slug !== "ranking"
            ? `
        <p>${children.title}</p>
        <div class="header__spmenu-links--extra">
            <img src="/assets/images/triangle_sp.png"/><a href="${links[0].slug}">${links[0].title}</a>
        </div>
        <div class="header__spmenu-links--extra">
            <img src="/assets/images/triangle_sp.png"/><a href="${links[1].slug}">${links[1].title}</a>
        </div>
        `
            : `<a href="/ranking/jp/"><img src="/assets/images/triangle_sp.png"/>${children.title}</a>`;
      } else {
        console.log(parentSlug);
        element = document.createElement("a");
        if (children.slug == "ranking/us") {
          element.innerHTML =
            '<img src="/assets/images/triangle_sp.png"/>' + children.title;
          element.href = `/${children.slug}`;
        } else if (children.slug == "ranking/investment") {
          element.innerHTML =
            '<img src="/assets/images/triangle_sp.png"/>' + children.title;
          element.href = `/${children.slug}`;
        } else {
          element.innerHTML =
            '<img src="/assets/images/triangle_sp.png"/>' + children.title;
          element.href = `/${parentSlug}/${children.slug}/`;
          if(!parentSlug){
            element.href = `/${children.slug}`;
          }
        }
      }
      return element;
    },
    showMenuSp() {
      this.hamburger = document.querySelector(".header__hamburger img");
      this.spmenu = document.querySelector(".header__spmenu");
      this.spMenuItems = document.querySelectorAll(".header__spmenu-item");
      if (this.hamburger) {
        this.hamburger.addEventListener("click", this.handleHamburgerClick);
      }
      if (this.spMenuItems) {
        this.spMenuItems.forEach((spMenuItem) => {
          spMenuItem.addEventListener("click", () => {
            this.handleSpLinkClick(spMenuItem);
          });
        });
      }
    },
  },
  mounted() {
    this.showMenu();
    this.showMenuSp();
    this.checkUrgentNoticeReadStatus();
    this.handleClear();
  },
  created() {},
};
