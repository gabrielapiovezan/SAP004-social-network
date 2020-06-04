export const input = (info) => {
    const input = `
    <input type="${info.type}" class="input ${info.class}" id="${info.id}" placeholder="${info.placeholder}" src="${info.src}">`;
    return input;
};