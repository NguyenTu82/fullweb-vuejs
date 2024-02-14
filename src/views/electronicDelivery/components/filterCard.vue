<template>
  <section class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>表示条件</h2>
        <form id="form_search">
          <div class="table">
            <div class="table__box">
              <div class="table__box-title">
                <p>期間</p>
              </div>
              <div class="table__box-value modal__datepicker">
                <input type="date" v-model="params.from_date" />
                <p>〜</p>
                <input
                  type="date"
                  class="modal__datepicker"
                  v-model="params.to_date"
                />
              </div>
            </div>
            <div class="table__box">
              <div class="table__box-title">
                <p>書画種類</p>
              </div>
              <div class="table__box-value">
                <select
                  v-model="params.written"
                  class="selectbox selectbox__gray"
                  name="condition"
                  id="form_type"
                >
                  <option
                    v-for="(item, index) in formType"
                    :key="index"
                    v-bind:value="item['id']"
                    :selected="item['is_check']"
                  >
                    {{ item["name"] }}
                  </option>
                </select>
              </div>
            </div>
            <div class="table__box">
              <div class="table__box-title">
                <p>閲覧状況</p>
              </div>
              <div class="table__box-value">
                <select
                  v-model="params.status"
                  class="selectbox selectbox__gray"
                  name="condition"
                  id="browsing_status"
                >
                  <option
                    v-for="(item, index) in browsingStatus"
                    :key="index"
                    v-bind:value="item['id']"
                    :selected="item['is_check']"
                  >
                    {{ item["name"] }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div class="modal__buttons">
          <button
            @click="closeFilter()"
            class="button button__white button__medium modal__close"
          >
            キャンセル
          </button>
          <button @click="search()" class="button button__main button__medium">
            変更する
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="@/assets/js/page/electronicDelivery/components/filterCard"></script>

<style scoped></style>
