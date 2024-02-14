<template>
  <div>
    <div class="table__box" v-for="(item, index) in data" :key="index">
      <div class="table__box-title" v-show="!item.disabled">
        <p>{{ item.title }}</p>
        <img
          src="/assets/images/question.png"
          v-if="item.title == '譲渡損益（特定口座）'"
          alt="?"
          @click="jumpUrl"
          class="click"
        />
      </div>
      <div
        class="table__box-value table__box-value--result"
        v-show="!item.disabled"
      >
        <div class="table__box-value--result--wrap">
          <div class="table__box-value--result--wrap--flex">
            <p>{{ index > 0 && failed ? "ー" : item.value }}</p>
            <img
              v-if="item.children || item.groupChildren"
              :src="img"
              alt=""
              @click="extraShow = !extraShow"
            />
          </div>
          <div v-if="item.children" class="extra-wrap">
            <div class="extra-list-container" v-show="extraShow">
              <div class="extra_title">
                <span>内訳</span>
                <span>日時</span>
                <span>単価</span>
                <span>数量</span>
              </div>
              <div
                class="unit"
                v-for="(unit, index1) in item.children"
                :key="index1"
              >
                <span>{{ unit.col0 }}</span>
                <span>{{ unit.col1 }}</span>
                <span>{{ unit.col2 }}</span>
                <span>{{ unit.col3 }}</span>
              </div>
            </div>
          </div>
          <div v-if="item.groupChildren" class="extra-wrap">
            <div class="extra-list-container" v-show="extraShow">
              <div class="extra_title">
                <span>約定時間</span>
                <span>数量</span>
                <span>約定単価</span>
              </div>
              <section
                class="group-unit"
                v-for="(value, name, index2) in item.groupChildren"
                :key="index2"
              >
                <div class="unit" v-for="(unit, index3) in value" :key="index3">
                  <span>{{ unit.col1 }}</span>
                  <span>{{ unit.col3 }}</span>
                  <span>{{ unit.col2 }}</span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import listPage from "@/assets/js/page/reference/order/listPage";

export default listPage;
</script>

<style scoped>
</style>
