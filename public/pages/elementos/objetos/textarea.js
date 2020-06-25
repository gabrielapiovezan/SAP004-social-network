export const textarea = (info) => {
    const textarea = `
    <textarea type="${info.type}" class="textarea ${info.class}" rows="${info.rows}" id="${
    info.id
  }" placeholder="${info.placeholder}">${info.value || ''}</textarea>`;
    return textarea;
};

export default (info) => {
    const element = `<textarea type="${info.type}" class="textarea ${info.class}" rows="${
    info.rows
  }" id="${info.id}" placeholder="${info.placeholder}">${info.value || ''}</textarea>`;
    const id = `#${info.id}`;

    return { element, id };
};