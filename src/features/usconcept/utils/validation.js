export function isAnswerValid(question, value) {
  switch (question.type) {
    case "single": {
      if (!value || !value.id) return false;
      const option = question.options.find((item) => item.id === value.id);
      if (!option) return false;
      if (option.other) return Boolean(value.text && value.text.trim());
      return true;
    }
    case "multiple": {
      const ids = Array.isArray(value?.ids) ? value.ids : [];
      const min = question.min ?? 1;
      const max = question.max ?? Infinity;
      if (ids.length < min || ids.length > max) return false;
      if (ids.includes("other") && !(value.text && value.text.trim())) return false;
      return true;
    }
    case "emoji": {
      const count = Array.isArray(value) ? value.length : 0;
      return count >= (question.min ?? 3) && count <= (question.max ?? 5);
    }
    case "tags": {
      const count = Array.isArray(value) ? value.length : 0;
      if (question.exact) return count === question.exact;
      return count >= (question.min ?? 1) && count <= (question.max ?? Infinity);
    }
    case "palette": {
      if (!value || !value.id) return false;
      return Boolean(question.options.find((item) => item.id === value.id));
    }
    case "text":
    case "letter":
      return Boolean(value && value.trim());
    default:
      return true;
  }
}
