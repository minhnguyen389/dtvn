"use strict";(self.webpackChunkweb_cms_dtvn=self.webpackChunkweb_cms_dtvn||[]).push([[592],{5834:(Z,E,a)=>{a.d(E,{v:()=>v});var t=a(520),u=a(2340),P=a(5e3);let v=(()=>{class g{constructor(s){this.http=s}getList(s,p,d,r,i,m){let c=new t.LE;return c=c.append("limit",i),c=c.append("offset",m),s&&(c=c.append("name",s)),p&&(c=c.append("code",p)),d&&(c=c.append("project_id",d)),r&&(c=c.append("station_id",r)),this.http.get(`${u.N.url.BASE_URL}/parameter`,{params:c})}getDetail(s){return this.http.get(`${u.N.url.BASE_URL}/parameter/${s}`)}create(s,p,d,r){let i=new t.LE;return i=i.append("name",s),i=i.append("code",d),i=i.append("station_id",r),p&&(i=i.append("description",p)),this.http.post(`${u.N.url.BASE_URL}/parameter`,i)}edit(s,p,d,r){let i=new t.LE;return p&&(i=i.append("name",p)),d&&(i=i.append("description",d)),r&&(i=i.append("code",r)),this.http.put(`${u.N.url.BASE_URL}/parameter/${s}`,i)}delete(s){return this.http.delete(`${u.N.url.BASE_URL}/parameter/${s}`)}config(s,p,d,r,i,m,c,C,b,y,A,O){let o=new t.LE;return p&&(o=o.append("dtype",p)),d&&(o=o.append("port",d)),r&&(o=o.append("address",r)),i&&(o=o.append("ftype",i)),m&&(o=o.append("cval",m)),c>=0&&(o=o.append("dval",c)),C>=0&&(o=o.append("cycle",C)),b&&(o=o.append("table",b)),y&&(o=o.append("params",y)),A&&(o=o.append("hmi",A)),O&&(o=o.append("siren_control",O)),this.http.put(`${u.N.url.BASE_URL}/parameter/${s}/config`,o)}}return g.\u0275fac=function(s){return new(s||g)(P.LFG(t.eN))},g.\u0275prov=P.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g})()},535:(Z,E,a)=>{a.d(E,{A:()=>M});var t=a(5e3),u=a(5330),P=a(9563),v=a(9783),g=a(845),T=a(5787),s=a(8952),p=a(2382),d=a(1424),r=a(4119),i=a(4132);const m=["divBound"],c=["divTable"],C=["divPaginator"];function b(_,f){if(1&_){const n=t.EpF();t.TgZ(0,"div",24)(1,"div",25)(2,"input",26),t.NdJ("ngModelChange",function(l){return t.CHM(n),t.oxw().name=l}),t.qZA()(),t.TgZ(3,"div",27)(4,"div",28)(5,"span")(6,"button",29),t.NdJ("click",function(){return t.CHM(n),t.oxw().onClear()}),t.qZA(),t.TgZ(7,"button",30),t.NdJ("click",function(){return t.CHM(n),t.oxw().fetchListOfProjects()}),t.qZA()()()()()}if(2&_){const n=t.oxw();t.xp6(2),t.Q6J("ngModel",n.name)}}function y(_,f){1&_&&(t.TgZ(0,"tr")(1,"th",31),t._uU(2,"#"),t.qZA(),t.TgZ(3,"th",32),t._uU(4,"T\xean "),t._UZ(5,"p-sortIcon",33),t.qZA(),t.TgZ(6,"th",34),t._uU(7,"M\xf4 t\u1ea3"),t.qZA(),t.TgZ(8,"th",35),t._uU(9,"Code"),t.qZA(),t.TgZ(10,"th",35),t._uU(11,"Partner"),t.qZA()())}function A(_,f){if(1&_&&(t.TgZ(0,"tr",36)(1,"td",31),t._uU(2),t.qZA(),t.TgZ(3,"td",34),t._uU(4),t.qZA(),t.TgZ(5,"td",34),t._uU(6),t.qZA(),t.TgZ(7,"td",35),t._uU(8),t.qZA(),t.TgZ(9,"td",35),t._uU(10),t.qZA()()),2&_){const n=f.$implicit,e=f.rowIndex,l=t.oxw();t.Q6J("pSelectableRow",n),t.xp6(2),t.Oqu((l.currentPage-1)*l.itemsPerPage+1+e),t.xp6(2),t.Oqu(n.name),t.xp6(2),t.Oqu(n.description),t.xp6(2),t.Oqu(n.code),t.xp6(2),t.Oqu(n.partner)}}function O(_,f){1&_&&(t.TgZ(0,"div",37),t._uU(1," Kh\xf4ng c\xf3 d\u1eef li\u1ec7u trong m\u1ee5c n\xe0y. "),t.qZA())}const o=function(){return[15,20,30,50]};let M=(()=>{class _{constructor(n,e,l,h,D,B){this.ref=n,this.config=e,this.pHttpService=l,this.messageService=h,this.renderer=D,this.dialogService=B,this.title="Ch\u1ecdn c\xf4ng tr\xecnh",this.projects=[],this.offset=0,this.totalItems=0,this.itemsPerPage=15,this.currentPage=1,this.loading=!1}ngOnDestroy(){this.loadingTime&&clearTimeout(this.loadingTime)}ngAfterViewInit(){this.renderer.setStyle(this.divTable.nativeElement,"height",`  ${this.divBound.nativeElement.offsetHeight-this.divPaginator.nativeElement.offsetHeight-40}px`)}onWindowResize(){this.renderer.setStyle(this.divTable.nativeElement,"height",`  ${this.divBound.nativeElement.offsetHeight-this.divPaginator.nativeElement.offsetHeight-40}px`)}ngOnInit(){this.fetchListOfProjects()}fetchListOfProjects(){this.loadingTime=setTimeout(()=>{this.loading=!0},1e3),this.pHttpService.getList(this.name,this.itemsPerPage,this.offset).subscribe({next:n=>{n&&200===n.status?(this.projects=n.metadata.docs,this.totalItems=n.metadata.totalDocs,this.loading=!1,this.loadingTime&&clearTimeout(this.loadingTime),this.currentProject=null):this.messageService.add({severity:"warn",summary:"C\u1ea3nh b\xe1o",detail:"C\u1ea3nh b\xe1o: No Content"})},error:n=>{let e;e=n&&n.error&&n.error.message?n.error.message:"C\xf3 l\u1ed7i x\u1ea3y ra. Vui l\xf2ng th\u1eed l\u1ea1i!",this.messageService.add({severity:"error",summary:"L\u1ed7i",detail:e}),console.error("C\xf3 l\u1ed7i x\u1ea3y ra",n),this.loading=!1,this.loadingTime&&clearTimeout(this.loadingTime)}})}onPageChange(n){this.currentPage=n.page+1,this.itemsPerPage=n.rows,this.offset=(this.currentPage-1)*this.itemsPerPage,this.fetchListOfProjects()}onReSync(){this.fetchListOfProjects()}onSubmit(){this.ref.close(this.currentProject)}onDestroy(){this.ref.destroy()}onClear(){this.name=null}}return _.\u0275fac=function(n){return new(n||_)(t.Y36(u.E7),t.Y36(u.S),t.Y36(P.t),t.Y36(v.ez),t.Y36(t.Qsj),t.Y36(u.xA))},_.\u0275cmp=t.Xpm({type:_,selectors:[["app-pick-project"]],viewQuery:function(n,e){if(1&n&&(t.Gf(m,5,t.SBq),t.Gf(c,5,t.SBq),t.Gf(C,5,t.SBq)),2&n){let l;t.iGM(l=t.CRH())&&(e.divBound=l.first),t.iGM(l=t.CRH())&&(e.divTable=l.first),t.iGM(l=t.CRH())&&(e.divPaginator=l.first)}},decls:26,vars:15,consts:[[1,"absolute","top-0","left-0","bottom-0","right-0",3,"resize"],["divBound",""],[1,"absolute","top-0","left-0","w-full"],[1,"flex","align-items-center","justify-content-between","border-bottom-1","border-gray-300"],[1,"ml-2","text-xl","font-bold"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-danger","p-button-text",3,"click"],[1,"page-content","mt-1"],["divTable",""],["selectionMode","single","styleClass","p-datatable-sm p-datatable-striped","scrollHeight","flex",3,"selection","value","scrollable","loading","selectionChange"],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[1,"absolute","bottom-0","left-0","w-full","p-1","border-top-1","border-gray-300"],["divPaginator",""],[1,"grid","grid-nogutter"],[1,"col-12","md:col-5","flex","align-items-center"],["pButton","","pRipple","","type","button","label","Ch\u1ecdn","icon","fa-solid fa-check",1,"mr-1",3,"disabled","click"],["pButton","","pRipple","","type","button","label","H\u1ee7y b\u1ecf","icon","fa-solid fa-times",1,"p-button-outlined","mr-1",3,"click"],[1,"col-12","md:col-5","flex","align-items-center","justify-content-end"],["styleClass","p-0",3,"rows","totalRecords","rowsPerPageOptions","showJumpToPageDropdown","showPageLinks","onPageChange"],[1,"col-12","md:col-2","flex","align-items-center"],["pButton","","pRipple","","type","button","icon","fa-solid fa-sync",1,"p-button-raised","p-button-text",3,"click"],[1,"ml-1"],[1,"p-fluid","grid","formgrid"],[1,"field","col-12","md:col-4","mb-1"],["type","text","pInputText","","placeholder","Nh\u1eadp t\xean C\xf4ng tr\xecnh",3,"ngModel","ngModelChange"],[1,"field","col-12","md:col-4"],[1,"flex","justify-content-between"],["type","button","pButton","","icon","fa-solid fa-undo","pTooltip","\u0110\u1eb7t l\u1ea1i","tooltipPosition","top",1,"mr-1",3,"click"],["type","button","pButton","","icon","fa-solid fa-search","pTooltip","T\xecm ki\u1ebfm","tooltipPosition","top",1,"mr-1",3,"click"],[2,"width","60px","max-width","60px"],["pSortableColumn","name",2,"min-width","200px"],["field","name"],[2,"min-width","200px"],[2,"min-width","150px"],[3,"pSelectableRow"],[1,"p-fluid","p-2"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0,1),t.NdJ("resize",function(){return e.onWindowResize()},!1,t.Jf7),t.TgZ(2,"div",2)(3,"div",3)(4,"span",4),t._uU(5),t.qZA(),t.TgZ(6,"button",5),t.NdJ("click",function(){return e.onDestroy()}),t.qZA()(),t.TgZ(7,"div",6,7)(9,"p-table",8),t.NdJ("selectionChange",function(h){return e.currentProject=h}),t.YNc(10,b,8,1,"ng-template",9),t.YNc(11,y,12,0,"ng-template",10),t.YNc(12,A,11,6,"ng-template",11),t.YNc(13,O,2,0,"ng-template",12),t.qZA()()(),t.TgZ(14,"div",13,14)(16,"div",15)(17,"div",16)(18,"button",17),t.NdJ("click",function(){return e.onSubmit()}),t.qZA(),t.TgZ(19,"button",18),t.NdJ("click",function(){return e.onDestroy()}),t.qZA()(),t.TgZ(20,"div",19)(21,"p-paginator",20),t.NdJ("onPageChange",function(h){return e.onPageChange(h)}),t.qZA()(),t.TgZ(22,"div",21)(23,"button",22),t.NdJ("click",function(){return e.onReSync()}),t.qZA(),t.TgZ(24,"span",23),t._uU(25),t.qZA()()()()()),2&n&&(t.xp6(5),t.Oqu(e.title),t.xp6(4),t.Q6J("selection",e.currentProject)("value",e.projects)("scrollable",!0)("loading",e.loading),t.xp6(9),t.Q6J("disabled",!e.currentProject),t.xp6(3),t.Q6J("rows",e.itemsPerPage)("totalRecords",e.totalItems)("rowsPerPageOptions",t.DdM(14,o))("showJumpToPageDropdown",!0)("showPageLinks",!1),t.xp6(4),t.lnq("Displaying ",(e.currentPage-1)*e.itemsPerPage+1,"-",(e.currentPage-1)*e.itemsPerPage+e.itemsPerPage>e.totalItems?e.totalItems:(e.currentPage-1)*e.itemsPerPage+e.itemsPerPage," of ",e.totalItems,""))},directives:[g.Hq,T.H,s.iA,v.jx,p.Fj,d.o,p.JJ,p.On,r.u,s.lQ,s.fz,s.Ei,i.D],styles:[""]}),_})()},3037:(Z,E,a)=>{a.d(E,{p:()=>s});var t=a(5e3),u=a(5330),P=a(845),v=a(5787);const g=["divBound"],T=["divTable"];let s=(()=>{class p{constructor(r,i,m,c){this.ref=r,this.config=i,this.renderer=m,this.dialogService=c}ngAfterViewInit(){this.renderer.setStyle(this.divTable.nativeElement,"height",`  ${this.divBound.nativeElement.offsetHeight-40}px`)}ngOnInit(){this.config.data&&(this.photo=this.config.data.photo)}onDestroy(){this.ref.destroy()}getPath(){return"assets/placeholder.png"}}return p.\u0275fac=function(r){return new(r||p)(t.Y36(u.E7),t.Y36(u.S),t.Y36(t.Qsj),t.Y36(u.xA))},p.\u0275cmp=t.Xpm({type:p,selectors:[["app-view-photo"]],viewQuery:function(r,i){if(1&r&&(t.Gf(g,5,t.SBq),t.Gf(T,5,t.SBq)),2&r){let m;t.iGM(m=t.CRH())&&(i.divBound=m.first),t.iGM(m=t.CRH())&&(i.divTable=m.first)}},decls:9,vars:2,consts:[[1,"absolute","top-0","left-0","bottom-0","right-0"],["divBound",""],[1,"flex","align-items-center","justify-content-between","border-bottom-1","border-gray-300"],[1,"ml-2","text-xl","font-bold"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-danger","p-button-text",3,"click"],[1,"flex","align-items-center","justify-content-center"],["divTable",""],[2,"height","100%",3,"src"]],template:function(r,i){1&r&&(t.TgZ(0,"div",0,1)(2,"div",2)(3,"span",3),t._uU(4),t.qZA(),t.TgZ(5,"button",4),t.NdJ("click",function(){return i.onDestroy()}),t.qZA()(),t.TgZ(6,"div",5,6),t._UZ(8,"img",7),t.qZA()()),2&r&&(t.xp6(4),t.Oqu(i.photo),t.xp6(4),t.Q6J("src",i.getPath(),t.LSH))},directives:[P.Hq,v.H],styles:[""]}),p})()}}]);