<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/settings/"><strong>口座・設定</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/account/"><strong>口座情報</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">職業・勤務先の変更</a>
      </nav>
    </TopInfo>

    <section class="settings">
      <div class="wrapper">
        <h1 class="title">職業・勤務先の変更</h1>
        <div class="container card">
          <div class="card__help">
            <!-- HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05 -->
            <a
              :href="HELPACCOUNT"
              target="_blank"
              >本画面のヘルプ
              <img src="/assets/images/question.png" alt="" />
            </a>
          </div>
          <div class="l_tab_wrapper">
            <div class="settings__table card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>現在の職業・勤務先</p>
                  </div>
                  <div class="table__box-value">
                    <div
                      class="settings__table-value"
                      v-for="(item, index) in oldJob"
                      :key="index"
                    >
                      <p>
                        <span>{{ item.title }}</span>
                      </p>
                      <p>{{ item.text }}</p>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>新しい職業・勤務先</p>
                  </div>
                  <div class="table__box-value">
                    <div class="settings__table-input">
                      <div>
                        <p>職業</p>
                        <select
                          class="selectbox selectbox__gray"
                          name="address_prefecture"
                          id=""
                          v-model="userProfessional"
                          @change="selectedPro"
                        >
                          <option value=" " style="display: none">
                            選択してください
                          </option>
                          <option
                            v-for="(item, index) in professionals"
                            :key="index"
                            :value="item.value"
                          >
                            {{ item.value }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <h3 class="settings__table-text--extra">
                      会社役員・会社員/契約/派遣/パート/アルバイトと答えられた方は下記をご選択ください。
                    </h3>
                    <div class="settings__table-input-buttons">
                      <button
                        :disabled="flag1"
                        :class="
                          isListed === 0
                            ? 'button__square--selected'
                            : 'button__square'
                        "
                        @click="listedYes"
                      >
                        上場企業
                      </button>
                      <button
                        :disabled="flag1"
                        :class="
                          isListed === 1
                            ? 'button__square--selected'
                            : 'button__square'
                        "
                        @click="listedNo"
                      >
                        非上場企業
                      </button>
                    </div>
                    <!-- 職業のうむ有無をはんだん判断する -->
                    <div class="settings__table-value">
                      <div
                        class="
                          settings__table-input settings__table-input--full
                        "
                      >
                        <div>
                          <p>勤務先</p>
                          <input
                            :disabled="flag2"
                            type="text"
                            v-model="formData.EMPLOYMENT"
                            placeholder="勤務先名"
                            @input="isBtnFlag"
                          />
                        </div>
                      </div>
                      <div class="settings__table-input">
                        <div>
                          <p>業種</p>
                          <select
                            :disabled="flag2 || formData.OCCUPATION_TYPE === 6"
                            class="selectbox selectbox__gray"
                            name="address_prefecture"
                            v-model="megabite"
                            @change="isBtnFlag"
                          >
                            <option value=" " style="display: none">
                              選択してください
                            </option>
                            <option
                              v-for="(item, index) in industrys"
                              :key="index"
                              :value="item.value"
                            >
                              {{ item.value }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="settings__table-input">
                        <div>
                          <p>部署</p>
                          <input
                            :disabled="flag2"
                            type="text"
                            v-model="deployment"
                            placeholder="部署"
                            @input="isBtnFlag"
                          />
                        </div>
                        <div>
                          <input
                            :disabled="flag2"
                            type="checkbox"
                            id="department"
                            v-model="noDeployment"
                            @input="isBtnFlag"
                          />
                          <label class="checkbox" for="department"
                            >部署なし</label
                          >
                        </div>
                      </div>
                      <div class="settings__table-input">
                        <div>
                          <p>役職</p>
                          <input
                            :disabled="flag2"
                            type="text"
                            v-model="service"
                            placeholder="役職"
                            @input="isBtnFlag"
                          />
                        </div>
                        <div>
                          <input
                            :disabled="flag2"
                            type="checkbox"
                            v-model="noService"
                            id="position"
                            @input="isBtnFlag"
                          />
                          <label class="checkbox" for="position"
                            >役職なし</label
                          >
                        </div>
                      </div>
                      <div class="settings__table-input">
                        <div>
                          <p>勤務先電話番号</p>
                          <!-- 西安 HDH00005_01-228 ④ 10/4 -->
                          <input
                            :disabled="flag2"
                            type="text"
                            maxlength="11"
                            oninput="this.value=this.value.replace(/[^\d]/g,'')"
                            v-model="formData.EMPLOYMENT_TEL_NO"
                            placeholder="勤務先電話番号"
                            @input="changePhone(formData.EMPLOYMENT_TEL_NO)"
                          />
                          <div class="inputMessage_value">
                            <p v-show="phoneFlag">
                              10桁または11桁の半角数字を入力してください
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="settings__confirm">
                <a
                  href="javascript:;"
                  @click="$router.back()"
                  class="button button__white button__medium"
                  >キャンセル</a
                >
                <a
                  href="javascript:;"
                  :class="[
                    { disable: !btnFlag },
                    'button button__main button__medium',
                  ]"
                  @click="submitForm"
                  >変更する</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <dialog-pwd
    v-if="showDialog"
    :formData="formData"
    :API="API"
    @btnCancel="cancel"
  ></dialog-pwd>
</template>

<script>
import occupation from "@/assets/js/page/settings/account/occupation";
export default occupation;
</script>

<style></style>
