<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/reference/condition/"><strong>資産・照会</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/order/jp/"><strong>注文一覧</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/order/jp/">国内株式</a>
      </nav>
    </TopInfo>

    <section class="reference_order">
      <div class="wrapper">
        <div class="grid_buttons">
          <router-link to="/reference/condition" class="button__square"
            >資産状況</router-link
          >
          <router-link to="/reference/order/jp" class="button__square--selected"
            >注文一覧</router-link
          >
          <router-link to="/reference/contract/jp" class="button__square"
            >約定一覧</router-link
          >
          <router-link to="/reference/deposit" class="button__square"
            >預り金増減</router-link
          >
        </div>
        <h1 class="title">注文一覧</h1>
        <div class="container card">
          <div class="tabs tabs--pagetab">
            <router-link to="/reference/order/jp" class="tabs__item--selected"
              >国内株式</router-link
            >
            <router-link to="/reference/order/us" class="tabs__item">米国株式</router-link>
            <router-link
              to="/reference/order/invest"
              class="tabs__item"
              v-if="processEnv != 'NCB'"
              >投資信託</router-link
            >
          </div>
          <div class="l_tab_wrapper">
            <div class="searchbar">
              <div class="searchbar__top">
                <img src="/assets/images/search.png" alt="虫眼鏡" />
                <p>表示条件</p>
                <button
                  class="button button__main searchbar__top-button"
                  @click="openSearch()"
                >
                  条件変更
                </button>
                <button
                  @click="resetParams()"
                  class="button button__white searchbar__top-button--reset"
                >
                  リセット
                </button>
              </div>
              <div class="searchbar__bottom">
                <div class="searchbar__bottom-flex">
                  <button
                    class="searchbar__bottom-button"
                    @click="openSearch()"
                  >
                    <p class="searchbar__bottom-requirement">銘柄名検索</p>
                    <p class="searchbar__bottom-value">
                      {{ jqParams.stock_nm || "すべて" }}
                    </p>
                  </button>
                  <button
                    class="searchbar__bottom-button"
                    @click="openSearch()"
                  >
                    <p class="searchbar__bottom-requirement">売買</p>
                    <p class="searchbar__bottom-value">
                      {{ buy_sell_cls_text }}
                    </p>
                  </button>
                </div>
                <div class="searchbar__bottom-flex">
                    <!-- 西安 HDH00005_01-330 问题② 10/4 -->
                  <button
                    class="searchbar__bottom-button"
                    @click="openSearch()"
                  >
                    <p class="searchbar__bottom-requirement">取引方法</p>
                    <p class="searchbar__bottom-value">
                      {{ otc_consign_cls_text }}
                    </p>
                  </button>
                  <button
                    class="searchbar__bottom-button"
                    @click="openSearch()"
                  >
                    <p class="searchbar__bottom-requirement">状況</p>
                    <p class="searchbar__bottom-value">
                      {{ order_status_text }}
                    </p>
                  </button>
                </div>
                <div class="searchbar__bottom-flex">
                  <button
                    class="searchbar__bottom-button"
                    @click="openSearch()"
                  >
                    <p class="searchbar__bottom-requirement">注文日</p>
                    <p
                      class="searchbar__bottom-value"
                      v-if="!ord_day_from_text && !ord_day_to_text"
                    >
                      すべて
                    </p>
                    <p class="searchbar__bottom-value" v-else>
                      {{ ord_day_from_text }}~{{ ord_day_to_text }}
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div class="grid_list" v-if="list && list.length > 0">
              <div class="list_card" v-for="(item, index) in list" :key="index">
                <div class="list_card__title">
                  <h2>{{ item.company || "--" }}</h2>
                  <div class="list_card__title-infomation">
                    <p class="color_tag--main">
                      {{ item.otc_consign_nm || "--" }}
                    </p>
                    <p class="color_tag--main">
                      {{ orderStatusDisplay(item) }}
                    </p>
                    <p
                      :class="{
                        'color_tag--primary': item.buy_sell_cls == 1,
                        'color_tag--secondary': item.buy_sell_cls == 3,
                      }"
                    >
                      {{ item.buy_sell_nm }}
                    </p>
                    <p
                      class="color_tag--secondary"
                      v-if="
                        [0, 1, 2, 3, 4, 5, 11, 12].includes(item.ORDER_STATUS)
                      "
                    >
                      {{ item.ORDER_STATUS_DISP }}
                    </p>
                    <p
                      class="color_tag--black"
                      v-if="[].includes(item.ORDER_STATUS)"
                    >
                      {{ item.ORDER_STATUS_DISP }}
                    </p>
                  </div>
                </div>
                <div class="local-head date-time">
                  <div class="list_card__subtext">
                    <!-- 西安 HDH00005_01-330 问题③ 10/4 -->
                    <h3 v-if="item.otc_consign_nm === '店頭'">{{item.BRAND_CD}}</h3>
                    <h3 v-else>{{ item.stock }}</h3>
                    <p v-if="item.ORDER_ACCEPT_DT">
                      注文日時<span>{{
                        commonJs.handleDateMinute(item.ORDER_ACCEPT_DT)
                      }}</span>
                    </p>
                  </div>
                  <div class="list_card__detail">
                    <div class="list_card__detail-price">
                      <p>注文方法</p>
                      <p>
                        <template v-if="item.otc_consign_cls == 2">
                          <template
                            v-if="
                              item.buy_sell_cls == 3 || item.buy_sell_cls == 1
                            "
                          >
                            <!-- 1:成行 2:指値 -->
                            {{ item.price_cls_nm }}
                    <!-- 西安 HDH00005_01-330 问题⑤ 10/4 -->
                            <template v-if="item.price_cls == 2">
                              /
                              {{ item.ORDER_PRICE ? commonJs.handNumFloat(item.ORDER_PRICE) : 0 }} 円
                            </template>
                          </template>
                        </template>
                        <!-- 店投 -->
                        <template v-if="item.otc_consign_cls == 1">
                          <!-- 买 3-->
                          <template v-if="item.buy_sell_cls == 3">
                            <!-- 1:金額指定　　  -->
                            <template v-if="item.otc_order_cls == 1">
                              金額指定
                              {{ commonJs.handNumFloat(item.ORDER_AMOUNT) }}
                              円
                            </template>
                            <!-- 4:全部買付  -->
                            <template v-else-if="item.otc_order_cls == 4">
                              預り金全部買付
                              {{ commonJs.handNumFloat(item.ORDER_AMOUNT) }}
                              円
                            </template>
                          </template>
                          <!-- 卖 1-->
                          <template v-else>
                            <!-- 1:金額指定　 -->
                            <template v-if="item.otc_order_cls == 1">
                              金額指定
                              {{ commonJs.handNumFloat(item.ORDER_AMOUNT) }}
                              円
                            </template>
                            <!-- 2:全部売却 -->
                            <template v-if="item.otc_order_cls == 2">
                              全部売却
                              <template v-if="item.order_status_num == 1">
                                {{ commonJs.handNumFloat(item.ORDER_AMOUNT) }}
                                円
                              </template>
                            </template>
                            <!-- 3:単元未満売却  -->
                            <template v-if="item.otc_order_cls == 3">
                              単元未満売却
                              <template v-if="item.order_status_num == 1">
                                {{ commonJs.handNumFloat(item.ORDER_AMOUNT) }}
                                円
                              </template>
                            </template>
                          </template>
                        </template>
                      </p>
                    </div>
                    <div
                      class="list_card__detail-price"
                      v-if="item.otc_consign_cls == 2"
                    >
                      <p>注文株数</p>
                      <p>
                        <strong>{{
                          commonJs.handNumFloat(item.ORDER_QTY)
                        }}</strong
                        ><small>株（口）</small>
                      </p>
                    </div>
                  </div>
                  <div class="list_card__detail-button">
                    <a
                      @click="goOrderDetail(item)"
                      class="button button__main"
                      >{{ renderBtnDetail(item) }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <section :class="{ hidden: !showModal }" class="modal">
              <div class="tab_wrapper">
                <div class="modal__content card">
                  <h2>表示条件</h2>
                  <div class="table">
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>銘柄名·銘柄コード</p>
                      </div>
                      <div class="table__box-value">
                        <input
                          type="text"
                          placeholder="銘柄名·銘柄コード"
                          class="modal__input"
                          v-model="jqParams.stock_nm"
                        />
                      </div>
                    </div>
                    <div
                      class="table__box"
                      v-for="(item, index) in selectData"
                      :key="index"
                    >
                      <div class="table__box-title">
                        <p>{{ item.title }}</p>
                      </div>
                      <div class="table__box-value">
                        <select
                          class="selectbox selectbox__gray"
                          name="transaction"
                          v-model="jqParams[`${item.abbr}`]"
                        >
                          <option
                            v-for="(j, i) in item.items"
                            :key="i"
                            :value="j.id"
                          >
                            {{ j.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>注文日</p>
                      </div>
                      <div class="table__box-value modal__datepicker modal__datepicker_hyphen">
                        <input
                          type="date"
                          v-model="jqParams.ord_day_from"
                          :data-date="getOrdDayFrom ? getOrdDayFrom : '-'"
                        />
                        <p>〜</p>
                        <input
                          type="date"
                          v-model="jqParams.ord_day_to"
                          :data-date="getOrdDayTo ? getOrdDayTo : '-'"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal__buttons">
                    <button
                      class="button button__white button__medium modal__close"
                      @click="closeModal"
                    >
                      キャンセル
                    </button>
                    <button
                      class="button button__main button__medium"
                      @click="openModal"
                    >
                      変更する
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import orderJp from "@/assets/js/page/reference/order/orderJp";
export default orderJp;
</script>
