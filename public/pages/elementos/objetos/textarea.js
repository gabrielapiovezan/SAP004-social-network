export const textarea = (info) => {
    const textarea = `
    <textarea type="${info.type}" class="textarea ${info.class}" id="${info.id}" placeholder="${info.placeholder}">`;
    return textarea;
}