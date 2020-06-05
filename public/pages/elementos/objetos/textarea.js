export const textarea = (info) => {
    const textarea = `
    <textarea type="${info.type}" class="textarea ${info.class}" rows="${info.rows}" cols="${info.cols}" id="${info.id}" placeholder="${info.placeholder}"></textarea>`;
    return textarea;
}