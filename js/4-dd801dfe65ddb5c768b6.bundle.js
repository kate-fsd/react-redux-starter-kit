(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{735:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var r=n(11);function o(e,t,n,o){return r.a({actions:t,selectors:n,containers:e},o)}},737:function(e,t,n){},738:function(e,t,n){"use strict";var r=n(11),o=n(0),c=n(740);n(739),n(737);t.a=function(e){return o.createElement(c.a,r.a({},e))}},766:function(e,t,n){},771:function(e,t,n){"use strict";n.r(t);var r={};n.d(r,"selectCategories",function(){return u}),n.d(r,"selectChosenCategoryUid",function(){return s}),n.d(r,"selectCategoriesFetching",function(){return C});var o={};n.d(o,"loadCategories",function(){return d}),n.d(o,"loadCategoriesSuccess",function(){return O}),n.d(o,"loadCategoriesFail",function(){return g}),n.d(o,"chooseCategory",function(){return f});var c={};n.d(c,"CategorySelect",function(){return P});var a=n(735);function i(e){if(!e.categorySelect)throw new Error("Cannot find categorySelect feature state!");return e.categorySelect}function u(e){return i(e).data.categories}function s(e){return i(e).edit.selectedCategoryUid}function C(e){return i(e).communications.categoriesFetching}var l,E=n(92),d=(l=Object(E.c)("CATEGORY_SELECT:LOAD_CATEGORIES","CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED","CATEGORY_SELECT:LOAD_CATEGORIES_FAIL")).execute,O=l.completed,g=l.failed;function f(e){return{type:"CATEGORY_SELECT:CHOOSE_CATEGORY",payload:{value:e,error:""}}}var p=n(11),b=n(0),y=n(77),A=n(29),T=n(22),h=n(32),S=n.n(h),m=n(17),_=n(738),v={data:{categories:[]},edit:{selectedCategoryUid:{value:null,error:""}},communications:{categoriesFetching:p.a({},E.b)}};var R=Object(A.combineReducers)({categories:function(e,t){switch(void 0===e&&(e=v.data.categories),t.type){case"CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED":return t.payload;default:return e}}}),L=Object(A.combineReducers)({selectedCategoryUid:Object(E.e)("CATEGORY_SELECT:CHOOSE_CATEGORY",v.edit.selectedCategoryUid)}),G=Object(A.combineReducers)({categoriesFetching:Object(E.d)("CATEGORY_SELECT:LOAD_CATEGORIES","CATEGORY_SELECT:LOAD_CATEGORIES_COMPLETED","CATEGORY_SELECT:LOAD_CATEGORIES_FAIL",v.communications.categoriesFetching)}),j=Object(A.combineReducers)({data:R,edit:L,communications:G}),D=n(62),Y=n(212),w="CATEGORY_SELECT:LOAD_CATEGORIES";function I(e){var t,n,r,o=e.api;return p.e(this,function(e){switch(e.label){case 0:return e.trys.push([0,3,,5]),[4,Object(D.a)(o.loadCategories)];case 1:return t=e.sent(),[4,Object(D.b)(O(t))];case 2:return e.sent(),[3,5];case 3:return n=e.sent(),r=Object(Y.a)(n),[4,Object(D.b)(g(r))];case 4:return e.sent(),[3,5];case 5:return[2]}})}var F=function(e){return function(){return p.e(this,function(t){switch(t.label){case 0:return[4,Object(D.c)(w,I,e)];case 1:return t.sent(),[2]}})}};n(766);var U=S()("categories-select"),M=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return p.d(t,e),t.prototype.componentDidMount=function(){this.props.loadCategories()},t.prototype.render=function(){var e=this.props,t=e.chosenCategoryUid,n=e.options;return b.createElement(m.e,null,b.createElement(m.b,{className:U("select-label")()},b.createElement("b",null,"Choose category:")),b.createElement(_.a,{name:"category",value:t||void 0,options:n,onChange:this.onSelect}))},t.prototype.onSelect=function(e){e&&!Array.isArray(e)&&"number"==typeof e.value&&(this.props.chooseCategory(e.value),this.props.onCategoryChosen(e.value))},p.c([T.bind],t.prototype,"onSelect",null),t}(b.PureComponent),P=Object(y.b)(function(e){return{options:r.selectCategories(e).map(function(e){return{label:e.name,value:e.uid}}),chosenCategoryUid:r.selectChosenCategoryUid(e).value}},function(e){return Object(A.bindActionCreators)({loadCategories:o.loadCategories,chooseCategory:o.chooseCategory},e)})(M);n.d(t,"entry",function(){return k});var k=Object(a.a)(c,o,r,{reducers:{categorySelect:j},sagas:[F]})}}]);