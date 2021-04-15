export const toLocalDateTime = dateAt => {
    const date = new Date(dateAt);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}