<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link :to="{ name: 'Home' }" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate" class="limit-text-w300"
            ><strong>ホーム</strong></a
          >
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link
          :to="{ name: 'Notice' }"
          v-slot="{ href, navigate }"
          custom
        >
          <a :href="href" @click="navigate" class="limit-text-w300"
            ><strong>お知らせ</strong></a
          >
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link
          :to="{
            name: 'urgentNotiDetail',
            query: { id_urgent: noticeInfo['SEQ_NO'] },
          }"
          v-slot="{ href, navigate }"
          custom
        >
          <a :href="href" @click="navigate" class="limit-text-w300">{{
            noticeInfo["TITLE"]
          }}</a>
        </router-link>
      </nav>
    </TopInfo>
    <div class="info" v-if="noticeInfo">
      <div class="wrapper">
        <section class="info__detail card urgentDetail">
          <h1 class="title">
            {{
              noticeInfo.IS_IMPORTANT == 2
                ? "緊急お知らせ"
                : "お知らせ・メッセージ"
            }}
          </h1>
          <div class="tab_wrapper">
            <div class="info__detail-date">
              <p>
                {{ urgentDate
                }}<small>{{ urgentTime || datetimeFilter }}</small>
              </p>
            </div>
            <h1
              class="info__detail-title"
              :class="`info__detail-title ${
                noticeInfo.IS_IMPORTANT == 1 || noticeInfo.IS_IMPORTANT == 2
                  ? 'info__detail-title--important'
                  : ''
              }`"
            >
              {{ noticeInfo.TITLE }}
            </h1>
            <div class="info__detail-body">
              <p v-html="noticeInfo.CONTENT"></p>
            </div>
          </div>
          <button
            class="button button__white button__full button__back"
            @click="getBack"
          >
            <img src="/assets/images/arrow_back_g.png" alt="" />
            前の画面へ戻る
          </button>
        </section>
      </div>
    </div>
  </main>
</template>
<script src="@/assets/js/common/urgentDetail"></script>

<style lang="less" scoped></style>
