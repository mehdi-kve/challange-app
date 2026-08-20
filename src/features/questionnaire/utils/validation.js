export function validateAnswer(question, value) {
  switch (question.type) {
    case "multiple":
      if (!Array.isArray(value) || value.length === 0) {
        return { valid: false, message: "حداقل یک گزینه رو انتخاب کن" };
      }
      break;
    case "slider":
      return { valid: true };
    case "number":
      if (value === null || value === undefined || value === "") {
        return { valid: false, message: "یه عدد وارد کن" };
      }
      if (Number(value) < question.min || Number(value) > question.max) {
        return { valid: false, message: `مقدار باید بین ${question.min} و ${question.max} باشه` };
      }
      break;
    case "text":
      if (!value || !value.trim()) {
        return { valid: false, message: "جواب این سؤال رو بنویس" };
      }
      break;
    default:
      if (value === null || value === undefined || value === "") {
        return { valid: false, message: "یه گزینه انتخاب کن" };
      }
  }
  return { valid: true };
}

export function hasAnswer(question, value) {
  return Boolean(validateAnswer(question, value).valid || (question.type === "slider" && value !== undefined));
}