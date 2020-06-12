//export const icon = (info) => {
export default (info) => {
    //  const div = document.createElement('div');

    const iconColor = `
            <div class="form">
            <input type="image"  src="./pages/elementos/icones/${info.name}-1.png"class="icon icon-1 " id="like1${info.id}">
            <input type="image"  src="./pages/elementos/icones/${info.name}-2.png"class="disappear icon icon-2" id="like2${info.id}"> 
            </div>`;

    return iconColor
};