import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";
const state = {
  // investdetail: null,
  document: null,
  docInfoList: null,
  readDocs: null,
  confirmDocs: null,
  readRelated: null,
  confirmRelated: null,
};

const getters = {
  getDataDocument(state) {
    return state.document.DATA;
  },
  getdocInfoList(state) {
    return state.docInfoList.DATA;
  },
  getReadDocument(state) {
    return state.readDocs;
  },
  getConfirmDocument(state) {
    return state.confirmDocs;
  },
  getReadDoc(state) {
    return state.readRelated;
  },
  getConfirmDoc(state) {
    return state.confirmRelated;
  },
};

const actions = {
  async getDocumentstData({ commit }, payload) {
    await api
      .get("document/list", { payload, apiType: apiInfo.apiType.COMMON_FRONT })
      .then((response) => {
        commit("DOCUMENT_LIST", response.data);
      });
  },
  async getdocInfotData({ commit }, payload) {
    await api
      .post(
        "/hhd-it/it/DocInfoListAcquisitionController/exec",
        {
          inv_trust_assoc_cd: payload["inv_trust_assoc_cd"],
          doc_cls: payload["doc_cls"],
          agree_sts: payload["agree_sts"],
          search_ver_cls: payload["search_ver_cls"],
          agreement_cls: payload["agreement_cls"],
        },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("DOC_LIST", response.data);
      });
  },
  async getDocumentsRead({ commit }, payload) {
    await api
      .post(
        "/electronic_delivery/read",
        { SEQ_NO: payload.SEQ_NO, READ_FLG: payload.READ_FLG },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("READ_DOCS", response.data);
      });
  },
  async getDocumentsConfirm({ commit }, payload) {
    await api
      .post(
        "/electronic_delivery/confirm",
        { SEQ_NO: payload.SEQ_NO },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("CONFIRM_DOCS", response.data);
      });
  },
  async getDocsRead({ commit }, payload) {
    await api
      .post(
        "/Related_delivery/read",
        { SEQ_NO: payload.SEQ_NO, READ_FLG: payload.READ_FLG },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("READ_DOC", response.data);
      });
  },
  async getDocConfirm({ commit }, payload) {
    await api
      .post(
        "/Related_delivery/confirm",
        { SEQ_NO: payload.SEQ_NO },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("CONFIRM_DOC", response.data);
      });
  },
};

const mutations = {
  DOCUMENT_LIST(state, document) {
    state.document = document;
  },
  DOC_LIST(state, docInfoList) {
    state.docInfoList = docInfoList;
  },
  READ_DOCS(state, readDocs) {
    state.readDocs = readDocs;
  },
  CONFIRM_DOCS(state, confirmDocs) {
    state.confirmDocs = confirmDocs;
  },
  READ_DOC(state, readRelated) {
    state.readRelated = readRelated;
  },
  CONFIRM_DOC(state, confirmRelated) {
    state.confirmRelated = confirmRelated;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
