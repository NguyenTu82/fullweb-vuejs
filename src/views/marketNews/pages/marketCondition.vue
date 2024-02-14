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
        <router-link to="/market/condition" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate">市況</a>
        </router-link>
      </nav>
    </TopInfo>

    <section class="market_condition">
      <div class="wrapper">
        <TabContent></TabContent>
        <h1 class="title">市況一覧</h1>
        <div class="market_condition__list card">
          <div class="condition">
            <div class="tab_wrapper">
              <p class="condition__text">ディレイ表示</p>
              <div class="condition__container">
                <a
                  class="items card condition__item"
                  v-for="(item, index) in list"
                  :key="`lis${index}`"
                  @click="goDetails(item)"
                >
                  <div class="first condition__item-title">
                    <p>
                      {{
                        item.INDEX_NAME === "日経225"
                          ? "日経平均株価"
                          : item.INDEX_NAME
                      }}
                    </p>
                    <img
                      class="image"
                      :src="item.ICON_URL"
                      alt=""
                      v-if="item.ICON_URL"
                    />
                    <div class="no-image" v-else>-</div>
                  </div>
                  <p class="first condition__item-date">
                    {{
                      item.UPDATE_DT || item.RATE_DT
                        ? handleDateHideYear(item.UPDATE_DT || item.RATE_DT)
                        : "-"
                    }}
                  </p>

                  <p
                    class="second condition__item-price"
                    :class="{ 'no-value': item.CURRENT_PRICE === '-' }"
                  >
                    {{ handNumber(item.CURRENT_PRICE) }}
                  </p>

                  <div
                    class="third condition__item-marketcomparison comparison_text low"
                  >
                    <div
                      class="up"
                      :class="{
                        'text-black': item.CHANGE_VALUE === '0.00',
                        'scale-down': item.CHANGE_VALUE < 0,
                      }"
                    >
                      <span>{{ item.CHANGE_VALUE }}</span>
                    </div>

                    <div
                      class="down"
                      :class="{
                        'text-black': item.CHANGE_RATE === '(0.00%)',
                        'scale-down': item.VALUE_CHANGE_RATE < 0,
                      }"
                    ><small>
                      {{
                        item.CHANGE_RATE
                          ? item.CHANGE_RATE
                          : `(${item.CHANGE_RATE})`
                      }}</small>
                    </div>
                  </div>
                </a>
              </div>
              <p class="condition__item-source">
                提供元：株式会社時事通信社<br/>　　　　リフィニティブ・ジャパン株式会社
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/marketNews/pages/marketCondition"></script>
