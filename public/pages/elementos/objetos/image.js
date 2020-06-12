export const image = (info) => {
    const image = `
    <img src="${info.src}" class="${info.class}" id="${info.id}" alt="${info.alt}">`;
    return image;
};

export default (info) => {
    const element = `<img src="${info.src}" class="${info.class}" id="${info.id}" alt="${info.alt}">`;
    const id = `#${info.id}`;
    return { element, id };
};