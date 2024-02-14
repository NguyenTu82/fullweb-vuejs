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
        <a href="/reference/condition/invest">投資信託</a>
      </nav>
    </TopInfo>

    <section class="reference_order">
      <div class="wrapper">
        <div class="grid_buttons">
          <router-link to="/reference/condition" class="button__square--selected"
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
        <h1 class="title">資産状況（投資信託）</h1>
        <div class="container card">
          <div class="tabs tabs--pagetab">
            <router-link to="/reference/condition/jp" class="tabs__item"
              >国内株式</router-link
            >
            <router-link to="/reference/condition/us" class="tabs__item"
              >米国株式</router-link
            >
            <router-link to="/reference/condition/invest" class="tabs__item--selected"
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
                      stockProfit.total_value
                        ? commonJs.handNumberInt(stockProfit.total_value)
                        : "-"
                    }}<small>円</small>
                  </p>
                </div>
                <div class="property__infomation-detail">
                  <h2>評価損益(率)</h2>
                  <p
                    :class="{
                      high: Number(stockProfit.total_eval) > 0,
                      black: Number(stockProfit.total_eval) == 0,
                      low: Number(stockProfit.total_eval) < 0,
                    }"
                  >
                      {{stockProfit.total_eval > 0 ? "+" : ""}}{{
                      stockProfit.total_eval || stockProfit.total_eval == 0
                        ? commonJs.handNumberInt(stockProfit.total_eval)
                        : "-"
                    }}<small>円</small
                    ><small
                      >(
                      {{stockProfit.total_eval_ratio > 0 ? "+" : ""}}{{
                        stockProfit.total_eval_ratio ||
                        stockProfit.total_eval == 0
                          ? `${commonJs.handNotNumberFormat(
                              stockProfit.total_eval_ratio
                            )}%`
                          : "-"
                      }})</small
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="grid_list">
              <div
                class="list_card"
                v-for="(item, index) in stockProfit.balance_detail_info_list"
                :key="index"
              >
                <div class="list_card__title list_card__title--two">
                  <h2>{{ item.fund_nm ? item.fund_nm : "-" }}{{item.fund_nickname ? `(${item.fund_nickname})` : ""}}</h2>
                  <div class="list_card__title-infomation">
                    <p class="color_tag--main">{{ item.account_cls_nm }}口座</p>
                  </div>
                </div>
                <div class="list_card__subtext"></div>
                <div class="list_card__type">
                  <br />
                  <div class="list_card__type-tags">
                    <p>
                      {{ item.dividend_cls_nm ? item.dividend_cls_nm : "-" }}
                    </p>
                    <p>{{ dataList[item.dividend_handling_cls] }}</p>
                  </div>
                </div>
                <div class="list_card__detail">
                  <div class="list_card__detail-price">
                    <p>概算評価額</p>
                    <p class="list_card__detail-price--black">
                      <strong>{{
                        item.value ? commonJs.handNumberInt(item.value) : "-"
                      }}</strong
                      ><small>円</small>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>概算評価損益</p>
                    <!-- 西安 HDH00005_01-369 ② 10/5 -->
                    <p v-if="item.account_cls_nm == '一般'">-</p>
                    <p
                      :class="{
                        high: item.eval > 0,
                        black: item.eval == 0,
                        low: item.eval < 0,
                      }"
                      v-else
                    >
                      <strong>
                        {{item.eval > 0 ? "+" : ""}}{{
                          item.eval || item.eval == 0
                            ? commonJs.handNumberInt(item.eval)
                            : "-"
                        }}</strong
                      ><small>円</small
                      ><small
                        >(
                        {{item.eval_ratio > 0 ? "+" : ""}}{{
                          commonJs.handNotNumberFormat(item.eval_ratio)
                        }}%)</small
                      >
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>保有口数</p>
                    <!-- 西安 HDH00005_01-369 ① 10/5 -->
                    <p class="list_card__detail-price">
                      {{ item.holding_qty ? commonJs.handNumberInt(item.holding_qty) : "-"
                      }}<small>口</small>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>平均取得価額（参考）</p>
                    <!-- 西安 HDH00005_01-369 ② 10/5 -->
                    <p v-if="item.account_cls_nm == '一般'">-</p>
                    <p v-else class="list_card__detail-price">
                      {{
                        item.acquisition_capital
                          ? commonJs.handNumberInt(item.acquisition_capital)
                          : "-"
                      }}<small>円</small>
                    </p>
                  </div>
                  <div class="list_card__detail-order">
                    <a
                      class="button button__secondary button__medium" style="cursor:pointer;"
                    @click="
                              toInvestStockBuyOrder(
                                item.inv_trust_assoc_cd,
                              )
                              "
                      >購入</a
                    >
                    <a
                      class="button button__primary button__medium" style="cursor:pointer;"
                    @click="
                              toInvestStockSellOrder(
                                item.inv_trust_assoc_cd,
                              )
                              "
                      >解約</a
                    >
                  </div>
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
import conditionInvest from "@/assets/js/page/reference/condition/conditionInvest";
export default conditionInvest;
</script>
