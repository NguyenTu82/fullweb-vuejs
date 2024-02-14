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
        <a href="/reference/condition/"><strong>資産状況</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/condition/us">国内株式</a>
      </nav>
    </TopInfo>

    <section class="reference_order">
      <div class="wrapper">
        <div class="grid_buttons">
          <router-link
            to="/reference/condition"
            class="button__square--selected"
            >資産状況</router-link
          >
          <router-link to="/reference/order/jp" class="button__square"
            >注文一覧</router-link
          >
          <router-link to="/reference/contract/jp" class="button__square"
            >約定一覧</router-link
          >
          <router-link to="/reference/deposit" class="button__square"
            >預り金増減</router-link
          >
        </div>
        <h1 class="title">資産状況（国内株式）</h1>
        <div class="container card">
          <div class="tabs tabs--pagetab">
            <router-link
              to="/reference/condition/jp"
              class="tabs__item--selected"
              >国内株式</router-link
            >
            <router-link to="/reference/condition/us" class="tabs__item"
              >米国株式</router-link
            >
            <router-link
              to="/reference/condition/invest"
              class="tabs__item"
              v-if="processEnv != 'NCB'"
              >投資信託</router-link
            >
          </div>
          <div class="l_tab_wrapper">
            <div class="property__infomation">
              <div class="property__infomation-left">
                <div class="property__infomation-detail">
                  <h2>資産合計</h2>
                  <p>
                    {{
                      stockProfit.total_stock_asset
                        ? commonJs.handNumberInt(stockProfit.total_stock_asset)
                        : "-"
                    }}<small>円</small>
                  </p>
                </div>
                <div class="property__infomation-detail">
                  <h2>評価損益(率)</h2>
                  <p
                    :class="{
                      high: Number(stockProfit.total_stock_val) > 0,
                      black: Number(stockProfit.total_stock_val) == 0,
                      low: Number(stockProfit.total_stock_val) < 0,
                    }"
                  >
                    {{ Number(stockProfit.total_stock_val) > 0 ? "+" : "" }}{{
                      stockProfit.total_stock_val
                        ? commonJs.handNumberInt(stockProfit.total_stock_val)
                        : "-"
                    }}<small>円</small
                    ><small>
                      ({{ Number(stockProfit.total_stock_val) > 0 ? "+" : "" }}
                      {{
                        // (stockProfit.PROFIT_AMOUNT_RATE * 100).toFixed(2)
                        `${stockProfit.total_stock_val_per  || stockProfit.total_stock_val_per == 0 ? `${stockProfit.total_stock_val_per}%` : "-" }`
                      }})</small>
                  </p>
                </div>
              </div>
              <div class="property__infomation-right">
                <div class="property__infomation-text">
                  <p>{{ commonJs.handleDateMinute(times) }}現在</p>
                </div>
                <div>
                  <img
                    src="/assets/images/reload.png"
                    alt="reload"
                    @click="getData()"
                    class="click"
                  />
                </div>
              </div>
            </div>
            <div class="grid_list">
              <div
                class="list_card"
                v-for="(item, index) in dataList"
                :key="index"
              >
                <div class="list_card__title">
                  <h2>{{ item.stock_nm }}</h2>
                  <div class="list_card__title-infomation">
                    <p class="color_tag--main">{{ item.account_typ_nm }}口座</p>
                  </div>
                </div>
                <div class="list_card__subtext">
                  <h3>({{ coedPro(item.stock_cd) }})</h3>
                </div>
                <div class="list_card__detail">
                  <div class="list_card__detail-price">
                    <p>時価評価額</p>
                    <p class="list_card__detail-price--black">
                      <strong>{{
                        item.mkt_val
                          ? commonJs.handNumberInt(item.mkt_val)
                          : "-"
                      }}</strong
                      ><small>円</small>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>評価損益</p>
                    <p class="black" v-if="item.account_typ_nm === '一般'">-</p>
                    <p
                      :class="[
                        { high: Number(item.eval) > 0 },
                        { black: Number(item.eval) == 0 },
                        { low: Number(item.eval) < 0 },
                      ]"
                      v-else
                    >
                      <strong
                        >{{ Number(item.eval) > 0 ? "+" : ""
                        }}{{
                          item.eval ? commonJs.handNumberInt(item.eval) : "-"
                        }}</strong
                      ><small>円</small
                      ><small
                        >({{ Number(item.eval) > 0 ? "+" : ""
                        }}{{
                          // (item.PROFIT_RATE * 100).toFixed(2)
                          item.eval_ratio
                        }}%)</small
                      >
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>評価価格</p>
                    <p class="list_card__detail-price">
                      <strong>{{
                        item.eval_price
                          ? commonJs.number_format(item.eval_price, 0)
                          : "-"
                      }}</strong
                      ><small>円</small>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>保有数量</p>
                    <p class="list_card__detail-price">
                      <strong>{{ sellabl_eqty_filter(item.quantity) }}</strong
                      ><small>株（口）</small>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>平均取得単価（参考）</p>
                    <p
                      class="list_card__detail-price"
                      v-if="item.account_typ_nm === '一般'"
                    >
                      -
                    </p>
                    <p class="list_card__detail-price" v-else>
                      <strong>{{
                        item.avg_price
                          ? commonJs.number_format(item.avg_price, 0)
                          : "-"
                      }}</strong
                      ><small>円</small>
                    </p>
                  </div>
                  <div class="list_card__detail-order">
                    <a
                      class="button button__secondary button__medium" style="cursor:pointer;"
                      @click="
                              toBuyStockJP(
                                item.stock_cd,
                                item.priority_exchange_cd,
                              )
                              "
                      >買注文</a
                    >
                    <a
                      class="button button__primary button__medium" style="cursor:pointer;"
                      @click="
                              toSellStockJP(
                                item.stock_cd,
                                item.priority_exchange_cd,
                              )
                              "
                      >売注文</a
                    >
                  </div>
                  <p
                    class="list_card__detail-announcement"
                    v-if="item.SELLABLE_STATUS == 0"
                  >
                    現在、買い注文を停止しております。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import conditionJp from "@/assets/js/page/reference/condition/conditionJp";
export default conditionJp;
</script>
