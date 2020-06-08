export const textarea = (info) => {
    const textarea = `
    <textarea type="${info.type}" class="textarea ${info.class}" size="${info.size}" id="${info.id}" placeholder="${info.placeholder}"></textarea>`;
    return textarea;
}



export default (info) => {
    const element = `<textarea type="${info.type}" class="textarea ${info.class}" size="${info.size}" id="${info.id}" placeholder="${info.placeholder}"></textarea>`;
    const id = `#${info.id}`

    return { element, id }

};