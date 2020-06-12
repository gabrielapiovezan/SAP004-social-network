export const link = (info) => {
    const link = `
    <a href="${info.href}" id="${info.id}" class="link ${info.class}" title="${info.title}" target="${info.target}">${info.name}</a>`;
    return link;
};

export default (info) => {
    const element = `<a href="${info.href}" id="${info.id}" class="link ${info.class}" title="${info.title}" target="${info.target}">${info.name}</a>`;
    const id = `#${info.id}`;

    return { element, id };
};