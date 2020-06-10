export const image = (info) => {
    const image = `
    <img src="${info.src}" class="${info.class}" id="${info.id}">`;
    return image;
};

export default (info) => {
    const element = `<img src="${info.src}" class="${info.class}" id="${info.id}">`;
    const id = `#${info.id}`;
    return { element, id };
};