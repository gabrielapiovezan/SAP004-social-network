export const textarea = (info) => {
    const textarea = `
<<<<<<< HEAD
    <textarea type="${info.type}" class="textarea ${info.class}" id="${info.id}" placeholder="${info.placeholder}">`;
=======
    <textarea type="${info.type}" class="textarea ${info.class}" rows="${info.rows}" cols="${info.cols}" id="${info.id}" placeholder="${info.placeholder}"></textarea>`;
>>>>>>> 3a8055ee7cc79e8daeda36c8666b45a4706666b7
    return textarea;
}