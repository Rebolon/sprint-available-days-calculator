import{a as O}from"./chunk-6LNG36NK.js";import{a as E,b as k}from"./chunk-AHATCDBX.js";import{a as D}from"./chunk-CWWXQANX.js";import{j as w,ja as M,ka as P,q as V}from"./chunk-DQM3MINA.js";import{Bb as I,Ea as m,Hb as L,Ma as v,Pa as x,Wa as p,_ as s,cb as _,eb as T,fb as h,gb as y,hb as S,ia as c,ib as o,ja as l,jb as a,kb as g,lb as f,nb as C,ob as r,ub as u,xb as b,zb as F}from"./chunk-BUWQDSLL.js";function B(t,d){t&1&&(o(0,"h1"),u(1,"List of teammates"),a())}function $(t,d){if(t&1){let e=f();o(0,"li")(1,"button",1),C("click",function(){let n=c(e).$implicit,A=r();return l(A.editTeammate(n))}),g(2,"cds-icon",2),a(),u(3),F(4,"toFixed"),a()}if(t&2){let e=d.$implicit,i=r();m(),_("disabled",i.editedTeammate()&&i.editedTeammate()===e),m(2),b(" ",e.name,": ",I(4,3,e.getAvailableDaysInSprint(i.parametersService.getParameters().nbWeeksForOneSprint),2)," days available ")}}function j(t,d){if(t&1){let e=f();o(0,"app-add-teammate",3),C("saved",function(){c(e);let n=r();return l(n.clearEditForm())}),a()}if(t&2){let e=r();_("editedTeammate",e.editedTeammate())}}w.addIcons(V);var X=(()=>{class t{constructor(){this.teamService=s(P),this.parametersService=s(M),this.team=L(()=>this.teamService.getTeammates()),this.editedTeammate=v(void 0)}clearEditForm(){this.editedTeammate.set(void 0)}editTeammate(e){this.editedTeammate.set(e)}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275cmp=x({type:t,selectors:[["app-list-team"]],decls:5,vars:2,consts:[[3,"editedTeammate"],["aria-label","edit",1,"btn","btn-link",3,"click","disabled"],["shape","pencil"],[3,"saved","editedTeammate"]],template:function(i,n){i&1&&(p(0,B,2,0,"h1"),o(1,"ul"),y(2,$,5,6,"li",null,h),a(),p(4,j,1,1,"app-add-teammate",0)),i&2&&(T(n.team().length>0?0:-1),m(2),S(n.team()),m(2),T(n.editedTeammate()?4:-1))},dependencies:[k,E,D,O],styles:["ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{list-style:none}"]})}}return t})();export{X as a};
