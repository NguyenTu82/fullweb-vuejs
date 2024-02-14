<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/settings" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>口座・設定</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link to="/settings/user/" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"
            ><strong>アカウント・設定変更</strong></a
          >
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link to="" v-slot="{ navigate }" custom>
          <a @click="navigate">取引暗証番号のロック解除申請</a>
        </router-link>
      </nav>
    </TopInfo>
    <section class="settings">
      <div class="wrapper">
        <h1 class="title">取引暗証番号のロック解除申請</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="settings__table card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>{{ formData[0].title }}</p>
                  </div>
                  <div class="table__box-value">
                    <div class="settings__table-input">
                      <div>
                        <input
                          v-model.trim="formData[0].modelVal[0]"
                          :placeholder="formData[0].placeholder[0]"
                          :type="formData[0].type"
                          @blur="inputChange(formData[0].modelVal, 0)"
                          :maxlength="formData[0].maxLength[0]"
                          autocomplete="off"
                        />
                      </div>
                      <div>
                        <input
                          v-model.trim="formData[0].modelVal[1]"
                          :placeholder="formData[0].placeholder[1]"
                          :type="formData[0].type"
                          @blur="inputChange(formData[0].modelVal, 0)"
                          :maxlength="formData[0].maxLength[1]"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>{{ formData[1].title }}</p>
                  </div>
                  <div class="table__box-value">
                    <div
                      class="settings__table-input settings__table-input--birthday"
                    >
                      <div>
                        <select
                          class="selectbox__gray"
                          v-model="formData[1].modelVal[0]"
                          @blur="inputChange(formData[1].modelVal, 1)"
                          :style="{
                            color:
                              formData[1].modelVal[0] === ''
                                ? '#757575'
                                : '#000',
                          }"
                          autocomplete="off"
                        >
                          <option disabled selected hidden value="">
                            {{ formData[1].placeholder[0] }}
                          </option>
                          <option
                            v-for="year in years"
                            :key="year"
                            :value="year.toString()"
                          >
                            {{ year }}
                          </option></select
                        >年
                      </div>
                      <div>
                        <select
                          class="selectbox__gray"
                          v-model="formData[1].modelVal[1]"
                          @blur="inputChange(formData[1].modelVal, 1)"
                          :style="{
                            color:
                              formData[1].modelVal[1] === ''
                                ? '#757575'
                                : '#000',
                          }"
                          autocomplete="off"
                        >
                          <option disabled selected hidden value="">
                            {{ formData[1].placeholder[1] }}
                          </option>
                          <option
                            v-for="month in formData[1].maxMonth"
                            :key="month"
                            :value="month.toString()"
                          >
                            {{ month }}
                          </option></select
                        >月
                      </div>
                      <div>
                        <select
                          class="selectbox__gray"
                          v-model="formData[1].modelVal[2]"
                          @blur="inputChange(formData[1].modelVal, 1)"
                          :style="{
                            color:
                              formData[1].modelVal[2] === ''
                                ? '#757575'
                                : '#000',
                          }"
                          autocomplete="off"
                        >
                          <option disabled selected hidden value="">
                            {{ formData[1].placeholder[2] }}
                          </option>
                          <option
                            v-for="day in formData[1].maxDay"
                            :key="day"
                            :value="day.toString()"
                          >
                            {{ day }}
                          </option></select
                        >日
                      </div>
                    </div>
                    <div class="error-tip" v-if="formData[1].formatError">
                      {{ formData[1].formatMsg }}
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>{{ formData[2].title }}</p>
                  </div>
                  <div class="table__box-value">
                    <div class="settings__table-input">
                      <input
                        type="text"
                        pattern="[0-9]*"
                        v-model="formData[2].modelVal"
                        :placeholder="formData[2].placeholder"
                        :maxlength="formData[2].maxLength"
                        @input="
                          formData[2].modelVal = format(formData[2].modelVal)
                        "
                        autocomplete="off"
                      />
                    </div>
                    <div class="error-tip" v-if="formData[2].formatError">
                      {{ formData[2].formatMsg }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="settings__confirm">
                <button
                  @click="userSetting"
                  class="button button__white button__medium"
                >
                  キャンセル
                </button>
                <button
                  :class="
                    inputTrue
                      ? 'button button__main button__medium'
                      : 'button button__disabled button__medium'
                  "
                  :disabled="!inputTrue"
                  @click="handleSend"
                >
                  送信
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/settings/user/unlockTradePwd/index.js"></script>
