(self.webpackChunkweb_cms_dtvn=self.webpackChunkweb_cms_dtvn||[]).push([[137],{6675:(j,x,h)=>{"use strict";h.d(x,{I:()=>f});var I=h(1764),A=h.n(I),t=h(5268),C=h.n(t);A().extend(C());class f{static isoToVnTime(w){return w&&0!==w.length?A().utc(w).local().format("DD/MM/YYYY HH:mm:ss"):"N/A"}}},3137:(j,x,h)=>{"use strict";h.r(x),h.d(x,{MqttLogModule:()=>$});var I=h(9808),A=h(8753),t=h(5e3),C=h(6675),f=h(1764),m=h.n(f),w=h(5268),_=h.n(w),B=h(1484),L=h(9783),Z=h(5330),a=h(5431),P=h(8386),b=h(8952),q=h(2382),S=h(1424),N=h(4036),H=h(4119),E=h(5077),U=h(845),J=h(4132),v=h(5787);const p=["divTable"],F=["divPaginator"],W=function(){return{applyLabel:"Ch\u1ecdn",clearLabel:"X\xf3a",format:"HH:mm DD/MM/YYYY",separator:" \u0111\u1ebfn "}};function r(o,y){if(1&o){const n=t.EpF();t.TgZ(0,"div",17)(1,"div",18)(2,"input",19),t.NdJ("ngModelChange",function(M){return t.CHM(n),t.oxw().code=M}),t.qZA()(),t.TgZ(3,"div",18)(4,"p-dropdown",20),t.NdJ("ngModelChange",function(M){return t.CHM(n),t.oxw().type=M}),t.qZA()(),t.TgZ(5,"div",18)(6,"input",21),t.NdJ("ngModelChange",function(M){return t.CHM(n),t.oxw().message_id=M}),t.qZA()(),t.TgZ(7,"div",18)(8,"input",22),t.NdJ("ngModelChange",function(M){return t.CHM(n),t.oxw().rangeTimes=M}),t.qZA()(),t.TgZ(9,"div",23)(10,"div",24)(11,"span")(12,"button",25),t.NdJ("click",function(){return t.CHM(n),t.oxw().onClear()}),t.qZA(),t.TgZ(13,"button",26),t.NdJ("click",function(){return t.CHM(n),t.oxw().onSearch()}),t.qZA()()()()()}if(2&o){const n=t.oxw();t.xp6(2),t.Q6J("ngModel",n.code),t.xp6(2),t.Q6J("options",n.typeOption)("ngModel",n.type),t.xp6(2),t.Q6J("ngModel",n.message_id),t.xp6(2),t.Q6J("showDropdowns",!0)("locale",t.DdM(14,W))("showClearButton",!0)("timePicker",!0)("timePicker24Hour",!0)("dateLimit",93)("ngModel",n.rangeTimes)("ranges",n.ranges)("alwaysShowCalendars",!0),t.xp6(5),t.Q6J("disabled",!n.rangeTimes||n.rangeTimes&&!n.rangeTimes.startDate&&!n.rangeTimes.endDate)}}function s(o,y){1&o&&(t.TgZ(0,"tr")(1,"th",27),t._uU(2,"#"),t.qZA(),t.TgZ(3,"th",28),t._uU(4,"M\xe3 (MAC)"),t.qZA(),t.TgZ(5,"th",28),t._uU(6,"Lo\u1ea1i"),t.qZA(),t.TgZ(7,"th",28),t._uU(8,"ID"),t.qZA(),t.TgZ(9,"th",29),t._uU(10,"B\u1ea3n tin"),t.qZA(),t.TgZ(11,"th",30),t._uU(12,"Th\u1eddi gian t\u1ea1o "),t._UZ(13,"p-sortIcon",31),t.qZA()())}function e(o,y){if(1&o&&(t.TgZ(0,"tr")(1,"td",27),t._uU(2),t.qZA(),t.TgZ(3,"td",28),t._uU(4),t.qZA(),t.TgZ(5,"td",28),t._uU(6),t.qZA(),t.TgZ(7,"td",28),t._uU(8),t.qZA(),t.TgZ(9,"td",29),t._uU(10),t.qZA(),t.TgZ(11,"td",32),t._uU(12),t.qZA()()),2&o){const n=y.$implicit,c=y.rowIndex,M=t.oxw();t.xp6(2),t.Oqu((M.currentPage-1)*M.itemsPerPage+1+c),t.xp6(2),t.Oqu(n.code),t.xp6(2),t.Oqu(n.type),t.xp6(2),t.Oqu(n.message_id),t.xp6(2),t.Oqu(n.message),t.xp6(2),t.Oqu(M.convertTime(n.created_at))}}function u(o,y){1&o&&(t.TgZ(0,"div",33),t._uU(1," Kh\xf4ng c\xf3 d\u1eef li\u1ec7u trong m\u1ee5c n\xe0y. H\xe3y ch\u1ecdn c\xe1c \u0111i\u1ec1u ki\u1ec7n ph\xf9 h\u1ee3p v\xe0 T\xecm ki\u1ebfm. "),t.qZA())}const i=function(){return[15,20,30,50]};m().extend(_());const l=[{path:"",component:(()=>{class o{constructor(n,c,M,D,O,Y,R){this.logHttpService=n,this.messageService=c,this.renderer=M,this.dialogService=D,this.permissionService=O,this.router=Y,this.userService=R,this.offset=0,this.totalItems=0,this.itemsPerPage=15,this.currentPage=1,this.mqttLogs=[],this.typeOption=[{name:"T\u1ea5t c\u1ea3",value:void 0},{name:"D\u1eef li\u1ec7u",value:"sensor"},{name:"Ph\u1ea3n h\u1ed3i c\u1ea5u h\xecnh",value:"res_config"},{name:"Ph\u1ea3n h\u1ed3i \u0111i\u1ec1u khi\u1ec3n",value:"res_control"},{name:"Ph\u1ea3n h\u1ed3i tin nh\u1eafn",value:"res_sms"},{name:"Ph\u1ea3n h\u1ed3i l\u1ec7nh \u0111\u1eb7c bi\u1ec7t",value:"res_cmd"},{name:"Ping",value:"ping"}],this.loading=!1,this.ranges={"H\xf4m nay":[m()().startOf("dates"),m()().endOf("dates")],"H\xf4m qua":[m()().subtract(1,"days").startOf("dates"),m()().subtract(1,"days").endOf("dates")],"7 ng\xe0y g\u1ea7n nh\u1ea5t":[m()().subtract(6,"days").startOf("dates"),m()().endOf("dates")],"Th\xe1ng n\xe0y":[m()().startOf("month"),m()().endOf("month")],"3 th\xe1ng g\u1ea7n nh\u1ea5t":[m()().subtract(2,"month").startOf("month"),m()().endOf("month")],"6 th\xe1ng g\u1ea7n nh\u1ea5t":[m()().subtract(5,"month").startOf("month"),m()().endOf("month")]}}ngOnDestroy(){this.subPermission&&this.subPermission.unsubscribe(),this.loadingTime&&clearTimeout(this.loadingTime)}setStyleDiv(){this.renderer.setStyle(this.divTable.nativeElement,"bottom",`  ${this.divPaginator.nativeElement.offsetHeight}px`)}ngAfterViewInit(){this.setStyleDiv()}onWindowResize(){this.setStyleDiv()}ngOnInit(){this.user=this.userService.getMyAccount(),this.subPermission=this.permissionService.currentPermission.subscribe(n=>{n&&(this.permission=n),3!==this.user.user_group&&(this.startDate=m()().subtract(1,"years").startOf("dates").utc().format(),this.endDate=m()().endOf("dates").utc().format(),this.fetchListOfMqttLogs())})}fetchListOfMqttLogs(){this.loadingTime=setTimeout(()=>{this.loading=!0},1e3),this.logHttpService.getListMqttLogs(this.code,this.type,this.message_id,this.startDate,this.endDate,this.itemsPerPage,this.offset).subscribe({next:n=>{200===n.status?(console.log("fetchListOfMqttLogs",n),this.mqttLogs=n.metadata.docs,this.totalItems=n.metadata.totalDocs,this.loading=!1,this.loadingTime&&clearTimeout(this.loadingTime)):(this.messageService.add({severity:"error",summary:"L\u1ed7i",detail:`${n.message}`}),console.error("C\xf3 l\u1ed7i x\u1ea3y ra",n.message),this.loading=!1,this.loadingTime&&clearTimeout(this.loadingTime))},error:n=>{let c;c=n&&n.error&&n.error.message?n.error.message:"C\xf3 l\u1ed7i x\u1ea3y ra. Vui l\xf2ng th\u1eed l\u1ea1i!",this.messageService.add({severity:"error",summary:"L\u1ed7i",detail:c}),console.error("C\xf3 l\u1ed7i x\u1ea3y ra",n),this.loading=!1,this.loadingTime&&clearTimeout(this.loadingTime)}})}onPageChange(n){this.currentPage=n.page+1,this.itemsPerPage=n.rows,this.offset=(this.currentPage-1)*this.itemsPerPage,this.fetchListOfMqttLogs()}onReSync(){this.fetchListOfMqttLogs()}convertTime(n){return C.I.isoToVnTime(n)}formatCurrency(n){return new Intl.NumberFormat("en-US").format(n)}onGoBackHome(){this.router.navigate(["/"])}onClear(){this.startDate=void 0,this.endDate=void 0,this.rangeTimes=void 0,this.code=void 0,this.type=void 0,this.message_id=void 0}onSearch(){this.startDate=this.rangeTimes&&this.rangeTimes.startDate?m().utc(this.rangeTimes.startDate).subtract(7,"hours").format():null,this.endDate=this.rangeTimes&&this.rangeTimes.endDate?m().utc(this.rangeTimes.endDate).subtract(7,"hours").format():null,this.fetchListOfMqttLogs()}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(B.m),t.Y36(L.ez),t.Y36(t.Qsj),t.Y36(Z.xA),t.Y36(a.$),t.Y36(A.F0),t.Y36(P.K))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-mqtt-log-management"]],viewQuery:function(n,c){if(1&n&&(t.Gf(p,5,t.SBq),t.Gf(F,5,t.SBq)),2&n){let M;t.iGM(M=t.CRH())&&(c.divTable=M.first),t.iGM(M=t.CRH())&&(c.divPaginator=M.first)}},decls:18,vars:12,consts:[[1,"relative","h-full","w-full",3,"resize"],[1,"absolute","top-0","left-0","w-full"],["divTable",""],["styleClass","p-datatable-sm","scrollHeight","flex",3,"value","scrollable","loading"],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[1,"absolute","bottom-0","left-0","w-full","border-top-1","border-gray-300"],["divPaginator",""],[1,"grid","grid-nogutter"],[1,"col-12","md:col-5","flex","align-items-center"],[1,"col-12","md:col-5","flex","align-items-center","justify-content-end"],["styleClass","p-0",3,"rows","totalRecords","rowsPerPageOptions","showJumpToPageDropdown","showPageLinks","onPageChange"],[1,"col-12","md:col-2","flex","align-items-center"],["pButton","","pRipple","","type","button","icon","fa-solid fa-sync",1,"p-button-raised","p-button-text","m-0",3,"click"],[1,"ml-1"],[1,"p-fluid","grid","formgrid"],[1,"field","col-12","md:col-2","mb-1"],["type","text","pInputText","","placeholder","Nh\u1eadp m\xe3 tr\u1ea1m (MAC)",3,"ngModel","ngModelChange"],["optionLabel","name","optionValue","value","placeholder","Ch\u1ecdn lo\u1ea1i b\u1ea3n tin","panelStyleClass","text-overflow-ellipsis text-sm","pTooltip","Ch\u1ecdn lo\u1ea1i b\u1ea3n tin","tooltipPosition","top",3,"options","ngModel","ngModelChange"],["type","text","pInputText","","placeholder","Nh\u1eadp m\xe3 b\u1ea3n tin",3,"ngModel","ngModelChange"],["type","text","pInputText","","placeholder","Ch\u1ecdn kho\u1ea3ng th\u1eddi gian","ngxDaterangepickerMd","",1,"w-full",3,"showDropdowns","locale","showClearButton","timePicker","timePicker24Hour","dateLimit","ngModel","ranges","alwaysShowCalendars","ngModelChange"],[1,"field","col-12","md:col-2"],[1,"flex","justify-content-between"],["type","button","pButton","","icon","fa-solid fa-undo","pTooltip","\u0110\u1eb7t l\u1ea1i","tooltipPosition","top",1,"mr-1",3,"click"],["type","button","pButton","","icon","fa-solid fa-search","pTooltip","T\xecm ki\u1ebfm","tooltipPosition","top",1,"mr-1",3,"disabled","click"],[2,"width","60px","max-width","60px"],[2,"width","100px","max-width","100px"],[2,"min-width","400px"],["pSortableColumn","created_at",2,"width","200px","max-width","200px"],["field","created_at"],[2,"width","200px","max-width","200px"],[1,"p-fluid","p-2"]],template:function(n,c){1&n&&(t.TgZ(0,"div",0),t.NdJ("resize",function(){return c.onWindowResize()},!1,t.Jf7),t.TgZ(1,"div",1,2)(3,"p-table",3),t.YNc(4,r,14,15,"ng-template",4),t.YNc(5,s,14,0,"ng-template",5),t.YNc(6,e,13,6,"ng-template",6),t.YNc(7,u,2,0,"ng-template",7),t.qZA()(),t.TgZ(8,"div",8,9)(10,"div",10),t._UZ(11,"div",11),t.TgZ(12,"div",12)(13,"p-paginator",13),t.NdJ("onPageChange",function(D){return c.onPageChange(D)}),t.qZA()(),t.TgZ(14,"div",14)(15,"button",15),t.NdJ("click",function(){return c.onReSync()}),t.qZA(),t.TgZ(16,"span",16),t._uU(17),t.qZA()()()()()),2&n&&(t.xp6(3),t.Q6J("value",c.mqttLogs)("scrollable",!0)("loading",c.loading),t.xp6(10),t.Q6J("rows",c.itemsPerPage)("totalRecords",c.totalItems)("rowsPerPageOptions",t.DdM(11,i))("showJumpToPageDropdown",!0)("showPageLinks",!1),t.xp6(4),t.lnq("Hi\u1ec3n th\u1ecb ",(c.currentPage-1)*c.itemsPerPage+1,"-",(c.currentPage-1)*c.itemsPerPage+c.itemsPerPage>c.totalItems?c.totalItems:(c.currentPage-1)*c.itemsPerPage+c.itemsPerPage,"/",c.totalItems,""))},directives:[b.iA,L.jx,q.Fj,S.o,q.JJ,q.On,N.Lt,H.u,E.SP,U.Hq,b.lQ,b.fz,J.D,v.H],styles:[""]}),o})()}];let g=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[A.Bz.forChild(l)],A.Bz]}),o})();var T=h(8910);let $=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[I.ez,g,T.m]]}),o})()},1764:function(j){j.exports=function(){"use strict";var h=6e4,I=36e5,A="millisecond",t="second",C="minute",f="hour",m="day",w="week",_="month",B="quarter",L="year",Z="date",a="Invalid Date",P=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,b=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,q={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(r){var s=["th","st","nd","rd"],e=r%100;return"["+r+(s[(e-20)%10]||s[e]||s[0])+"]"}},S=function(r,s,e){var u=String(r);return!u||u.length>=s?r:""+Array(s+1-u.length).join(e)+r},N={s:S,z:function(r){var s=-r.utcOffset(),e=Math.abs(s),u=Math.floor(e/60),i=e%60;return(s<=0?"+":"-")+S(u,2,"0")+":"+S(i,2,"0")},m:function r(s,e){if(s.date()<e.date())return-r(e,s);var u=12*(e.year()-s.year())+(e.month()-s.month()),i=s.clone().add(u,_),d=e-i<0,l=s.clone().add(u+(d?-1:1),_);return+(-(u+(e-i)/(d?i-l:l-i))||0)},a:function(r){return r<0?Math.ceil(r)||0:Math.floor(r)},p:function(r){return{M:_,y:L,w,d:m,D:Z,h:f,m:C,s:t,ms:A,Q:B}[r]||String(r||"").toLowerCase().replace(/s$/,"")},u:function(r){return void 0===r}},H="en",E={};E[H]=q;var U=function(r){return r instanceof F},J=function r(s,e,u){var i;if(!s)return H;if("string"==typeof s){var d=s.toLowerCase();E[d]&&(i=d),e&&(E[d]=e,i=d);var l=s.split("-");if(!i&&l.length>1)return r(l[0])}else{var g=s.name;E[g]=s,i=g}return!u&&i&&(H=i),i||!u&&H},v=function(r,s){if(U(r))return r.clone();var e="object"==typeof s?s:{};return e.date=r,e.args=arguments,new F(e)},p=N;p.l=J,p.i=U,p.w=function(r,s){return v(r,{locale:s.$L,utc:s.$u,x:s.$x,$offset:s.$offset})};var F=function(){function r(e){this.$L=J(e.locale,null,!0),this.parse(e)}var s=r.prototype;return s.parse=function(e){this.$d=function(u){var i=u.date,d=u.utc;if(null===i)return new Date(NaN);if(p.u(i))return new Date;if(i instanceof Date)return new Date(i);if("string"==typeof i&&!/Z$/i.test(i)){var l=i.match(P);if(l){var g=l[2]-1||0,T=(l[7]||"0").substring(0,3);return d?new Date(Date.UTC(l[1],g,l[3]||1,l[4]||0,l[5]||0,l[6]||0,T)):new Date(l[1],g,l[3]||1,l[4]||0,l[5]||0,l[6]||0,T)}}return new Date(i)}(e),this.$x=e.x||{},this.init()},s.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},s.$utils=function(){return p},s.isValid=function(){return this.$d.toString()!==a},s.isSame=function(e,u){var i=v(e);return this.startOf(u)<=i&&i<=this.endOf(u)},s.isAfter=function(e,u){return v(e)<this.startOf(u)},s.isBefore=function(e,u){return this.endOf(u)<v(e)},s.$g=function(e,u,i){return p.u(e)?this[u]:this.set(i,e)},s.unix=function(){return Math.floor(this.valueOf()/1e3)},s.valueOf=function(){return this.$d.getTime()},s.startOf=function(e,u){var i=this,d=!!p.u(u)||u,l=p.p(e),g=function(D,O){var Y=p.w(i.$u?Date.UTC(i.$y,O,D):new Date(i.$y,O,D),i);return d?Y:Y.endOf(m)},T=function(D,O){return p.w(i.toDate()[D].apply(i.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(O)),i)},$=this.$W,o=this.$M,y=this.$D,n="set"+(this.$u?"UTC":"");switch(l){case L:return d?g(1,0):g(31,11);case _:return d?g(1,o):g(0,o+1);case w:var c=this.$locale().weekStart||0,M=($<c?$+7:$)-c;return g(d?y-M:y+(6-M),o);case m:case Z:return T(n+"Hours",0);case f:return T(n+"Minutes",1);case C:return T(n+"Seconds",2);case t:return T(n+"Milliseconds",3);default:return this.clone()}},s.endOf=function(e){return this.startOf(e,!1)},s.$set=function(e,u){var i,d=p.p(e),l="set"+(this.$u?"UTC":""),g=(i={},i[m]=l+"Date",i[Z]=l+"Date",i[_]=l+"Month",i[L]=l+"FullYear",i[f]=l+"Hours",i[C]=l+"Minutes",i[t]=l+"Seconds",i[A]=l+"Milliseconds",i)[d],T=d===m?this.$D+(u-this.$W):u;if(d===_||d===L){var $=this.clone().set(Z,1);$.$d[g](T),$.init(),this.$d=$.set(Z,Math.min(this.$D,$.daysInMonth())).$d}else g&&this.$d[g](T);return this.init(),this},s.set=function(e,u){return this.clone().$set(e,u)},s.get=function(e){return this[p.p(e)]()},s.add=function(e,u){var i,d=this;e=Number(e);var l=p.p(u),g=function(o){var y=v(d);return p.w(y.date(y.date()+Math.round(o*e)),d)};if(l===_)return this.set(_,this.$M+e);if(l===L)return this.set(L,this.$y+e);if(l===m)return g(1);if(l===w)return g(7);var T=(i={},i[C]=h,i[f]=I,i[t]=1e3,i)[l]||1,$=this.$d.getTime()+e*T;return p.w($,this)},s.subtract=function(e,u){return this.add(-1*e,u)},s.format=function(e){var u=this,i=this.$locale();if(!this.isValid())return i.invalidDate||a;var d=e||"YYYY-MM-DDTHH:mm:ssZ",l=p.z(this),g=this.$H,T=this.$m,$=this.$M,o=i.weekdays,y=i.months,n=function(O,Y,R,z){return O&&(O[Y]||O(u,d))||R[Y].slice(0,z)},c=function(O){return p.s(g%12||12,O,"0")},M=i.meridiem||function(O,Y,R){var z=O<12?"AM":"PM";return R?z.toLowerCase():z},D={YY:String(this.$y).slice(-2),YYYY:this.$y,M:$+1,MM:p.s($+1,2,"0"),MMM:n(i.monthsShort,$,y,3),MMMM:n(y,$),D:this.$D,DD:p.s(this.$D,2,"0"),d:String(this.$W),dd:n(i.weekdaysMin,this.$W,o,2),ddd:n(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(g),HH:p.s(g,2,"0"),h:c(1),hh:c(2),a:M(g,T,!0),A:M(g,T,!1),m:String(T),mm:p.s(T,2,"0"),s:String(this.$s),ss:p.s(this.$s,2,"0"),SSS:p.s(this.$ms,3,"0"),Z:l};return d.replace(b,function(O,Y){return Y||D[O]||l.replace(":","")})},s.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},s.diff=function(e,u,i){var d,l=p.p(u),g=v(e),T=(g.utcOffset()-this.utcOffset())*h,$=this-g,o=p.m(this,g);return o=(d={},d[L]=o/12,d[_]=o,d[B]=o/3,d[w]=($-T)/6048e5,d[m]=($-T)/864e5,d[f]=$/I,d[C]=$/h,d[t]=$/1e3,d)[l]||$,i?o:p.a(o)},s.daysInMonth=function(){return this.endOf(_).$D},s.$locale=function(){return E[this.$L]},s.locale=function(e,u){if(!e)return this.$L;var i=this.clone(),d=J(e,u,!0);return d&&(i.$L=d),i},s.clone=function(){return p.w(this.$d,this)},s.toDate=function(){return new Date(this.valueOf())},s.toJSON=function(){return this.isValid()?this.toISOString():null},s.toISOString=function(){return this.$d.toISOString()},s.toString=function(){return this.$d.toUTCString()},r}(),W=F.prototype;return v.prototype=W,[["$ms",A],["$s",t],["$m",C],["$H",f],["$W",m],["$M",_],["$y",L],["$D",Z]].forEach(function(r){W[r[1]]=function(s){return this.$g(s,r[0],r[1])}}),v.extend=function(r,s){return r.$i||(r(s,F,v),r.$i=!0),v},v.locale=J,v.isDayjs=U,v.unix=function(r){return v(1e3*r)},v.en=E[H],v.Ls=E,v.p={},v}()},5268:function(j){j.exports=function(){"use strict";var x="minute",h=/[+-]\d\d(?::?\d\d)?/g,I=/([+-]|\d\d)/g;return function(A,t,C){var f=t.prototype;C.utc=function(a){return new t({date:a,utc:!0,args:arguments})},f.utc=function(a){var P=C(this.toDate(),{locale:this.$L,utc:!0});return a?P.add(this.utcOffset(),x):P},f.local=function(){return C(this.toDate(),{locale:this.$L,utc:!1})};var m=f.parse;f.parse=function(a){a.utc&&(this.$u=!0),this.$utils().u(a.$offset)||(this.$offset=a.$offset),m.call(this,a)};var w=f.init;f.init=function(){if(this.$u){var a=this.$d;this.$y=a.getUTCFullYear(),this.$M=a.getUTCMonth(),this.$D=a.getUTCDate(),this.$W=a.getUTCDay(),this.$H=a.getUTCHours(),this.$m=a.getUTCMinutes(),this.$s=a.getUTCSeconds(),this.$ms=a.getUTCMilliseconds()}else w.call(this)};var _=f.utcOffset;f.utcOffset=function(a,P){var b=this.$utils().u;if(b(a))return this.$u?0:b(this.$offset)?_.call(this):this.$offset;if("string"==typeof a&&null===(a=function(H){void 0===H&&(H="");var E=H.match(h);if(!E)return null;var U=(""+E[0]).match(I)||["-",0,0],v=60*+U[1]+ +U[2];return 0===v?0:"+"===U[0]?v:-v}(a)))return this;var q=Math.abs(a)<=16?60*a:a,S=this;if(P)return S.$offset=q,S.$u=0===a,S;if(0!==a){var N=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(S=this.local().add(q+N,x)).$offset=q,S.$x.$localOffset=N}else S=this.utc();return S};var B=f.format;f.format=function(a){return B.call(this,a||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":""))},f.valueOf=function(){var a=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*a},f.isUTC=function(){return!!this.$u},f.toISOString=function(){return this.toDate().toISOString()},f.toString=function(){return this.toDate().toUTCString()};var L=f.toDate;f.toDate=function(a){return"s"===a&&this.$offset?C(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():L.call(this)};var Z=f.diff;f.diff=function(a,P,b){if(a&&this.$u===a.$u)return Z.call(this,a,P,b);var q=this.local(),S=C(a).local();return Z.call(q,S,P,b)}}}()}}]);