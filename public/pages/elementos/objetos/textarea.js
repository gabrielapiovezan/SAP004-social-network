export const textarea = (info) => {
    const textarea = `
    <textarea type="${info.type}" size="${info.size}" class="textarea ${info.class}" id="${info.id}" placeholder="${info.placeholder}"></textarea>`;
    return textarea;
}