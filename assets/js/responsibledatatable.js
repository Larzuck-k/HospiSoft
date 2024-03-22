/*! Responsive 3.0.0
 * © SpryMedia Ltd - datatables.net/license
 */
!function(n){var i,r;"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return n(e,window,document)}):"object"==typeof exports?(i=require("jquery"),r=function(e,t){t.fn.dataTable||require("datatables.net")(e,t)},"undefined"==typeof window?module.exports=function(e,t){return e=e||window,t=t||i(e),r(e,t),n(t,e,e.document)}:(r(window,i),module.exports=n(i,window,window.document))):n(jQuery,window,document)}(function(m,v,d){"use strict";function a(e,t){if(!i.versionCheck||!i.versionCheck("2"))throw"DataTables Responsive requires DataTables 2 or newer";this.s={childNodeStore:{},columns:[],current:[],dt:new i.Api(e)},this.s.dt.settings()[0].responsive||(t&&"string"==typeof t.details?t.details={type:t.details}:t&&!1===t.details?t.details={type:!1}:t&&!0===t.details&&(t.details={type:"inline"}),this.c=m.extend(!0,{},a.defaults,i.defaults.responsive,t),(e.responsive=this)._constructor())}var i=m.fn.dataTable,e=(m.extend(a.prototype,{_constructor:function(){var s=this,r=this.s.dt,t=m(v).innerWidth(),e=(r.settings()[0]._responsive=this,m(v).on("orientationchange.dtr",i.util.throttle(function(){var e=m(v).innerWidth();e!==t&&(s._resize(),t=e)})),r.on("row-created.dtr",function(e,t,n,i){-1!==m.inArray(!1,s.s.current)&&m(">td, >th",t).each(function(e){e=r.column.index("toData",e);!1===s.s.current[e]&&m(this).css("display","none")})}),r.on("destroy.dtr",function(){r.off(".dtr"),m(r.table().body()).off(".dtr"),m(v).off("resize.dtr orientationchange.dtr"),r.cells(".dtr-control").nodes().to$().removeClass("dtr-control"),m(r.table().node()).removeClass("dtr-inline collapsed"),m.each(s.s.current,function(e,t){!1===t&&s._setColumnVis(e,!0)})}),this.c.breakpoints.sort(function(e,t){return e.width<t.width?1:e.width>t.width?-1:0}),this._classLogic(),this._resizeAuto(),this.c.details);!1!==e.type&&(s._detailsInit(),r.on("column-visibility.dtr",function(){s._timer&&clearTimeout(s._timer),s._timer=setTimeout(function(){s._timer=null,s._classLogic(),s._resizeAuto(),s._resize(!0),s._redrawChildren()},100)}),r.on("draw.dtr",function(){s._redrawChildren()}),m(r.table().node()).addClass("dtr-"+e.type)),r.on("column-reorder.dtr",function(e,t,n){s._classLogic(),s._resizeAuto(),s._resize(!0)}),r.on("column-sizing.dtr",function(){s._resizeAuto(),s._resize()}),r.on("column-calc.dt",function(e,t){for(var n=s.s.current,i=0;i<n.length;i++){var r=t.visible.indexOf(i);!1===n[i]&&0<=r&&t.visible.splice(r,1)}}),r.on("preXhr.dtr",function(){var e=[];r.rows().every(function(){this.child.isShown()&&e.push(this.id(!0))}),r.one("draw.dtr",function(){s._resizeAuto(),s._resize(),r.rows(e).every(function(){s._detailsDisplay(this,!1)})})}),r.on("draw.dtr",function(){s._controlClass()}).on("init.dtr",function(e,t,n){"dt"===e.namespace&&(s._resizeAuto(),s._resize(),m.inArray(!1,s.s.current))&&r.columns.adjust()}),this._resize()},_childNodes:function(e,t,n){var i=t+"-"+n;if(this.s.childNodeStore[i])return this.s.childNodeStore[i];for(var r=[],s=e.cell(t,n).node().childNodes,o=0,d=s.length;o<d;o++)r.push(s[o]);return this.s.childNodeStore[i]=r},_childNodesRestore:function(e,t,n){var i=t+"-"+n;if(this.s.childNodeStore[i]){var r=e.cell(t,n).node(),e=this.s.childNodeStore[i];if(0<e.length){for(var s=e[0].parentNode.childNodes,o=[],d=0,a=s.length;d<a;d++)o.push(s[d]);for(var l=0,c=o.length;l<c;l++)r.appendChild(o[l])}this.s.childNodeStore[i]=void 0}},_columnsVisiblity:function(n){for(var i=this.s.dt,e=this.s.columns,t=e.map(function(e,t){return{columnIdx:t,priority:e.priority}}).sort(function(e,t){return e.priority!==t.priority?e.priority-t.priority:e.columnIdx-t.columnIdx}),r=m.map(e,function(e,t){return!1===i.column(t).visible()?"not-visible":(!e.auto||null!==e.minWidth)&&(!0===e.auto?"-":-1!==m.inArray(n,e.includeIn))}),s=0,o=0,d=r.length;o<d;o++)!0===r[o]&&(s+=e[o].minWidth);var a=i.settings()[0].oScroll,a=a.sY||a.sX?a.iBarWidth:0,l=i.table().container().offsetWidth-a-s;for(o=0,d=r.length;o<d;o++)e[o].control&&(l-=e[o].minWidth);var c=!1;for(o=0,d=t.length;o<d;o++){var u=t[o].columnIdx;"-"===r[u]&&!e[u].control&&e[u].minWidth&&(c||l-e[u].minWidth<0?r[u]=!(c=!0):r[u]=!0,l-=e[u].minWidth)}var h=!1;for(o=0,d=e.length;o<d;o++)if(!e[o].control&&!e[o].never&&!1===r[o]){h=!0;break}for(o=0,d=e.length;o<d;o++)e[o].control&&(r[o]=h),"not-visible"===r[o]&&(r[o]=!1);return-1===m.inArray(!0,r)&&(r[0]=!0),r},_classLogic:function(){function d(e,t,n,i){var r,s,o;if(n){if("max-"===n)for(r=a._find(t).width,s=0,o=l.length;s<o;s++)l[s].width<=r&&u(e,l[s].name);else if("min-"===n)for(r=a._find(t).width,s=0,o=l.length;s<o;s++)l[s].width>=r&&u(e,l[s].name);else if("not-"===n)for(s=0,o=l.length;s<o;s++)-1===l[s].name.indexOf(i)&&u(e,l[s].name)}else c[e].includeIn.push(t)}var a=this,l=this.c.breakpoints,c=this.s.dt.columns().eq(0).map(function(e){var e=this.column(e),t=e.header().className,n=e.init().responsivePriority,e=e.header().getAttribute("data-priority");return void 0===n&&(n=null==e?1e4:+e),{className:t,includeIn:[],auto:!1,control:!1,never:!!t.match(/\b(dtr\-)?never\b/),priority:n}}),u=function(e,t){e=c[e].includeIn;-1===m.inArray(t,e)&&e.push(t)};c.each(function(e,r){for(var t=e.className.split(" "),s=!1,n=0,i=t.length;n<i;n++){var o=t[n].trim();if("all"===o||"dtr-all"===o)return s=!0,void(e.includeIn=m.map(l,function(e){return e.name}));if("none"===o||"dtr-none"===o||e.never)return void(s=!0);if("control"===o||"dtr-control"===o)return s=!0,void(e.control=!0);m.each(l,function(e,t){var n=t.name.split("-"),i=new RegExp("(min\\-|max\\-|not\\-)?("+n[0]+")(\\-[_a-zA-Z0-9])?"),i=o.match(i);i&&(s=!0,i[2]===n[0]&&i[3]==="-"+n[1]?d(r,t.name,i[1],i[2]+i[3]):i[2]!==n[0]||i[3]||d(r,t.name,i[1],i[2]))})}s||(e.auto=!0)}),this.s.columns=c},_controlClass:function(){var e,t,n;"inline"===this.c.details.type&&(e=this.s.dt,t=this.s.current,n=m.inArray(!0,t),e.cells(null,function(e){return e!==n},{page:"current"}).nodes().to$().filter(".dtr-control").removeClass("dtr-control"),e.cells(null,n,{page:"current"}).nodes().to$().addClass("dtr-control"))},_detailsDisplay:function(t,n){function e(e){m(t.node()).toggleClass("dtr-expanded",!1!==e),m(s.table().node()).triggerHandler("responsive-display.dt",[s,t,e,n])}var i,r=this,s=this.s.dt,o=this.c.details;o&&!1!==o.type&&(i="string"==typeof o.renderer?a.renderer[o.renderer]():o.renderer,"boolean"==typeof(o=o.display(t,n,function(){return i.call(r,s,t[0][0],r._detailsObj(t[0]))},function(){e(!1)})))&&e(o)},_detailsInit:function(){var n=this,i=this.s.dt,e=this.c.details,r=("inline"===e.type&&(e.target="td.dtr-control, th.dtr-control"),i.on("draw.dtr",function(){n._tabIndexes()}),n._tabIndexes(),m(i.table().body()).on("keyup.dtr","td, th",function(e){13===e.keyCode&&m(this).data("dtr-keyboard")&&m(this).click()}),e.target),e="string"==typeof r?r:"td, th";void 0===r&&null===r||m(i.table().body()).on("click.dtr mousedown.dtr mouseup.dtr",e,function(e){if(m(i.table().node()).hasClass("collapsed")&&-1!==m.inArray(m(this).closest("tr").get(0),i.rows().nodes().toArray())){if("number"==typeof r){var t=r<0?i.columns().eq(0).length+r:r;if(i.cell(this).index().column!==t)return}t=i.row(m(this).closest("tr"));"click"===e.type?n._detailsDisplay(t,!1):"mousedown"===e.type?m(this).css("outline","none"):"mouseup"===e.type&&m(this).trigger("blur").css("outline","")}})},_detailsObj:function(n){var i=this,r=this.s.dt;return m.map(this.s.columns,function(e,t){if(!e.never&&!e.control)return{className:r.settings()[0].aoColumns[t].sClass,columnIndex:t,data:r.cell(n,t).render(i.c.orthogonal),hidden:r.column(t).visible()&&!i.s.current[t],rowIndex:n,title:r.column(t).title()}})},_find:function(e){for(var t=this.c.breakpoints,n=0,i=t.length;n<i;n++)if(t[n].name===e)return t[n]},_redrawChildren:function(){var n=this,i=this.s.dt;i.rows({page:"current"}).iterator("row",function(e,t){n._detailsDisplay(i.row(t),!0)})},_resize:function(n){for(var e,i=this,r=this.s.dt,t=m(v).innerWidth(),s=this.c.breakpoints,o=s[0].name,d=this.s.columns,a=this.s.current.slice(),l=s.length-1;0<=l;l--)if(t<=s[l].width){o=s[l].name;break}var c=this._columnsVisiblity(o),u=(this.s.current=c,!1);for(l=0,e=d.length;l<e;l++)if(!1===c[l]&&!d[l].never&&!d[l].control&&!1==!r.column(l).visible()){u=!0;break}m(r.table().node()).toggleClass("collapsed",u);var h=!1,p=0,f=r.settings()[0];r.columns().eq(0).each(function(e,t){r.column(e).visible()&&(!0===c[t]&&p++,!n&&c[t]===a[t]||(h=!0,i._setColumnVis(e,c[t])),c[t]||m(f.aoColumns[e].colEl).detach())}),h&&(this._redrawChildren(),m(r.table().node()).trigger("responsive-resize.dt",[r,this._responsiveOnlyHidden()]),0===r.page.info().recordsDisplay)&&m("td",r.table().body()).eq(0).attr("colspan",p),i._controlClass()},_resizeAuto:function(){var t=this.s.dt,n=this.s.columns,r=this,e=t.columns().indexes().filter(function(e){return t.column(e).visible()});if(this.c.auto&&-1!==m.inArray(!0,m.map(n,function(e){return e.auto}))){for(var i=t.table().node().cloneNode(!1),s=m(t.table().header().cloneNode(!1)).appendTo(i),o=m(t.table().footer().cloneNode(!1)).appendTo(i),d=m(t.table().body()).clone(!1,!1).empty().appendTo(i),a=(i.style.width="auto",t.table().header.structure(e).forEach(e=>{e=e.filter(function(e){return!!e}).map(function(e){return m(e.cell).clone(!1).css("display","table-cell").css("width","auto").css("min-width",0)});m("<tr/>").append(e).appendTo(s)}),m("<tr/>").appendTo(d)),l=0;l<e.count();l++)a.append("<td/>");t.rows({page:"current"}).every(function(n){var i,e=this.node();e&&(i=e.cloneNode(!1),t.cells(n,"*").every(function(e,t){t=r.s.childNodeStore[n+"-"+t];(t?m(this.node().cloneNode(!1)).append(m(t).clone()):m(this.node()).clone(!1)).appendTo(i)}),d.append(i))}),d.find("th, td").css("display",""),t.table().footer.structure(e).forEach(e=>{e=e.filter(function(e){return!!e}).map(function(e){return m(e.cell).clone(!1).css("display","table-cell").css("width","auto").css("min-width",0)});m("<tr/>").append(e).appendTo(o)}),"inline"===this.c.details.type&&m(i).addClass("dtr-inline collapsed"),m(i).find("[name]").removeAttr("name"),m(i).css("position","relative");i=m("<div/>").css({width:1,height:1,overflow:"hidden",clear:"both"}).append(i);i.insertBefore(t.table().node()),a.children().each(function(e){e=t.column.index("fromVisible",e);n[e].minWidth=this.offsetWidth||0}),i.remove()}},_responsiveOnlyHidden:function(){var n=this.s.dt;return m.map(this.s.current,function(e,t){return!1===n.column(t).visible()||e})},_setColumnVis:function(e,t){var n=this,i=this.s.dt,r=t?"":"none";this._setHeaderVis(e,t,i.table().header.structure()),this._setHeaderVis(e,t,i.table().footer.structure()),i.column(e).nodes().to$().css("display",r).toggleClass("dtr-hidden",!t),m.isEmptyObject(this.s.childNodeStore)||i.cells(null,e).indexes().each(function(e){n._childNodesRestore(i,e.row,e.column)})},_setHeaderVis:function(n,i,e){var r=this,s=i?"":"none";e.forEach(function(e){if(e[n])m(e[n].cell).css("display",s).toggleClass("dtr-hidden",!i);else for(var t=n;0<=t;){if(e[t]){e[t].cell.colSpan=r._colspan(e,t);break}t--}})},_colspan:function(e,t){for(var n=1,i=t+1;i<e.length;i++)if(null===e[i]&&this.s.current[i])n++;else if(e[i])break;return n},_tabIndexes:function(){var e=this.s.dt,t=e.cells({page:"current"}).nodes().to$(),n=e.settings()[0],i=this.c.details.target;t.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]"),("number"==typeof i?e.cells(null,i,{page:"current"}).nodes().to$():m(i="td:first-child, th:first-child"===i?">td:first-child, >th:first-child":i,e.rows({page:"current"}).nodes())).attr("tabIndex",n.iTabIndex).data("dtr-keyboard",1)}}),a.defaults={breakpoints:a.breakpoints=[{name:"desktop",width:1/0},{name:"tablet-l",width:1024},{name:"tablet-p",width:768},{name:"mobile-l",width:480},{name:"mobile-p",width:320}],auto:!0,details:{display:(a.display={childRow:function(e,t,n){var i=m(e.node());return t?i.hasClass("dtr-expanded")?(e.child(n(),"child").show(),!0):void 0:i.hasClass("dtr-expanded")?(e.child(!1),!1):!1!==(t=n())&&(e.child(t,"child").show(),!0)},childRowImmediate:function(e,t,n){var i=m(e.node());return!t&&i.hasClass("dtr-expanded")||!e.responsive.hasHidden()?(e.child(!1),!1):!1!==(t=n())&&(e.child(t,"child").show(),!0)},modal:function(o){return function(e,t,n,i){n=n();if(!1===n)return!1;if(t){if(!(s=m("div.dtr-modal-content")).length||e.index()!==s.data("dtr-row-idx"))return null;s.empty().append(n)}else{var r=function(){s.remove(),m(d).off("keypress.dtr"),m(e.node()).removeClass("dtr-expanded"),i()},s=m('<div class="dtr-modal"/>').append(m('<div class="dtr-modal-display"/>').append(m('<div class="dtr-modal-content"/>').data("dtr-row-idx",e.index()).append(n)).append(m('<div class="dtr-modal-close">&times;</div>').click(function(){r()}))).append(m('<div class="dtr-modal-background"/>').click(function(){r()})).appendTo("body");m(e.node()).addClass("dtr-expanded"),m(d).on("keyup.dtr",function(e){27===e.keyCode&&(e.stopPropagation(),r())})}return o&&o.header&&m("div.dtr-modal-content").prepend("<h2>"+o.header(e)+"</h2>"),!0}}}).childRow,renderer:(a.renderer={listHiddenNodes:function(){return function(i,e,t){var r=this,s=m('<ul data-dtr-index="'+e+'" class="dtr-details"/>'),o=!1;return m.each(t,function(e,t){var n;t.hidden&&(n=t.className?'class="'+t.className+'"':"",m("<li "+n+' data-dtr-index="'+t.columnIndex+'" data-dt-row="'+t.rowIndex+'" data-dt-column="'+t.columnIndex+'"><span class="dtr-title">'+t.title+"</span> </li>").append(m('<span class="dtr-data"/>').append(r._childNodes(i,t.rowIndex,t.columnIndex))).appendTo(s),o=!0)}),!!o&&s}},listHidden:function(){return function(e,t,n){n=m.map(n,function(e){var t=e.className?'class="'+e.className+'"':"";return e.hidden?"<li "+t+' data-dtr-index="'+e.columnIndex+'" data-dt-row="'+e.rowIndex+'" data-dt-column="'+e.columnIndex+'"><span class="dtr-title">'+e.title+'</span> <span class="dtr-data">'+e.data+"</span></li>":""}).join("");return!!n&&m('<ul data-dtr-index="'+t+'" class="dtr-details"/>').append(n)}},tableAll:function(i){return i=m.extend({tableClass:""},i),function(e,t,n){n=m.map(n,function(e){return"<tr "+(e.className?'class="'+e.className+'"':"")+' data-dt-row="'+e.rowIndex+'" data-dt-column="'+e.columnIndex+'"><td>'+e.title+":</td> <td>"+e.data+"</td></tr>"}).join("");return m('<table class="'+i.tableClass+' dtr-details" width="100%"/>').append(n)}}}).listHidden(),target:0,type:"inline"},orthogonal:"display"},m.fn.dataTable.Api);return e.register("responsive()",function(){return this}),e.register("responsive.index()",function(e){return{column:(e=m(e)).data("dtr-index"),row:e.parent().data("dtr-index")}}),e.register("responsive.rebuild()",function(){return this.iterator("table",function(e){e._responsive&&e._responsive._classLogic()})}),e.register("responsive.recalc()",function(){return this.iterator("table",function(e){e._responsive&&(e._responsive._resizeAuto(),e._responsive._resize())})}),e.register("responsive.hasHidden()",function(){var e=this.context[0];return!!e._responsive&&-1!==m.inArray(!1,e._responsive._responsiveOnlyHidden())}),e.registerPlural("columns().responsiveHidden()","column().responsiveHidden()",function(){return this.iterator("column",function(e,t){return!!e._responsive&&e._responsive._responsiveOnlyHidden()[t]},1)}),a.version="3.0.0",m.fn.dataTable.Responsive=a,m.fn.DataTable.Responsive=a,m(d).on("preInit.dt.dtr",function(e,t,n){"dt"===e.namespace&&(m(t.nTable).hasClass("responsive")||m(t.nTable).hasClass("dt-responsive")||t.oInit.responsive||i.defaults.responsive)&&!1!==(e=t.oInit.responsive)&&new a(t,m.isPlainObject(e)?e:{})}),i});