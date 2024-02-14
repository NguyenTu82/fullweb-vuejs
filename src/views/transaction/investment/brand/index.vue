<template>
  <main>
    <ScrollToTopBtn />
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/home" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>投資信託</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/transaction/investment/brand">銘柄一覧</a>
      </nav>
    </TopInfo>
    <section class="brand">
      <div class="wrapper">
        <GirdButton :value="navStock" />
        <h1 class="title">取扱銘柄一覧</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="searchbar">
              <div class="searchbar__top searchbar__top--between">
                <div class="searchbar__top">
                  <img src="/assets/images/search.png" alt="虫眼鏡" />
                  <p @click="showModal">表示条件</p>
                  <button
                    class="button button__main searchbar__top-button"
                    @click="showModal"
                  >
                    条件変更
                  </button>
                  <button
                    class="button button__white searchbar__top-button--reset"
                    @click="resetFilter"
                  >
                    リセット
                  </button>
                </div>
                <div class="searchbar__top-caution">
                  <a href="https://www.cheer-sec.co.jp/other/app-help/A230.html"
                    >ご注意事項 <img src="/assets/images/question.png" alt="?"
                  /></a>
                </div>
              </div>
              <div class="searchbar__bottom">
                <div class="searchbar__bottom-flex">
                  <button class="searchbar__bottom-button" @click="showModal">
                    <p class="searchbar__bottom-requirement">銘柄名</p>
                    <p
                      class="searchbar__bottom-value favorite__bottom-textSearch investment__brand"
                    >
                      {{ keyword || "すべて" }}
                    </p>
                  </button>
                </div>
                <div class="searchbar__bottom-flex">
                  <button class="searchbar__bottom-button" @click="showModal">
                    <p class="searchbar__bottom-requirement">分配金受取方法</p>
                    <p class="searchbar__bottom-value">
                      {{
                        devidend_cls == ""
                          ? "すべて"
                          : devidend_cls == 1
                          ? "分配金受取型"
                          : devidend_cls == 2
                          ? "再投資型"
                          : "すべて"
                      }}
                    </p>
                  </button>
                  <button class="searchbar__bottom-button" @click="showModal">
                    <p class="searchbar__bottom-requirement">ファンドタイプ</p>
                    <p class="searchbar__bottom-value">
                      {{ renderType ? renderType.fund_type_nm : "すべて" }}
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div
              v-if="brandList.length === 0"
              class="gird_list_null gird_list_null--deflection"
            >
              <span v-show="keyword || devidend_cls || fund_type"
                >該当する銘柄はありません。</span
              >
              <span>条件を変えて検索してください。</span>
            </div>
            <div class="grid_list">
              <a
                v-for="(brand, index) in dataListBrandIt"
                :key="index"
                @click="handleBackUsDetail(brand['inv_trust_assoc_cd'])"
                class="list_card invest"
              >
                <div class="list_card__title list_card__title--two">
                  <h2>{{ brandName(brand) }}</h2>
                </div>
                <div class="list_card__subtext">
                  <div class="list_card__type-tags">
                    <p
                      class="tag"
                      v-for="(type, key) in listBrand(brand)"
                      :key="key"
                    >
                      {{ type["fund_type_nm"] }}
                    </p>
                  </div>
                </div>
                <div class="list_card__detail">
                  <div class="list_card__detail-price">
                    <p>基準価格</p>
                    <p class="list_card__detail-price">
                      <strong>{{ handNumberInt(brand.price) }}</strong
                      ><small>円</small>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>前日比（率）</p>
                    <p
                      :class="[
                        'comparison_text--card comparison_text--table',
                        brand.day_before_rate > 0 ? 'high' : brand.day_before_rate < 0 ? 'low' : '',
                      ]"
                    >
                      {{ brand.day_before_rate >= 0 ? "+" : ""
                      }}{{ brand.day_before_rate }}<small>円</small
                      ><small
                        >({{
                          brand.day_before_ratio
                            ? brand.day_before_ratio > 0
                              ? `+${handNumber(brand.day_before_ratio)}`
                              : `${handNumber(brand.day_before_ratio)}`
                            : "0.00 "
                        }}%)</small
                      >
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Modal
      v-show="showModalFilter"
      @hiddenModal="showModal"
      :select="dataSelectBox"
      :brandList="brandList"
      @inputSearch="(data) => updateDataInput(data)"
      @showData="(data) => updateData(data)"
      ref="modalFilter"
    ></Modal>
  </main>
</template>
<script src="@/assets/js/page/transaction/investment/brand/index"></script>
<style scoped></style>
