import{a as L,b as ie,c as ae}from"./chunk-YF2XKZ6H.js";import{a as p}from"./chunk-IOSLIUUI.js";import{a as J,b as V}from"./chunk-PFVGJA53.js";import{$ as U,M as G,Z as K,_ as Q,aa as X,b as E,ba as Y,c as P,ca as Z,d as M,da as $,e as O,ea as ee,fa as te,g as N,ga as re,h as R,i as F,j as d,k as v,l as j,m as z,n as W,o as B,t as H,u as q}from"./chunk-5T2A2BUS.js";import{$a as k,Ga as c,Ha as u,Qa as x,Ra as C,Ua as A,Va as I,Ya as i,Za as a,_a as m,aa as T,db as S,eb as h,fa as f,ga as g,hb as l,jb as _,lb as b,ob as D,pb as y,qb as w}from"./chunk-36EA5VZS.js";function me(e,n){if(e&1&&(i(0,"clr-alert",1)(1,"clr-alert-item")(2,"span",18),l(3),y(4,"async"),a()()()),e&2){let s=h();C("clrAlertType","info")("clrAlertClosable",!0),c(3),_(" ",w(4,3,s.alert.getAlert())," ")}}function le(e,n){if(e&1){let s=k();i(0,"clr-alert",2)(1,"clr-alert-item")(2,"span",18),l(3),a(),i(4,"div",19)(5,"clr-dropdown")(6,"button",20),l(7," Actions "),m(8,"cds-icon",21),a(),i(9,"clr-dropdown-menu",22)(10,"a",23),S("click",function(){f(s);let t=h();return g(t.restore())}),l(11,"restore"),a(),i(12,"a",23),S("click",function(){f(s);let t=h();return g(t.deleteSavedData())}),l(13,"delete"),a()()()()()()}if(e&2){let s=h();C("clrAlertClosable",!0),c(3),_(" A save has been found in your browser, do you want to restore it ? ",s.getSavedTeammates()," ")}}j.addIcons(z,B,W,H,q);var oe=(()=>{let n=class n{constructor(r,t,o){this.alert=r,this.teamService=t,this.parametersService=o,this.title="sprint-resources-availability",this.team=[],this.hasSavedData=!1}ngOnInit(){this.teamService.getTeammates().subscribe(r=>this.team=r),this.parametersService.getParameters().subscribe(r=>this.parameters=r),this.checkStorage()}save(){localStorage.setItem("team",JSON.stringify(this.team)),localStorage.setItem("parameters",this.parameters?JSON.stringify(this.parameters):JSON.stringify(V)),this.alert.setAlert("Save done")}deleteSavedData(){localStorage.removeItem("team"),localStorage.removeItem("parameters"),this.hasSavedData=!1,this.alert.setAlert("delete done")}restore(){let r=localStorage.getItem("team")?JSON.parse(localStorage.getItem("team")):[],t=localStorage.getItem("parameters")?JSON.parse(localStorage.getItem("parameters")):void 0;r.forEach(o=>this.teamService.addTeammate(new L(o.name,o.availableDaysInAWeek,o.holidaysForNextSprint,o.meetingDaysAWeek,o.isNewComer))),this.parametersService.setParameters(new J(t.nbWeeksForOneSprint,t.marginRate,t.velocityRateForNewComer)),this.hasSavedData=!1,this.alert.setAlert("Restore done")}checkStorage(){localStorage.getItem("team")&&localStorage.getItem("parameters")&&(this.hasSavedData=!0)}getSavedTeammates(){return this.team.map(r=>r.name).join(", ")}};n.\u0275fac=function(t){return new(t||n)(u(p),u(d),u(v))},n.\u0275cmp=T({type:n,selectors:[["app-root"]],standalone:!0,features:[b([d,v,p]),D],decls:22,vars:5,consts:[[1,"main-container"],[3,"clrAlertType","clrAlertClosable"],[3,"clrAlertClosable"],[1,"header","header-6"],[1,"branding"],["routerLink","/"],[1,"title"],[1,"header-nav"],["routerLink","manage-team",1,"nav-link","nav-icon"],["shape","calculator","size","24"],["routerLink","add-teammate",1,"nav-link","nav-icon"],["shape","user","size","24"],["routerLink","edit-parameters",1,"nav-link","nav-icon"],["shape","cog","size","24"],[1,"nav-link","nav-icon","a-hover",3,"click"],["shape","floppy","size","24"],[1,"content-container"],[1,"content-area"],[1,"alert-text"],[1,"alert-actions"],["clrDropdownTrigger","",1,"dropdown-toggle"],["shape","angle","direction","down"],["clrPosition","bottom-right"],["clrDropdownItem","",1,"dropdown-item",3,"click"]],template:function(t,o){t&1&&(i(0,"div",0)(1,"clr-alerts"),A(2,me,5,5,"clr-alert",1),y(3,"async"),A(4,le,14,2,"clr-alert",2),a(),i(5,"header",3)(6,"div",4)(7,"a",5)(8,"span",6),l(9,"How many days ?"),a()()(),i(10,"div",7)(11,"a",8),m(12,"cds-icon",9),a(),i(13,"a",10),m(14,"cds-icon",11),a(),i(15,"a",12),m(16,"cds-icon",13),a(),i(17,"a",14),S("click",function(){return o.save()}),m(18,"cds-icon",15),a()()(),i(19,"div",16)(20,"div",17),m(21,"router-outlet"),a()()()),t&2&&(c(2),I(2,w(3,3,o.alert.hasAlert())?2:-1),c(2),I(4,o.hasSavedData?4:-1),c(13),x("disabled",o.team.length?"disabled":""))},dependencies:[P,E,F,O,N,ae,ie,re,Z,$,te,ee,Y,K,U,X,Q,G],styles:[".a-hover[_ngcontent-%COMP%]{cursor:pointer}"]});let e=n;return e})();var ne=[{path:"",redirectTo:"/manage-team",pathMatch:"full"},{path:"manage-team",loadComponent:()=>import("./chunk-UBFG5W7A.js").then(e=>e.ManageTeamComponent)},{path:"list-team",loadComponent:()=>import("./chunk-YIUA2TZE.js").then(e=>e.ListTeamComponent)},{path:"add-teammate",loadComponent:()=>import("./chunk-7CF75C3Z.js").then(e=>e.AddTeammateComponent)},{path:"edit-teammate/:id",loadComponent:()=>import("./chunk-7CF75C3Z.js").then(e=>e.AddTeammateComponent)},{path:"edit-parameters",loadComponent:()=>import("./chunk-266PYTTQ.js").then(e=>e.EditParametersComponent)},{path:"**",loadComponent:()=>import("./chunk-HKC6NKDD.js").then(e=>e.Page404Component)}];M(oe,{providers:[R(ne),d,v,p]}).catch(e=>console.error(e));
