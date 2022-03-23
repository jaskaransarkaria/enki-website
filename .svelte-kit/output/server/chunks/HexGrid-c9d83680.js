import { c as create_ssr_component } from "./index-fdb1bd20.js";
import { c as calcRowNumber } from "./gridCalc-2d8e7fa8.js";
var LoadingSpinner_svelte_svelte_type_style_lang = "";
var Hex_svelte_svelte_type_style_lang = "";
const isCategory = (obj) => "ParentId" in obj && "Children" in obj && "NominalCode" in obj;
const isTag = (obj) => "TagTypeId" in obj;
var HexGrid_svelte_svelte_type_style_lang = "";
const css = {
  code: ".root-categories-container.svelte-p0kxbr{display:grid;grid-gap:35px;grid-template-columns:repeat(10, 1fr);margin:0 auto;overflow:hidden;list-style-type:none;padding:4.5%;padding-bottom:15%;padding-top:2%;min-height:45vh;align-items:center}.flexbox-container.svelte-p0kxbr{margin:auto;display:flex;margin:0 auto;overflow:hidden;list-style-type:none;justify-content:center;padding:0;padding-bottom:15%}.flexbox-container-no-height.svelte-p0kxbr{height:auto}.hex-flex.svelte-p0kxbr{width:40%;margin:1%}.hex-flex.svelte-p0kxbr,.hex.svelte-p0kxbr{grid-column-end:span 2;position:relative;visibility:hidden;outline:1px solid transparent}.hex-flex.svelte-p0kxbr::after,.hex.svelte-p0kxbr::after{content:'';display:block;padding-bottom:86.602%}.hex.svelte-p0kxbr:hover,.hex-flex.svelte-p0kxbr:hover{transform:scale(1.015)}@media(min-width: 700px){.flexbox-container.svelte-p0kxbr{padding-bottom:8%;height:55vh;align-items:center;justify-content:center}.flexbox-container-no-height.svelte-p0kxbr{height:auto}.hex-flex.svelte-p0kxbr{width:25%;margin:1%}}@media(min-width: 960px){.flexbox-container.svelte-p0kxbr{padding-bottom:5%}.hex-flex.svelte-p0kxbr{width:18%;margin:1%}}@media(min-width: 1600px){.hex-flex.svelte-p0kxbr{width:15%;margin:1%}}@media(min-width: 1960px){.root-categories-container.svelte-p0kxbr{grid-template-columns:repeat(14, 1fr);grid-gap:10px}.hex.svelte-p0kxbr:nth-child(13n + 8){grid-column-start:2}.hex-flex.svelte-p0kxbr{width:10%;margin:1%}}@media(min-width: 2400px){.root-categories-container.svelte-p0kxbr{padding-bottom:5%;grid-gap:3px}.hex-flex.svelte-p0kxbr{width:10%;margin:1%}}@media(min-width: 1201px) and (max-width: 1959px){.root-categories-container.svelte-p0kxbr{grid-gap:10px}.hex.svelte-p0kxbr:nth-child(9n + 6){grid-column-start:2}}@media(max-width: 1200px) and (min-width: 901px){.root-categories-container.svelte-p0kxbr{grid-template-columns:repeat(8, 1fr);grid-gap:15px;padding-bottom:5.5%}.hex.svelte-p0kxbr:nth-child(7n + 5){grid-column-start:2}}@media(max-width: 900px) and (min-width: 601px){.root-categories-container.svelte-p0kxbr{grid-template-columns:repeat(6, 1fr);padding-bottom:7.4%;grid-gap:20px}.hex.svelte-p0kxbr:nth-child(5n + 4){grid-column-start:2}}@media(max-width: 600px){.root-categories-container.svelte-p0kxbr{grid-template-columns:repeat(4, 1fr);grid-gap:5px}.hex.svelte-p0kxbr:nth-child(3n + 3){grid-column-start:2}}",
  map: null
};
const HexGrid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredData;
  let rowNumber;
  let rowOffset;
  let hexesForCompleteGrid;
  let emptyHexes;
  let { data = [] } = $$props;
  let { categoryFn } = $$props;
  let { showFullPage = true } = $$props;
  const createEmptyArray = (length) => new Array(length).fill(void 0);
  data.length > 0 ? [...createEmptyArray(data.length)] : [];
  data.length > 0 ? [...createEmptyArray(data.length)] : [];
  let gridColumnNumber;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.categoryFn === void 0 && $$bindings.categoryFn && categoryFn !== void 0)
    $$bindings.categoryFn(categoryFn);
  if ($$props.showFullPage === void 0 && $$bindings.showFullPage && showFullPage !== void 0)
    $$bindings.showFullPage(showFullPage);
  $$result.css.add(css);
  filteredData = data.filter((base) => isTag(base) || isCategory(base) && base.NominalCode !== "NOT_WEB" && base.NominalCode !== "CLASSES");
  rowNumber = filteredData.length > gridColumnNumber ? calcRowNumber(filteredData.length, gridColumnNumber, 1) : 1;
  rowOffset = Math.floor(rowNumber % 2 === 0 ? rowNumber / 2 : (rowNumber - 1) / 2);
  hexesForCompleteGrid = rowNumber * gridColumnNumber - rowOffset;
  emptyHexes = hexesForCompleteGrid - filteredData.length > 0 ? createEmptyArray(hexesForCompleteGrid - filteredData.length) : [];
  {
    if (rowNumber) {
      (rowNumber % 2 === 0 ? gridColumnNumber - 1 : gridColumnNumber) - emptyHexes.length;
    }
  }
  return `${``}`;
});
export { HexGrid as H };
