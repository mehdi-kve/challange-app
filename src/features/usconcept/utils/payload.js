export const PAYLOAD_APP = "usconcept";
export const PAYLOAD_VERSION = 1;

export function buildPayload(answers, list) {
  const compact = {};
  for (const question of list) {
    const value = answers[question.id];
    if (value == null) continue;
    if (question.type === "multiple" || question.type === "tags") {
      const ids = value.ids ?? [];
      compact[question.id] = value.text ? { ids, text: value.text } : ids;
    } else if (question.type === "single" || question.type === "palette") {
      compact[question.id] = value.text ? { id: value.id, text: value.text } : value.id;
    } else {
      compact[question.id] = value;
    }
  }
  return { v: PAYLOAD_VERSION, app: PAYLOAD_APP, answers: compact, t: Date.now() };
}

export function parsePayload(raw) {
  if (typeof raw !== "string") return null;
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  if (data.app !== PAYLOAD_APP) return null;
  if (!data.answers || typeof data.answers !== "object" || Array.isArray(data.answers)) return null;
  return data;
}

export function toViewShape(question, value) {
  if (question.type === "multiple" || question.type === "tags") {
    if (value && Array.isArray(value.ids)) return value;
    return { ids: Array.isArray(value) ? value : [], text: "" };
  }
  if (question.type === "single" || question.type === "palette") {
    if (typeof value === "string") return { id: value };
    return value ?? { id: "" };
  }
  return value ?? "";
}