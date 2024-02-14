import constant from "@/const/common";

function password_validation(pwd, confirm_pwd) {
  if (pwd.length == 0) {
    return "パスワードを入力してください";
  } else if (confirm_pwd.length == 0) {
    return "確認パスワードを入力してください";
  } else if (pwd !== confirm_pwd) {
    return "確認パスワードを入力してください";
  } else {
    return pwdregCheck(pwd);
  }
}

function pwdregCheck(pwd) {
  let regCount = 1;
  if (constant.reg.pwdreg.test(pwd)) {
    regCount = 0;
  }

  if (regCount == 0) {
    return false;
  } else {
    return "パスワードが正しくありません。条件を確認の上、再度入力してください。";
  }
}

export function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function isValidBirthday(birthYear, birthMonth, birthDate) {
  const NOW = new Date();
  const numBirthYear = parseInt(birthYear);

  const FULL_BIRTHDAY = birthYear + "/" + birthMonth + "/" + birthDate;

  if (numBirthYear < 1901) {
    return false;
  } else if (numBirthYear === NOW.getFullYear()) {
    return false;
  } else if (isNaN(new Date(FULL_BIRTHDAY).getDate())) {
    return false;
  } else {
    return true;
  }
}

export function isValidPhoneNumber(phoneNumber) {
  if (phoneNumber.slice(0, 1) !== "0") return false;
  const re = /^[0-9]{11}$/;
  return re.test(phoneNumber);
}

export default {
  password_validation,
};
