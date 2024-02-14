<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/home" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>米国株式</strong></a>
          <div class="topinfo__breadcrumb-img">
            <img src="/assets/images/arrow_gray.png" alt="矢印" />
          </div>
          <a href="/transaction/us/brand">
            <strong> 取扱銘柄一覧 </strong>
          </a>
          <div class="topinfo__breadcrumb-img">
            <img src="/assets/images/arrow_gray.png" alt="矢印" />
          </div>
          <a href="">銘柄情報</a>
        </router-link>
      </nav>
    </TopInfo>
    <section class="brand us-brand">
      <div class="wrapper">
        <h1 class="title">銘柄情報</h1>
        <div class="container card">
          <div class="l_tab_wrapper" v-if="dataUsDetail">
            <div class="brand__title">
              <h1 class="detail__title">
                {{ dataUsDetail.BRAND.BRAND_NM_DISP
                }}<span>/ {{ dataUsDetail.BRAND.BRAND_NM }}</span>
              </h1>
              <div class="brand__title-buttons">
                <a
                  v-bind:href="'https://www.cheer-sec.co.jp/service/pdf/' + dataUsDetail.BRAND.BRAND_CD + '.pdf'"
                  target="_blank"
                  class="button button__main"
                >
                  外国証券情報
                  <img
                    src="/assets/images/external-link.png"
                    alt="外部リンク"
                  />
                </a>
                <a
                  v-bind:href="'https://www.cheer-sec.co.jp/service/us-stock/ca-list.html#'+ dataUsDetail.BRAND.BRAND_CD"
                  class="button button__main"
                  target="_blank"
                >
                  お取引関連情報
                  <img
                    src="/assets/images/external-link.png"
                    alt="外部リンク"
                  />
                </a>
              </div>
            </div>
            <p class="detail__exchange">
              {{ dataUsDetail.BRAND.BRAND_CD }} |
              {{ dataUsDetail.BRAND.MARKET_CD }}
            </p>
            <p class="brand__infomation" v-if="dataUsDetail.BRAND.BRAND_INFO_TEXT">
              <span
                :class="[paragraphOpen && 'open', 'paragraph']"
                :style="{
                  height: paragraphOpen
                    ? longHeightObj.height
                    : shortHeightObj.height,
                }"
              >
                {{ dataUsDetail.BRAND.BRAND_INFO_TEXT }}
              </span>
              <img
                class="image-droptext"
                :class="paragraphOpen && 'up'"
                src="/assets/images/triangle_s.png"
                alt="三角"
                @click="pullDownParagraph"
              />
            </p>
            <div class="brand__reference">
              <div class="brand__reference-value">
                <p>参考買値</p>
                <h2>
                  {{ handNumber(dataUsDetail.TRADE_PRICE.BUY_PRICE)
                  }}<small>USD</small>
                </h2>
              </div>
              <div class="brand__reference-rate">
                <p>参考売値</p>
                <h2>
                  {{ handNumber(dataUsDetail.TRADE_PRICE.SELL_PRICE)
                  }}<small>USD</small>
                </h2>
              </div>
            </div>
            <div class="brand__date">
              <p class="brand__date-time">
                {{ timePriceInfo }}現在
                <small>(15分ディレイ表示)</small>
              </p>
              <img
                @click="transactionUsBrandDetail()"
                src="/assets/images/reload.png"
                alt="リロード"
              />
            </div>
            <div class="brand__data card">
              <div class="table brand__data-table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>現在値</p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <p>
                      {{ handNumber(dataUsDetail.PRICE_INFO.CURRENT_PRICE)
                      }}<small>USD</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>始値</p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <p>
                      <strong>{{
                        handNumber(dataUsDetail.PRICE_INFO.OPEN_PRICE)
                      }}</strong
                      ><small>USD</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>高値</p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <p>
                      {{ handNumber(dataUsDetail.PRICE_INFO.HIGH_PRICE)
                      }}<small>USD</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>安値</p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <p>
                      {{ handNumber(dataUsDetail.PRICE_INFO.LOW_PRICE)
                      }}<small>USD</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>出来高</p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <p>
                      {{ handNumberInt(dataUsDetail.PRICE_INFO.TRADING_VOLUME)
                      }}<small>株</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>予想PER</p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <p>{{ handNumber(dataUsDetail.BRAND.EX_PER) || "-" }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>
                      予想配当利回り(年率)
                      <a
                        href="https://www.cheer-sec.co.jp/other/app-help/expected-dividend.html"
                        target="_blank"
                      >
                        <img src="/assets/images/question.png" alt="?" />
                      </a>
                    </p>
                  </div>
                  <div class="table__box-value table__box-value--result">
                    <p v-if="dataUsDetail.BRAND.EX_DIVIDEND_YIELD">
                      {{ handNumber100(dataUsDetail.BRAND.EX_DIVIDEND_YIELD)
                      }}<small>%</small>
                    </p>
                    <p v-else>-</p>
                  </div>
                </div>
              </div>
              <div class="brand__data-dummy">
                <iframe
                  width="100%"
                  height="300"
                  :src="chartUrl"
                  scrolling="no"
                  frameborder="0"
                ></iframe>
              </div>
              <p class="brand__data-source">
                提供元：リフィニティブ・ジャパン株式会社
              </p>
            </div>
          </div>
          <div class="brand__modal">
            <a
              @click="
                $router.push({ name: 'UsBuy', query: { brandId: brandId } })
              "
              class="button button__secondary button__medium button__pointer"
              >買う</a
            >
            <a
              @click="
                $router.push({ name: 'UsSell', query: { brandId: brandId } })
              "
              class="button button__primary button__medium button__pointer"
              >売る</a
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script src="@/assets/js/page/transaction/us/brand/detail.js"></script>
<style scoped></style>
