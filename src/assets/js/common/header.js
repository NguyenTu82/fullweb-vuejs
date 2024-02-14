import subHeader from "@/const/subHeader";

let headerLinkList = subHeader.HEADER_LINK_LIST;

// ここからPC用
const createLink = (children, parentSlug, extraData) => {
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
        : `<a href="/home/ranking/jp/"><img src="/assets/images/triangle.png"/>${children.title}</a>`;
  } else {
    element = document.createElement("a");
    element.innerHTML =
      '<img src="/assets/images/triangle.png"/>' + children.title;
    element.href = `/${parentSlug}/${children.slug}/`;
  }
  return element;
};

let isOpenList = headerLinkList.map(() => false);
let isOpen = false;

const handleClick = (headerItems, item) => {
  // 初期化
  headerItems.forEach((headerItem) => {
    headerItem.classList.remove("header__sub-item--active");
  });
  const links = document.querySelector(".header__sub-links");
  while (links.firstChild) {
    links.removeChild(links.firstChild);
  }
  // クリックした要素の表示
  item.classList.toggle("header__sub-item--active");
  const clickedItem = headerLinkList.filter(
    (headerLink) => headerLink.title === item.textContent
  );
  const clickedItemIndex = headerLinkList.indexOf(clickedItem[0]);
  if (clickedItem[0].children.length > 0) {
    isOpenList[clickedItemIndex] = !isOpenList[clickedItemIndex];
    isOpen = isOpenList.includes(true);
  } else {
    isOpenList = isOpenList.map(() => false);
    isOpen = false;
  }
  if (isOpen) {
    document.querySelector(".header__sub-list").classList.remove("hidden");
    links.classList.remove("hidden");
    clickedItem[0].children.forEach((child) => {
      const childLink = createLink(
        child,
        clickedItem[0].slug,
        clickedItem[0].extraData
      );
      links.appendChild(childLink);
    });
  } else {
    document.querySelector(".header__sub-list").classList.add("hidden");
    links.classList.add("hidden");
  }
};

// 表示を消す
const allClear = () => {
  const headerItems = document.querySelectorAll(".header__sub-item");
  if (!headerItems || headerItems.length == 0) {
    return;
  }
  headerItems.forEach((headerItem) => {
    headerItem.classList.remove("header__sub-item--active");
  });
  isOpenList = isOpenList.map(() => false);
  isOpen = false;
  document.querySelector(".header__sub-list").classList.add("hidden");
};

const initHeadOfPc = () => {
  const headerSubItems = document.querySelectorAll(".header__sub-item");

  headerSubItems.forEach((item) => {
    item.addEventListener("click", () => handleClick(headerSubItems, item));
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header__sub-item")) {
      allClear();
    }
  });
};

// ここまでPC用

// ここからスマホ用
let spIsOpen = false;
const handleHamburgerClick = (hamburger, menu) => {
  spIsOpen = !spIsOpen;
  if (spIsOpen) {
    hamburger.src = "/assets/images/close.png";
    menu.classList.remove("sp_close");
  } else {
    hamburger.src = "/assets/images/hamburger.png";
    menu.classList.add("sp_close");
  }
};

const createSpLink = (children, parentSlug, extraData) => {
  let element;
  // 追加データがある場合、データを追加する(今は国内株式のみ)
  if (extraData.length > 0) {
    const links = extraData.map((extra) => ({
      title: extra.title,
      slug: `/${parentSlug}/${children.slug}/${extra.slug}`,
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
        : `<a href="/home/ranking/jp/"><img src="/assets/images/triangle_sp.png"/>${children.title}</a>`;
  } else {
    element = document.createElement("a");
    element.innerHTML =
      '<img src="/assets/images/triangle_sp.png"/>' + children.title;
    element.href = `/${parentSlug}/${children.slug}/`;
  }
  return element;
};

const handleSpLinkClick = (spMenuItem) => {
  // 初期化
  const allSpMenuSubItems = document.querySelectorAll(".header__spmenu-sub");
  allSpMenuSubItems.forEach((spMenuSubItem) => {
    while (spMenuSubItem.firstChild) {
      spMenuSubItem.removeChild(spMenuSubItem.firstChild);
    }
  });
  const clickedSpItem = headerLinkList.filter(
    (headerLink) => headerLink.title === spMenuItem.textContent
  );
  const clickedSpItemIndex = headerLinkList.indexOf(clickedSpItem[0]);
  clickedSpItem[0].children.forEach((child) => {
    const childSpLink = createSpLink(
      child,
      clickedSpItem[0].slug,
      clickedSpItem[0].extraData
    );
    const appendArea = document.querySelector(`#sp_item_${clickedSpItemIndex}`);
    appendArea.appendChild(childSpLink);
  });
};

const initHeadOfSp = () => {
  const sphamburger = document.querySelector(".header__hamburger img");
  const spmenu = document.querySelector(".header__spmenu");
  sphamburger.addEventListener("click", () => {
    handleHamburgerClick(sphamburger, spmenu);
  });

  const spMenuItems = document.querySelectorAll(".header__spmenu-item");
  spMenuItems.forEach((spMenuItem) => {
    spMenuItem.addEventListener("click", () => {
      handleSpLinkClick(spMenuItem);
    });
  });
};

const logout = () => {
  // Logout
  this.$router.replace({ path: "/", query: { isLogout: "true" } });
  this.$store.commit("logout");
};

export { initHeadOfPc, initHeadOfSp, logout };
