import validate from "uuid-validate";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isUuidString = (id: unknown): boolean => {
  return typeof id === "string" && validate(id, 4);
};
