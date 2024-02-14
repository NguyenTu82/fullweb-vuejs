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
        <a href="/reference/contract/jp/"><strong>約定一覧</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/contract/jp/">国内株式</a>
      </nav>
    </TopInfo>

    <section class="reference_order">
      <div class="wrapper">
        <div class="grid_buttons">
          <router-link to="/reference/condition" class="button__square"
            >資産状況
          </router-link>
          <router-link to="/reference/order/jp" class="button__square"
            >注文一覧
          </router-link>
          <router-link to="/reference/contract/jp" class="button__square--selected"
            >約定一覧
          </router-link>
          <router-link to="/reference/deposit" class="button__square"
            >預り金増減
          </router-link>
        </div>
        <h1 class="title">約定一覧</h1>
        <div class="container card">
          <div class="tabs tabs--pagetab">
            <router-link to="/reference/contract/jp" class="tabs__item--selected"
              >国内株式
            </router-link>
            <router-link to="/reference/contract/us" class="tabs__item"
              >米国株式
            </router-link>
            <router-link
              to="/reference/contract/invest"
              class="tabs__item"
              v-if="processEnv != 'NCB'"
              >投資信託
            </router-link>
          </div>
          <div class="l_tab_wrapper">
            <div class="searchbar">
              <div class="searchbar__top">
                <img src="/assets/images/search.png" alt="虫眼鏡" />
                <p>表示条件</p>
                <button
                  class="button button__main searchbar__top-button"
                  @click="showModal = true"
                >
                  条件変更
                </button>
                <button
                  class="button button__white searchbar__top-button--reset"
                  @click="clearSearch"
                >
                  リセット
                </button>
              </div>
              <div class="searchbar__bottom">
                <div class="searchbar__bottom-flex">
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">
                      銘柄名·銘柄コード
                    </p>
                    <p class="searchbar__bottom-value">
                      {{ params.stock_nm || "すべて" }}
                    </p>
                  </button>
                </div>
                <div class="searchbar__bottom-flex">
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">
                      売買 {{ buy_sell_cls_text || "すべて" }}
                    </p>
                    <p class="searchbar__bottom-value"></p>
                  </button>
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">
                      取引方法 {{ otc_consign_cls_text || "すべて" }}
                    </p>
                    <p class="searchbar__bottom-value"></p>
                  </button>
                </div>
                <div class="searchbar__bottom-flex">
                  <button
                    class="searchbar__bottom-button"
                    @click="showModal = true"
                  >
                    <p class="searchbar__bottom-requirement">約定日</p>
                    <p
                      class="searchbar__bottom-value"
                      v-if="!from_date_text && !to_date_text"
                    >
                      すべて
                    </p>
                    <p class="searchbar__bottom-value" v-else>
                      {{ from_date_text }}~{{ to_date_text }}
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
                    <p class="color_tag--main">{{ item.otc_consign_nm }}</p>
                    <p class="color_tag--main">
                      {{ orderStatusDisplay(newList, item) }}
                    </p>
                    <p
                      :class="{
                        'color_tag--secondary': item.buy_sell_cls == 3,
                        'color_tag--primary': item.buy_sell_cls == 1,
                      }"
                    >
                      {{ item.buy_sell_nm }}
                    </p>
                    <div
                      class="color_tag--main"
                      v-if="
                        [0, 1, 2, 3, 4, 5, 11, 12].includes(item.ORDER_STATUS)
                      "
                    >
                      {{ item.ORDER_STATUS_DISP }}
                    </div>
                    <div
                      class="color_tag--main"
                      v-if="[].includes(item.ORDER_STATUS)"
                    >
                      {{ item.ORDER_STATUS_DISP }}
                    </div>
                  </div>
                </div>
                <div class="local-head date-time">
                  <div class="type-group">
                    <p
                      class="color_tag--main"
                      v-if="item.fund_attr_cls_nm && item.fund_attr_cls != 1"
                    >
                      {{ item.fund_attr_cls_nm }}
                    </p>

                    <p
                      class="color_tag--main"
                      v-for="(a, b) in item.fund_type_list"
                      :key="b"
                    >
                      {{ a.fund_type_nm }}
                    </p>
                  </div>
                  <div class="list_card__subtext">
                    <h3>{{ checkShowStock(item) }}</h3>
                    <p>
                      最終約定日時<span>{{
                        commonJs.handleDateMinute(item.cont_dt)
                      }}</span>
                    </p>
                  </div>
                  <div class="list_card__detail">
                    <div class="list_card__detail-price">
                      <p>受渡金額</p>
                      <p v-if="item.SETTLE_AMOUNT">
                        {{ common.handNumFloat(item.SETTLE_AMOUNT)
                        }}<small>円</small>
                      </p>
                      <p v-else>-</p>
                    </div>
                    <div class="list_card__detail-price">
                      <p>数量</p>
                      <p>
                        {{ common.handNumFloat(item.EXECUTED_QTY)
                        }}<small>株（口）</small>
                      </p>
                    </div>
                    <div class="list_card__detail-price">
                      <p>譲渡損益</p>
                      <p v-if="item.GROSS_PROFIT && item.GROSS_PROFIT != '-'">
                        {{ common.handNumFloat(item.GROSS_PROFIT) }}
                        <small v-if="item.GROSS_PROFIT != '-'">円</small>
                      </p>
                      <p v-else>-</p>
                    </div>
                  </div>
                  <div class="list_card__detail-button">
                    <a
                      @click="goContractJpDetail(item)"
                      class="button button__main"
                      >約定明細</a
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
                        <p>銘柄名・銘柄コード</p>
                      </div>
                      <div class="table__box-value">
                        <input
                          type="text"
                          placeholder="銘柄名・銘柄コード"
                          class="modal__input"
                          v-model="params.stock_nm"
                        />
                      </div>
                    </div>
                    <div
                      class="table__box"
                      v-for="(item, index) in searchData"
                      :key="index"
                    >
                      <div class="table__box-title">
                        <p>{{ item.title }}</p>
                      </div>
                      <div class="table__box-value">
                        <select
                          class="selectbox selectbox__gray"
                          name="transaction"
                          v-model="params[`${item.abbr}`]"
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
                        <p>約定日</p>
                      </div>
                      <div class="table__box-value modal__datepicker modal__datepicker_hyphen">
                        <input
                          type="date"
                          v-model="params.cont_day_from"
                          :data-date="getTradeDayFrom ? getTradeDayFrom : '-'"
                        />
                        <p>〜</p>
                        <input
                          type="date"
                          v-model="params.cont_day_to"
                          :data-date="getTradeDayTo ? getTradeDayTo : '-'"
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
                      @click="searchChange"
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
import contractJp from "@/assets/js/page/reference/contract/contractJp";

export default contractJp;
</script>
