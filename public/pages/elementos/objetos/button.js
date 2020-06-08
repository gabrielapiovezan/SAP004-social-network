export const button = (info) => {
    const button = `
    <button type="submit" class="button ${info.class}" id="${info.id}">${info.name}</button>`;
    return button;
};

export default (info) => {
    const element = `<button type="submit" class="button ${info.class}" id="${info.id}">${info.name}</button>`;
    const id = `#${info.id}`
    return { element, id }

};