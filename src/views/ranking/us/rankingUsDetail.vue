<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/home" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>ホーム</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link to="/ranking/us/" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>米国株式</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a>{{ this.$router.currentRoute._value.query.category }}</a>
      </nav>
    </TopInfo>

    <section class="ranking">
      <div class="wrapper">
        <TabContent />
        <h1 class="title">各種ランキング</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <div class="ranking__title">
              <h1 class="detail__title">
                {{ this.$router.currentRoute._value.query.category }}
              </h1>
              <div class="ranking__title-caution">
                <a
                  href="https://www.cheer-sec.co.jp/other/app-help/B120.html"
                  >ご注意事項 <img src="/assets/images/question.png" alt="?"
                /></a>
                <p>
                  ランキング更新時間：{{
                    rankingUpdateTime ? rankingUpdateTime : "-"
                  }}
                </p>
                <p>※株価は{{ priceUpdateTime || "-" }}時点のものです</p>
              </div>
            </div>
            <div class="ranking__list card card--sphidden">
              <div class="ranking__list-head">
                <h2>順位</h2>
                <h2>銘柄名</h2>
                <h2 v-html="rankingValueHeading.get(rankingType)"></h2>
                <h2><small>株価(USD)</small><br />前日比</h2>
              </div>

              <div v-show="isShowData === true">
                <div v-for="item in getRankingDataScroll" :key="item.id">
                  <router-link
                    :to="{
                      name: 'UsBrandDetail',
                      query: { brandId: item.brand_id },
                    }"
                    v-slot="{ href, navigate }"
                    custom
                  >
                    <a
                      class="ranking__list-item"
                      :href="href"
                      @click="navigate"
                    >
                      <p class="ranking__list-item-rank">
                        {{ item.ranking_no }}
                      </p>

                      <div class="ranking__list-item-name">
                        <p>{{ item.stock_nm }}</p>
                        <p>
                          <small>
                            {{
                              item.stock_cd.substring(4, 5) === "0"
                                ? item.stock_cd.slice(0, 4)
                                : item.stock_cd
                            }}
                            |
                            {{ item.exchange_cd }}
                          </small>
                        </p>
                      </div>

                      <p
                        v-if="rankingValueHeading.get(rankingType) !== ''"
                        :style="[{ color: getRankingValueColor }]"
                      >
                        <strong>
                          {{
                            item.ranking_value !== null
                              ? item.ranking_value.replace("%","")
                              : "-"
                          }}
                        </strong>
                      </p>
                      <p v-else :style="[{ color: getRankingValueColor }]">
                        <strong></strong>
                      </p>

                      <div>
                        <p>
                          {{
                            item.reference_price !== null
                              ? handNumber(item.reference_price)
                              : "-"
                          }}
                          <small></small>
                        </p>
                        <p class="comparison_text high custom">
                          <span
                            v-if="Number(item.day_before_rate) > 0"
                            :style="[
                              {
                                color: this.getRankingDayBeforeRatioColor(
                                  item.day_before_rate
                                ),
                              },
                            ]"
                            >+
                            {{
                              item.day_before_rate !== null
                                ? handNumber(item.day_before_rate)
                                : "-"
                            }}
                          </span>
                          <span
                            v-else
                            :style="[
                              {
                                color: getRankingDayBeforeRatioColor(
                                  item.day_before_rate
                                ),
                              },
                            ]"
                          >
                            {{
                              item.day_before_rate !== null
                                ? handNumber(item.day_before_rate)
                                : "-"
                            }}
                          </span>

                          <small
                            v-if="Number(item.day_before_ratio) > 0"
                            :style="[
                              {
                                color: this.getRankingDayBeforeRatioColor(
                                  item.day_before_ratio
                                ),
                              },
                            ]"
                          >
                            (+
                            {{
                              item.day_before_ratio !== null
                                ? handNumber(item.day_before_ratio)
                                : "-"
                            }}%)
                          </small>
                          <small
                            v-else
                            :style="[
                              {
                                color: this.getRankingDayBeforeRatioColor(
                                  item.day_before_ratio
                                ),
                              },
                            ]"
                          >
                            ({{
                              item.day_before_ratio !== null
                                ? handNumber(item.day_before_ratio)
                                : "-"
                            }}%)
                          </small>
                        </p>
                      </div>
                      <img src="/assets/images/arrow.png" alt=">" />
                    </a>
                  </router-link>
                </div>
              </div>
              <div v-if="isShowData === false || this.rankingData === null">
                <p class="norankingdata">対象のランキングはございません。</p>
              </div>
            </div>

            <router-link
              :to="{ name: 'RankingUs' }"
              v-slot="{ href, navigate }"
              custom
            >
              <a
                class="button button__white button__full"
                :href="href"
                @click="navigate"
                >カテゴリー一覧へ</a
              >
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/ranking/us/rankingUsDetail"></script>
