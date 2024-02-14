<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/home/"><strong>投資信託</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link to="/transaction/investment/brand/"
          ><strong>取扱銘柄一覧</strong></router-link
        >
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a>個別銘柄情報</a>
      </nav>
    </TopInfo>
    <section class="brand investment-brand">
      <div class="wrapper">
        <h1 class="title">銘柄情報</h1>
        <div class="container card">
          <div class="l_tab_wrapper" v-if="dataInvestInfo">
            <h2 class="detail__title">{{ dataInvestInfo.fund_abb_nm }}</h2>
            <div class="brand__tags custom">
              <p
                class="tag"
                v-for="(label, index) in dataInvestInfo.brandLabels"
                :key="index"
              >
                {{ label.name }}
              </p>
            </div>
            <div class="brand__reference">
              <div class="brand__reference-value--jp">
                <p>基準価格</p>
                <h2>
                  {{ handNumberInt(dataInvestInfo.price) }}<small>円</small>
                </h2>
              </div>
              <div class="brand__reference-rate--jp">
                <p>前日比（率）</p>
                <h2
                  class="comparison_text"
                  :class="
                    dataInvestInfo.day_before_rate < 0
                      ? 'low'
                      : dataInvestInfo.day_before_rate > 0
                      ? 'high'
                      : ''
                  "
                >
                  <span
                    v-html="dataInvestInfo.day_before_rate > 0 ? `+` : dataInvestInfo.day_before_rate === 0 ? `` : '-'"
                  ></span
                  >{{
                    dataInvestInfo.day_before_rate
                      ? dataInvestInfo.day_before_rate > 0
                        ? `${handNumberIntCustom(
                            dataInvestInfo.day_before_rate
                          )}`
                        : `${handNumberIntCustom(
                            dataInvestInfo.day_before_rate
                          )}`
                      : "0"
                  }}<small>円</small>
                  <small>
                    ({{
                      dataInvestInfo.day_before_ratio
                        ? dataInvestInfo.day_before_ratio > 0
                          ? `+${handNumber(dataInvestInfo.day_before_ratio)}`
                          : `${handNumber(dataInvestInfo.day_before_ratio)}`
                        : "0.00 "
                    }}%)
                  </small>
                </h2>
              </div>
            </div>
            <div class="brand__introduction">
              <p v-if="dataInvestInfo.fund_nicknm">愛称</p>
              <p v-if="dataInvestInfo.fund_nicknm">
                : {{ dataInvestInfo.fund_nicknm }}
              </p>
              <p>投信会社</p>
              <p>: {{ dataInvestInfo.inv_trust_nm }}</p>
              <p></p>
              <p class="brand__introduction-accordion">
                <span
                  v-if="dataInvestInfo.fund_summary"
                  :class="[paragraphOpen && 'open', 'paragraph']"
                  :style="{
                    height: paragraphOpen
                      ? longHeightObj.height
                      : shortHeightObj.height,
                  }"
                >
                  {{ dataInvestInfo.fund_summary }}
                </span>
                <img
                  class="image-droptext"
                  :class="paragraphOpen && 'up'"
                  src="/assets/images/triangle_s_top.png"
                  alt="三角"
                  @click="pullDownParagraph"
                />
              </p>
            </div>
            <div class="brand__data--jp card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title table__box-title">
                    <p>購入時手数料</p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <p
                      v-if="
                        dataInvestInfo.listData &&
                        dataInvestInfo.listData.length == 0
                      "
                    >
                      無料
                    </p>
                    <p
                      v-for="(item, index) in dataInvestInfo.listData"
                      :key="index"
                    >
                      {{ checkAMT(item) }}
                    </p>
                  </div>
                </div>
                <div
                  class="table__box"
                  v-for="(item, index) in dataInvestInfo.buyInfoList"
                  :key="index"
                >
                  <div class="table__box-title table__box-title">
                    <p>{{ item.title }}</p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <p>{{ item.value }}</p>
                    <p class="brand__data--error" v-if="item.time">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      {{ item.tip }}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div class="brand__data-dummy--half chart-custom">
                  <fund-chart
                    @updateFundChartPeriod="updateFundChartPeriod"
                    :dataFundChart="dataFundChart"
                    :fund_chart_period="fund_chart_period"
                  ></fund-chart>
                </div>
              </div>
              <div class="card brand__report">
                <div class="brand__report-return">
                  <p>
                    直近3年リターン
                    <a
                      href="https://www.cheer-sec.co.jp/app-help/B412.html#return_3y"
                      target="_blank"
                    >
                      <img src="/assets/images/question.png" alt="?" />
                    </a>
                  </p>

                  <p>
                    <strong
                      >{{
                        dataInvestInfo.trendData.return_last_three_years ||
                        "0.00"
                      }}<small>%</small></strong
                    >
                  </p>
                </div>
                <div class="brand__report-return">
                  <p>
                    純資産
                    <a
                      href="https://www.cheer-sec.co.jp/app-help/B412.html#net_assets"
                      target="_blank"
                    >
                      <img src="/assets/images/question.png" alt="?" />
                    </a>
                  </p>
                  <p>
                    <strong
                      >{{ dataInvestInfo.trendData.capital || "0.00"
                      }}<small>億円</small></strong
                    >
                  </p>
                </div>
                <div class="brand__report-return">
                  <div>
                    <p>
                      直近決算分配金
                      <a
                        href="https://www.cheer-sec.co.jp/app-help/B412.html#dividend"
                        target="_bank"
                      >
                        <img src="/assets/images/question.png" alt="?" />
                      </a>
                    </p>
                    <p>
                      <span>{{
                        dataInvestInfo.trendData.last_dividend_d
                          ? "(" + dataInvestInfo.trendData.last_dividend_d + ")"
                          : ""
                      }}</span>
                    </p>
                  </div>
                  <p>
                    <strong
                      >{{ dataInvestInfo.trendData.last_dividend || "-"
                      }}<small>円</small></strong
                    >
                  </p>
                </div>
                <p class="brand__data--error">
                  <img src="/assets/images/exclamation.png" alt="!" />
                  当該実績は過去のものであり、将来の運用成果等を保証するものではありません。
                </p>
              </div>
              <div class="card brand__report">
                <div
                  class="brand__report-list"
                  v-for="(pdf, index) in dataInvestInfo.document_list"
                  :key="index"
                >
                  <a
                    target="_blank"
                    :href="pdf.doc_pdf_path"
                    class="button button__main button__chip"
                    >PDF</a
                  >
                  <a target="_blank" :href="pdf.doc_pdf_path"
                    ><p>{{ showName(pdf.doc_nm) }}</p></a
                  >
                </div>
              </div>
              <p class="brand__data-provider">提供元：株式会社時事通信社</p>
            </div>
          </div>
          <div class="brand__modal" v-if="dataInvestInfo">
            <button
              class="button button__medium"
              :class="
                dataInvestInfo.buyable_flg == 1
                  ? 'button__secondary'
                  : 'button__disabled'
              "
              @click="dataInvestInfo.buyable_flg == 1 && openPopup('BUY')"
            >
              購入
            </button>
            <button
              class="button button__medium"
              :class="
                dataInvestInfo.sellable_flg == 1
                  ? 'button__primary'
                  : 'button__disabled'
              "
              href="/transaction/investment/brand/modal-2.html"
              @click="dataInvestInfo.sellable_flg == 1 && openPopup('SELL')"
            >
              解約
            </button>
          </div>
        </div>
      </div>
      <PopupPriceAmount
        ref="mychild"
        :open="showOptionPanel"
        @hidePopup="hidePopup"
        :stockHandleType="stockHandleType"
        @handleClickPopupData="handleClickPopupData"
      />
    </section>
  </main>
</template>
<script src="@/assets/js/page/transaction/investment/brand/detail.js"></script>
<style scoped></style>
