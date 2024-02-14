<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/home/"><strong>ホーム</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/market/condition/"><strong>市況</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">{{ title }}</a>
      </nav>
    </TopInfo>

    <div class="market_condition">
      <div class="wrapper">
        <h1 class="title">市況情報</h1>
        <section class="market_condition__detail card">
          <div class="market_condition__wrapper">
            <div class="market_condition__detail-title">
              <p>{{ title }}</p>
              <div class="market_condition__detail-img">
                <img class="image" :src="icon_url" alt="" v-if="icon_url" />
              </div>
            </div>
            <div class="market_condition__detail-date">
              <p v-show="update_D">
                {{ update_D }} 現在
                {{
                  title === "NYダウ"
                    ? "(15分ディレイ表示)"
                    : title === "USD/JPY"
                    ? "(最大10分ディレイ表示)"
                    : ""
                }}
              </p>
            </div>

            <div class="card">
              <div class="market_condition__container">
                <div class="table market_condition__table">
                  <div
                    class="table__box"
                    v-for="(item, index) in datas"
                    :key="index"
                  >
                    <div class="table__box-title custom">
                      {{ item.title }}
                      <span>{{ item.date || "" }}</span>
                    </div>
                    <div
                      class="table__box-value table__box-value--result"
                      :class="[
                        'right',
                        item.flag === 1 && 'scale-up',
                        item.flag === -1 && 'scale-down',
                      ]"
                    >
                      <p v-html="item.value"></p>
                    </div>
                  </div>
                </div>

                <div class="market_condition__container-dummy">
                  <iframe
                    width="100%"
                    height="300"
                    :src="chartUrl"
                    scrolling="no"
                    frameborder="0"
                  ></iframe>
                </div>
              </div>
              <p
                class="market_condition__detail-source"
                v-if="title === '日経平均株価' || title === 'TOPIX'"
              >
                提供元：株式会社時事通信社
              </p>
              <p class="market_condition__detail-source" v-else>
                提供元：リフィニティブ・ジャパン株式会社
              </p>
            </div>
            <button
              @click="getBack"
              class="button button__white button__full button__back"
            >
              <img src="/assets/images/arrow_back_g.png" alt="" />
              市況一覧へ
            </button>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script src="@/assets/js/page/marketNews/pages/marketConditionInfo"></script>
