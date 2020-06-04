export const link = (info) => {
    const link = `
    <a href="${info.href}" id="${info.id}" class="link ${info.class}">${info.name}</a>`;
    return link;
}