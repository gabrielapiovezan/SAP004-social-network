// //export const icon = (info) => {
// export default (info) => {
//     //  const div = document.createElement('div');

//     const iconDynamic = `
//             <div class="form">
//             <input type="image"  src="./pages/elementos/icones/${info.name}-1.png"class="icon icon-1 " id="icon-dynamic-1-${info.id}">
//             <input type="image"  src="./pages/elementos/icones/${info.name}-2.png"class="disappear icon icon-2" id="icon-dynamic-1-${info.id}"> 
//             </div>`;

//     return iconDynamic

// };



//export const icon = (info) => {
export default (info) => {
    //  const div = document.createElement('div');

    const iconDynamic = `
                <div class="form">
                <input type="image"  src="./pages/elementos/icones/${info.name}-1.png"class="icon icon-1 " id="icon-dynamic-1-${info.id}">
                <input type="image"  src="./pages/elementos/icones/${info.name}-2.png"class="disappear icon icon-2" id="icon-dynamic-2-${info.id}"> 
                </div>`;

    return iconDynamic
};