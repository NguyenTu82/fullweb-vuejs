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
        <a href="/reference/condition/us">米国株式</a>
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
        <h1 class="title">資産状況（米国株式）</h1>
        <div class="container card">
          <div class="tabs tabs--pagetab">
            <router-link to="/reference/condition/jp" class="tabs__item"
              >国内株式</router-link
            >
            <router-link to="/reference/condition/us" class="tabs__item--selected"
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
                      stockProfit.SECURITIES_VALUE
                        ? commonJs.handNumberInt(stockProfit.SECURITIES_VALUE)
                        : "-"
                    }}<small>円</small>
                  </p>
                </div>
                <div class="property__infomation-detail">
                  <h2>評価損益(率)</h2>
                  <p
                    :class="{
                      high: Number(stockProfit.PROFIT_AMOUNT) > 0,
                      black: Number(stockProfit.PROFIT_AMOUNT) == 0,
                      low: Number(stockProfit.PROFIT_AMOUNT) < 0,
                    }"
                  >
                    {{ Number(stockProfit.PROFIT_AMOUNT) > 0 ? "+" : "" }}{{
                      stockProfit.PROFIT_AMOUNT
                        ? commonJs.handNumberInt(stockProfit.PROFIT_AMOUNT)
                        : "-"
                    }}<small>円</small
                    ><small
                      >(
                      {{ Number(stockProfit.PROFIT_AMOUNT) > 0 ? "+" : "" }}{{
                        stockProfit.PROFIT_AMOUNT_RATE
                          ? `${commonJs.handNotNumberFormat(
                              stockProfit.PROFIT_AMOUNT_RATE
                            )}%`
                          : "-"
                      }})</small
                    >
                  </p>
                </div>
              </div>
              <div class="property__infomation-right">
                <div class="property__infomation-text">
                  <p>
                    {{
                      commonJs.handleDateMinute(stockProfit.PROFIT_DT)
                    }}現在(15分ディレイ表示)
                  </p>
                  <p>
                    評価為替レート：{{
                      stockProfit.BASE_EXCHANGE_RATE
                        ? commonJs.number_format(
                            stockProfit.BASE_EXCHANGE_RATE,
                            2
                          )
                        : ""
                    }}(USD/JPY)
                  </p>
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
                  <h2>{{ item.BRAND_NM_DISP }}</h2>
                  <div class="list_card__title-infomation">
                    <p class="color_tag--main">
                      {{ accountType(item.ACCOUNT_TYPE) }}口座
                    </p>
                  </div>
                </div>
                <div class="list_card__subtext">
                  <h3>{{ item.BRAND_CD }} | {{ item.MARKET_CD }}</h3>
                </div>
                <div class="list_card__detail">
                  <div class="list_card__detail-price">
                    <p>時価評価額</p>
                    <p class="list_card__detail-price--black">
                      <strong>{{
                        item.SECURITIES_VALUE
                          ? commonJs.handNumberInt(item.SECURITIES_VALUE)
                          : "-"
                      }}</strong
                      ><small>円</small>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>評価損益</p>
                    <p
                      :class="{
                        high: Number(item.PROFIT_AMOUNT) > 0,
                        black: Number(item.PROFIT_AMOUNT) == 0,
                        low: Number(item.PROFIT_AMOUNT) < 0,
                      }"
                      v-if="item.ACCOUNT_TYPE != 1"
                    >
                      <strong>
                        {{ Number(item.PROFIT_AMOUNT) > 0 ? "+" : "" }}{{
                          item.PROFIT_AMOUNT
                            ? commonJs.handNumberInt(item.PROFIT_AMOUNT)
                            : "-"
                        }}</strong
                      ><small>円</small
                      ><small
                        >(
                        {{ Number(item.PROFIT_AMOUNT) > 0 ? "+" : "" }}{{
                          commonJs.handNotNumberFormat(item.PROFIT_RATE)
                        }}%)</small
                      >
                    </p>
                    <p class="black" v-else>
                      <strong>-</strong>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>評価価格</p>
                    <p class="list_card__detail-price">
                      <strong>{{
                        item.SECURITIES_VALUE
                          ? commonJs.number_format(item.PRICE.CURRENT_PRICE, 2)
                          : "-"
                      }}</strong
                      ><small>{{
                        item.EXCHANGERATE ? item.EXCHANGERATE.CURRENCY_CD : ""
                      }}</small>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>保有数量</p>
                    <p class="list_card__detail-price">
                      <strong>{{
                        sellable_qty_filter(item.SELLABLE_QTY)
                      }}</strong
                      ><small>株（口）</small>
                    </p>
                  </div>
                  <div class="list_card__detail-price">
                    <p>平均取得単価（参考）</p>
                    <p
                      class="list_card__detail-price"
                      v-if="item.ACCOUNT_TYPE != 1"
                    >
                      <strong>{{
                        item.AVE_ACQUISITION_PRICE
                          ? commonJs.number_format(
                              item.AVE_ACQUISITION_PRICE,
                              2
                            )
                          : "-"
                      }}</strong
                      ><small>USD</small>
                    </p>
                    <p class="black" v-else>
                      <strong>-</strong>
                    </p>
                  </div>
                  <div class="list_card__detail-order">
                    <a
                      :class="[
                        item.SELLABLE_STATUS == 0 ? 'button__disabled' : '',
                        'button',
                        item.SELLABLE_STATUS == 1 ? 'button__secondary' : '',
                        'button__medium',
                      ]" style="cursor:pointer;"
                    @click="
                            toUsBuy(
                              item.BRAND_ID,
                            )
                            "
                      >買注文</a
                    >
                    <a
                      :class="[
                        item.BUYABLE_STATUS == 0 ? 'button__disabled' : '',
                        'button',
                        item.BUYABLE_STATUS == 1 ? 'button__primary' : '',
                        'button__medium',
                      ]" style="cursor:pointer;"
                    @click="
                            toUsSell(
                              item.BRAND_ID,
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
import conditionUs from "@/assets/js/page/reference/condition/conditionUs";
export default conditionUs;
</script>
