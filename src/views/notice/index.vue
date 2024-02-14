/* * @Author: VuPV * @Last Modified by: VuPV * @Last Modified time: 2022-06-03 *
@ID Function: A310 * @Description: お知らせの本文 */

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
          <a :href="href" @click="navigate">お知らせ・メッセージ</a>
        </router-link>
      </nav>
    </TopInfo>
    <section class="info">
      <div class="wrapper">
        <div class="grid_buttons">
          <button
            :class="`button__square${
              tabIndex === 1 || $route.query.tab === noticeType.COMPANY
                ? '--selected'
                : ''
            }`"
            @click="changeTab(1)"
          >
            {{ tabs[0]["name"] }}
            <img
              v-if="tabs[0]['isRead']"
              src="/assets/images/exclamation_y.png"
              alt="!"
            />
          </button>
          <button
            :class="`button__square${
              tabIndex === 2 || $route.query.tab === noticeType.CUSTOMER
                ? '--selected'
                : ''
            }`"
            @click="changeTab(2)"
          >
            {{ tabs[1]["name"] }}
            <img
              v-if="tabs[1]['isRead']"
              src="/assets/images/exclamation_y.png"
              alt="!"
            />
          </button>
        </div>
        <h1 class="title">お知らせ・メッセージ</h1>
        <Notices
          v-if="tabIndex === 1"
          :list="NoticesList1"
          :tabIndex="tabIndex"
          :noticeType="noticeType"
          @getdata="getReadData"
          type="list1"
        ></Notices>
        <Notices
          v-if="tabIndex === 2"
          :list="NoticesList2"
          :tabIndex="tabIndex"
          :noticeType="noticeType"
          @getdata="getReadData"
          type="list2"
        ></Notices>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/notice/index"></script>

<style scoped></style>
