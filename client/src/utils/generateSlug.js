export const generateSlug = (text) => {
  return text?.split(" ").join("-");
};

export const destructureSlug = (text) => {
  return text?.split("-").join(" ");
};
