/* * @Author: VuPV * @Last Modified by: VuPV * @Last Modified time: 2022-06-03 *
@ID Function: A311 * @Description: お知らせの一覧表示 */

<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link :to="{ name: 'Home' }" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>ホーム</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link
          :to="{ name: 'Notice' }"
          v-slot="{ href, navigate }"
          custom
        >
          <a :href="href" @click="navigate"
            ><strong>お知らせ・メッセージ</strong></a
          >
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <span>&nbsp;{{ BREAD_CRUMB }}</span>
      </nav>
    </TopInfo>
    <div class="info">
      <div class="wrapper">
        <div class="grid_buttons">
          <button
            :class="`button__square${
              $route.query.tab === noticeType.COMPANY ? '--selected' : ''
            }`"
            @click="
              $router.push({
                name: 'Notice',
                query: { tab: noticeType.COMPANY },
              })
            "
          >
            当社からのお知らせ
            <img
              v-if="tabs[0]['isRead']"
              src="/assets/images/exclamation_y.png"
              alt="!"
            />
          </button>
          <button
            :class="`button__square${
              $route.query.tab === noticeType.CUSTOMER ? '--selected' : ''
            }`"
            @click="
              $router.push({
                name: 'Notice',
                query: { tab: noticeType.CUSTOMER },
              })
            "
          >
            お客さまへのご連絡
            <img
              v-if="tabs[1]['isRead']"
              src="/assets/images/exclamation_y.png"
              alt="!"
            />
          </button>
        </div>
        <h1 class="title">
          {{
            `${
              $route.query.tab === noticeType.COMPANY
                ? "当社からのお知らせ"
                : "お客さまへのご連絡 "
            }`
          }}
        </h1>
        <section class="info__detail card">
          <div class="tab_wrapper">
            <div class="info__detail-date">
              <p>
                {{ noticeInfo.OPEN_D }}<small>{{ noticeInfo.OPEN_T }}</small>
              </p>
            </div>
            <h1
              :class="`info__detail-title ${
                noticeInfo['IS_IMPORTANT'] == 1
                  ? 'info__detail-title--important'
                  : ''
              }`"
            >
              {{ noticeInfo["TITLE"] }}
            </h1>
            <div class="info__detail-body" v-html="noticeInfo.CONTENT"></div>
          </div>
          <button
            @click="goBackNotices"
            class="button button__white button__full button__back"
          >
            <img src="/assets/images/arrow_back_g.png" alt="" />
            {{
              `${
                $route.query.tab === noticeType.COMPANY
                  ? "当社からのお知らせ一覧へ"
                  : "お客さまへのご連絡一覧へ "
              }`
            }}
          </button>
        </section>
      </div>
    </div>
  </main>
</template>

<script src="@/assets/js/page/notice/pages/noticeDetail"></script>

<style scoped></style>
