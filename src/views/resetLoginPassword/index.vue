<template>
  <main class="no_header_padding">
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>
    <div class="wrapper">
      <section class="open">
        <h1 class="title">パスワード再設定</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <h2 class="open__title">パスワード再設定</h2>

            <!--ログインID-->
            <p class="open__text">{{ formData[0].title }}</p>
            <div class="open__input open__input--nospace">
              <input
                v-model="formData[0].modelVal"
                :placeholder="formData[0].placeholder"
                :type="formData[0].type"
                @blur="inputChange(formData[0].modelVal, 0)"
                :maxlength="formData[0].maxLength"
                autocomplete="off"
              />
            </div>
            <p class="error-tip" v-if="formData[0].formatError">
              {{ formData[0].formatMsg }}
            </p>

            <!--お名前-->
            <p class="open__text">{{ formData[1].title }}</p>
            <div class="open__input open__input--name open__input--nospace">
              <input
                v-model.trim="formData[1].modelVal[0]"
                :placeholder="formData[1].placeholder[0]"
                :type="formData[1].type"
                @blur="inputChange(formData[1].modelVal, 1)"
                :maxlength="formData[1].maxLength[0]"
                autocomplete="off"
              />
              <input
                v-model.trim="formData[1].modelVal[1]"
                :placeholder="formData[1].placeholder[1]"
                :type="formData[1].type"
                @blur="inputChange(formData[1].modelVal, 1)"
                :maxlength="formData[1].maxLength[1]"
                autocomplete="off"
              />
            </div>

            <!--生年月日-->
            <p class="open__text">{{ formData[2].title }}</p>
            <div class="open__input open__input--birthday open__input--nospace">
              <div>
                <select
                  class="selectbox__gray"
                  v-model="formData[2].modelVal[0]"
                  @blur="inputChange(formData[2].modelVal, 2)"
                  :style="{
                    color: formData[2].modelVal[0] === '' ? '#757575' : '#000',
                  }"
                  autocomplete="off"
                >
                  <option selected hidden value="">
                    {{ formData[2].placeholder[0] }}
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
                  v-model="formData[2].modelVal[1]"
                  @blur="inputChange(formData[2].modelVal, 2)"
                  :style="{
                    color: formData[2].modelVal[1] === '' ? '#757575' : '#000',
                  }"
                  autocomplete="off"
                >
                  <option disabled selected hidden value="">
                    {{ formData[2].placeholder[1] }}
                  </option>
                  <option
                    v-for="month in formData[2].maxMonth"
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
                  v-model="formData[2].modelVal[2]"
                  @blur="inputChange(formData[2].modelVal, 2)"
                  :style="{
                    color: formData[2].modelVal[2] === '' ? '#757575' : '#000',
                  }"
                  autocomplete="off"
                >
                  <option disabled selected hidden value="">
                    {{ formData[2].placeholder[2] }}
                  </option>
                  <option
                    v-for="day in formData[2].maxDay"
                    :key="day"
                    :value="day.toString()"
                  >
                    {{ day }}
                  </option></select
                >日
              </div>
            </div>
            <p class="error-tip" v-if="formData[2].formatError">
              {{ formData[2].formatMsg }}
            </p>

            <!--携帯電話番号-->
            <p class="open__text">{{ formData[3].title }}</p>
            <div class="open__input open__input--nospace">
              <div>
                <input
                  type="text"
                  pattern="[0-9]*"
                  v-model="formData[3].modelVal"
                  :placeholder="formData[3].placeholder"
                  @blur="inputChange(formData[3].modelVal, 3)"
                  :maxlength="formData[3].maxLength"
                  @input="formData[3].modelVal = format(formData[3].modelVal)"
                  autocomplete="off"
                />
              </div>
            </div>
            <p class="error-tip" v-if="formData[3].formatError">
              {{ formData[3].formatMsg }}
            </p>
          </div>

          <div class="open__next">
            <button
              :class="
                isInputOver
                  ? 'button button__main button__full'
                  : 'button button__disabled button__full'
              "
              :disabled="!isInputOver"
              @click="handleSend"
            >
              送信
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<script src="@/assets/js/page/resetLoginPassword/index"></script>
