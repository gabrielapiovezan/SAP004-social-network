export const input = (info) => {
    const input = `
    <textarea type="${info.type}" class="textarea ${info.class}" id="${info.id}" placeholder="${info.placeholder}">`;
    return input;
}