const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function fa(num) {
  return String(num).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);
}

export function faPad(num, len = 2) {
  return fa(String(num).padStart(len, "0"));
}
