export const truncate = (text, limit = 150) => {
    return text.length > limit ? text + text.substring(0, limit) + "..." : text;
}