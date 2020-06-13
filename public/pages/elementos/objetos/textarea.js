export const textarea = (info) => {
    const textarea = `
    <textarea type="${info.type}" class="textarea ${info.class}" size="${info.size}" id="${info.id}" placeholder="${info.placeholder}">${info.value || ''}</textarea>`;
    return textarea;
}



export default (info) => {
    const element = `<textarea type="${info.type}" class="textarea ${info.class}" size="${info.size}" id="${info.id}" placeholder="${info.placeholder}">${info.value || ''}</textarea>`;
    const id = `#${info.id}`

    return { element, id }

};