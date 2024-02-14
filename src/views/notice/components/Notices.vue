<template>
  <div class="info__container card">
    <div class="tab_wrapper">
      <div class="info__list">
        <div
          style="cursor: pointer"
          v-for="(item, index) in currentList"
          :key="`${type}_${index}`"
          :class="['unit', item['READ_FLAG'] != 1 && 'bold']"
          @click="goDetail(item)"
        >
          <article class="info__article info__article--new">
            <img
              v-if="item['READ_FLAG'] != 1"
              src="/assets/images/exclamation_y.png"
              class="info__article-notify"
              alt="!"
            />
            <div class="info__text">
              <p class="info__date" :class="item['READ_FLAG'] != 1 && 'bold'">
                {{ item["READ_DT_D"]
                }}<small>{{ item["READ_DT_T"].replace(":", " : ") }} </small>
              </p>
              <p class="info__title" :class="item['READ_FLAG'] != 1 && 'bold', item['IS_IMPORTANT'] == 1 ? 'info__title--important' : ''">
                {{ item["TITLE"] }}
                <img src="/assets/images/arrow.png" alt="矢印" />
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/page/notice/components/notices"></script>

<style scoped></style>
