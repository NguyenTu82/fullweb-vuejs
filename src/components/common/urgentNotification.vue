<template>
  <div
    class="topinfo__news-container"
    :class="lengthNoti >= 2 ? 'topinfo__news-scroll' : ''"
  >
    <div class="topinfo__news-left">
      <a>
        <img
          src="/assets/images/bell_yellow.png"
          alt="通知マーク"
        />緊急のお知らせ
      </a>
    </div>
    <div
      class="topinfo__news"
      v-for="(item, index) in urgentNoticeList"
      :key="`${index}`"
      @click="goDetail(item)"
    >
      <div class="topinfo__news-left-time">
        <p>{{ handleDateTime(item.OPEN_DT).date }}</p>
        <span
          class="important_notice"
          :class="{ 'tag--red': item['IS_IMPORTANT'] === '2' }"
        >
          {{ item["IS_IMPORTANT"] === "2" ? "重要" : "-" }}
        </span>
      </div>
      <div class="topinfo__news-right title-notice">
        <p>{{ item.TITLE }}</p>
        <div>
          <img src="/assets/images/arrow.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/common/urgentInfo"></script>

<style scoped></style>
