export const input = (info) => {
    const input = `
    <input type="${info.type}" class="input ${info.class}" id="${info.id}" placeholder="${info.placeholder}" src="${info.src}" accept=${info.accept}>`;
    return input;
};

export default (info) => {
    const element = `<input type="${info.type}" class="input ${info.class}" id="${info.id}" placeholder="${info.placeholder}" src="${info.src}" accept=${info.accept}>`;
    const id = `#${info.id}`

    return { element, id }

};