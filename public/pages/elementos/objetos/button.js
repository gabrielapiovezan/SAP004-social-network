export const button = (info) => {
    const button = `
<button type="submit" class="button ${info.class}" id="${info.id}">${info.name}</button>`;
    return button
}