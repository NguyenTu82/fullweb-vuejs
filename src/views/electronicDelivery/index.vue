<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/settings/"><strong>口座・設定</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/settings/digital">電子交付</a>
      </nav>
    </TopInfo>
    <FilterCard
      v-show="filterCard"
      @search="triggerSearch"
      :isReset="isReset"
      @closeFilter="handleFilter()"
    >
    </FilterCard>
    <section class="settings">
      <div class="wrapper">
        <h1 class="title">{{ title }}</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="searchbar">
              <div class="searchbar__top">
                <img src="/assets/images/search.png" alt="虫眼鏡" />
                <p>表示条件</p>
                <button
                  @click="handleFilter()"
                  class="button button__main searchbar__top-button"
                >
                  条件変更
                </button>
                <button
                  @click="resetSearch()"
                  class="button button__white searchbar__top-button--reset"
                >
                  リセット
                </button>
              </div>
              <div class="searchbar__bottom">
                <div
                  v-for="(item, index) in searchBar"
                  :key="index"
                  class="searchbar__bottom-flex"
                >
                  <button
                    @click="handleFilter()"
                    class="searchbar__bottom-button"
                  >
                    <span class="searchbar__bottom-requirement">{{
                      item.title
                    }}</span>
                    <span class="searchbar__bottom-value">{{
                      item.value
                    }}</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="grid_list">
              <div
                v-for="(item, index) in electronicData"
                :key="index"
                class="card settings__menu"
              >
                <div class="settings__menu-title">
                  <h3>{{ item["DOCUMENT_NAME"] }}</h3>
                  <div class="status_label">
                    <span
                      :class="`color_tag--${
                        item['READ_FLG'] == 1 ? 'black' : 'main'
                      }`"
                    >
                      {{ item["READ_FLG"] == 1 ? "既読" : "未読" }}
                    </span>
                    <span
                      class="confirm_label"
                      v-if="item['AGREEMENT_FLG'] == 1"
                      :class="`color_tag--${
                        item['READ_FLG'] == 1 ? 'black' : 'main'
                      }`"
                    >
                      {{ item["CONFIRM_FLG"] == 1 ? "同意済" : "未同意" }}
                    </span>
                  </div>
                </div>
                <p class="settings__menu-date">{{ item["BASE_D"] }}</p>
                <div class="settings__menu-box">
                  <a
                    :href="item['DOCUMENT_PDF_PATH']"
                    class="button button__main"
                    target="_blank"
                    @click="handleReadDoc(item)"
                    >PDF</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="settings__confirm">
            <router-link :to="{ name: 'settings' }" v-slot="{ href, navigate }" custom>
              <a
                :href="href"
                @click="navigate"
                class="button button__white button__full button__back"
              >
                <img src="/assets/images/arrow_back_g.png" alt="" />
                口座情報・設定画面へ</a
              >
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/electronicDelivery/index"></script>

<style scoped></style>
