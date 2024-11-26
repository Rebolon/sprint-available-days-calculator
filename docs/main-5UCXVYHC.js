import{a as z,b as B,c as ie}from"./chunk-AHATCDBX.js";import{a as c}from"./chunk-VHKMH3HJ.js";import{$ as Z,K,X as Q,Y as U,Z as X,_ as Y,a as P,aa as $,b as M,ba as ee,c as N,ca as te,d as O,da as re,ea as ae,f as R,fa as oe,g as F,ga as y,h as L,i as J,j as V,ja as d,k as j,ka as h,l as W,m as H,r as q,s as G}from"./chunk-DQM3MINA.js";import{Ab as _,Ea as m,Hb as E,Ma as T,Pa as x,U as w,Wa as g,_ as l,bb as D,cb as C,eb as S,ia as f,ib as i,ja as u,jb as o,kb as n,lb as k,nb as v,ob as p,ub as s,wb as A,yb as b,zb as I}from"./chunk-BUWQDSLL.js";var ne=(()=>{class e{constructor(){this.storage=localStorage,this.hasSavedData=T(!1),this.storage.getItem("team")&&this.storage.getItem("parameters")?this.hasSavedData.set(!0):this.hasSavedData.set(!1)}save(t){t.team&&this.storage.setItem("team",JSON.stringify(t.team)),this.storage.setItem("parameters",t.parameters?JSON.stringify(t.parameters):JSON.stringify(y)),this.hasSavedData.set(!0)}clear(){this.storage.removeItem("team"),this.storage.removeItem("parameters"),this.hasSavedData.set(!1)}restore(){let t=this.storage.getItem("team")?JSON.parse(this.storage.getItem("team")):[],r=this.storage.getItem("parameters")?JSON.parse(localStorage.getItem("parameters")):y;return this.hasSavedData.set(!1),{team:t,parameters:r}}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();function ce(e,le){if(e&1&&(i(0,"clr-alert",1)(1,"clr-alert-item")(2,"span",18),s(3),I(4,"async"),o()()()),e&2){let t=p();C("clrAlertType","info")("clrAlertClosable",!0),m(3),A(" ",_(4,3,t.alert.getAlert())," ")}}function de(e,le){if(e&1){let t=k();i(0,"clr-alert",2)(1,"clr-alert-item")(2,"span",18),s(3),o(),i(4,"div",19)(5,"clr-dropdown")(6,"button",20),s(7," Actions "),n(8,"cds-icon",21),o(),i(9,"clr-dropdown-menu",22)(10,"a",23),v("click",function(){f(t);let a=p();return u(a.restore())}),s(11,"restore"),o(),i(12,"a",23),v("click",function(){f(t);let a=p();return u(a.deleteSavedData())}),s(13,"delete"),o()()()()()()}if(e&2){let t=p();C("clrAlertClosable",!0),m(3),A(" A save has been found in your browser, do you want to restore it ? ",t.getSavedTeammates()," ")}}V.addIcons(j,H,W,q,G);var se=(()=>{class e{constructor(){this.alert=l(c),this.teamService=l(h),this.parametersService=l(d),this.storageService=l(ne),this.title="sprint-resources-availability",this.getSavedTeammates=E(()=>this.teamService.getTeammates().map(t=>t.name).join(", ")),this.hasSavedData=!1}save(){this.storageService.save({team:this.teamService.getTeammates(),parameters:this.parametersService.getParameters()}),this.alert.setAlert("save done")}deleteSavedData(){this.storageService.clear(),this.alert.setAlert("delete done")}restore(){let{team:t,parameters:r}=this.storageService.restore();t.forEach(a=>this.teamService.addTeammate(new ie(a.name,a.availableDaysInAWeek,a.holidaysForNextSprint,a.meetingDaysAWeek,a.isNewComer))),this.parametersService.setParameters(new oe(r.nbWeeksForOneSprint,r.marginRate,r.velocityRateForNewComer)),this.alert.setAlert("Restore done")}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=x({type:e,selectors:[["app-root"]],features:[b([h,d,c])],decls:22,vars:5,consts:[[1,"main-container"],[3,"clrAlertType","clrAlertClosable"],[3,"clrAlertClosable"],[1,"header","header-6"],[1,"branding"],["routerLink","/"],[1,"title"],[1,"header-nav"],["routerLink","manage-team",1,"nav-link","nav-icon"],["shape","calculator","size","24"],["routerLink","add-teammate",1,"nav-link","nav-icon"],["shape","user","size","24"],["routerLink","edit-parameters",1,"nav-link","nav-icon"],["shape","cog","size","24"],[1,"nav-link","nav-icon","a-hover",3,"click"],["shape","floppy","size","24"],[1,"content-container"],[1,"content-area"],[1,"alert-text"],[1,"alert-actions"],["clrDropdownTrigger","",1,"dropdown-toggle"],["shape","angle","direction","down"],["clrPosition","bottom-right"],["clrDropdownItem","",1,"dropdown-item",3,"click"]],template:function(r,a){r&1&&(i(0,"div",0)(1,"clr-alerts"),g(2,ce,5,5,"clr-alert",1),I(3,"async"),g(4,de,14,2,"clr-alert",2),o(),i(5,"header",3)(6,"div",4)(7,"a",5)(8,"span",6),s(9,"How many days ?"),o()()(),i(10,"div",7)(11,"a",8),n(12,"cds-icon",9),o(),i(13,"a",10),n(14,"cds-icon",11),o(),i(15,"a",12),n(16,"cds-icon",13),o(),i(17,"a",14),v("click",function(){return a.save()}),n(18,"cds-icon",15),o()()(),i(19,"div",16)(20,"div",17),n(21,"router-outlet"),o()()()),r&2&&(m(2),S(_(3,3,a.alert.hasAlert())?2:-1),m(2),S(a.storageService.hasSavedData()?4:-1),m(13),D("disabled",a.teamService.getTeammates().length?"disabled":""))},dependencies:[M,P,J,O,R,B,z,ae,$,ee,re,te,Z,Q,X,Y,U,K],styles:[".a-hover[_ngcontent-%COMP%]{cursor:pointer}"]})}}return e})();var me=[{path:"",redirectTo:"/manage-team",pathMatch:"full"},{path:"manage-team",loadComponent:()=>import("./chunk-GZBHRFK3.js").then(e=>e.ManageTeamComponent)},{path:"list-team",loadComponent:()=>import("./chunk-HV4Y7KJW.js").then(e=>e.ListTeamComponent)},{path:"add-teammate",loadComponent:()=>import("./chunk-SPOJMTM4.js").then(e=>e.AddTeammateComponent)},{path:"edit-teammate/:id",loadComponent:()=>import("./chunk-SPOJMTM4.js").then(e=>e.AddTeammateComponent)},{path:"edit-parameters",loadComponent:()=>import("./chunk-Y4NW42EY.js").then(e=>e.EditParametersComponent)},{path:"**",loadComponent:()=>import("./chunk-7L6LDHDR.js").then(e=>e.Page404Component)}];N(se,{providers:[F(me,L()),h,d,c]}).catch(e=>console.error(e));
