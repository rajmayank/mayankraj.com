"use strict";
exports.id = 711;
exports.ids = [711];
exports.modules = {

/***/ 4610:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4107);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2042);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3578);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1403);
const GooFilter=()=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg",{style:{visibility:"hidden",position:"absolute"},width:"0",height:"0",xmlns:"http://www.w3.org/2000/svg",version:"1.1"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("filter",{id:"goo"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"10",result:"blur"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("feColorMatrix",{in:"blur",mode:"matrix",values:"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9",result:"goo"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("feComposite",{in:"SourceGraphic",in2:"goo",operator:"atop"}))));const CompactHeader=({title,category,date,bgImageName,mood="#fdfdfd",readingTime})=>{const data=(0,gatsby__WEBPACK_IMPORTED_MODULE_1__.useStaticQuery)("1997719401");const imageData=data.allFile.edges.find(edge=>edge.node.name===bgImageName);const gatsbyImageData=imageData?(0,gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__/* .getImage */ .Qp)(imageData.node.childImageSharp.gatsbyImageData):(0,gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__/* .getImage */ .Qp)(data.allFile.edges.find(edge=>edge.node.name==="blog_index_cover").node.childImageSharp.gatsbyImageData);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("header",{className:"compact",style:{"--mood":mood}},gatsbyImageData&&/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__/* .GatsbyImage */ .mV,{image:gatsbyImageData,alt:"",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"compact-header-container"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(GooFilter,null),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"text-container"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"merged-bg-container title"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span",null,title)),(category||date)&&/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"merged-bg-container meta-data"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span",null,category,category&&date&&/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br",null),date,readingTime&&` | ${readingTime}`)))));};CompactHeader.propTypes={title:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired,category:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),date:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),bgImageName:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),mood:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),readingTime:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CompactHeader);

/***/ }),

/***/ 1698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ blog)
});

// EXTERNAL MODULE: external "/home/runner/.yarn/berry/cache/react-npm-18.3.1-af38f3c1ae-10c0.zip/node_modules/react/index.js"
var index_js_ = __webpack_require__(4107);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
;// CONCATENATED MODULE: ./src/assets/images/blog_covers/blog_index_cover.jpeg
/* harmony default export */ const blog_index_cover = ("/static/blog_index_cover-200a7a78fbf83a7bbf35ad9b51b50b9c.jpeg");
// EXTERNAL MODULE: ./src/components/compact-header.js
var compact_header = __webpack_require__(4610);
// EXTERNAL MODULE: ./src/components/blog-post-listing.js
var blog_post_listing = __webpack_require__(363);
// EXTERNAL MODULE: ./src/components/footer.js
var footer = __webpack_require__(1436);
// EXTERNAL MODULE: ./src/components/seo.js + 1 modules
var seo = __webpack_require__(7506);
;// CONCATENATED MODULE: ./src/pages/blog.js
// Added SEO component
class BlogListPage extends (index_js_default()).Component{render(){const posts=this.props.data.allMarkdownRemark.edges;return/*#__PURE__*/index_js_default().createElement("div",null,/*#__PURE__*/index_js_default().createElement(seo/* default */.A,{title:"Blog"})," ",/*#__PURE__*/index_js_default().createElement(compact_header/* default */.A,{title:"Blog Articles",mood:"#fdfdfd",bgUrl:blog_index_cover}),/*#__PURE__*/index_js_default().createElement("main",null,/*#__PURE__*/index_js_default().createElement("div",{className:"post-list-container"},/*#__PURE__*/index_js_default().createElement(blog_post_listing/* default */.A,{posts:posts}))),/*#__PURE__*/index_js_default().createElement(footer/* default */.A,null));}}/* harmony default export */ const blog = (BlogListPage);const pageQuery="3341063686";

/***/ })

};
;
//# sourceMappingURL=component---src-pages-blog-js.js.map