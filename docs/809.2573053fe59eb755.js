"use strict";(self.webpackChunksprint_resources_availability=self.webpackChunksprint_resources_availability||[]).push([[809],{5809:(A,c,i)=>{i.r(c),i.d(c,{EditParametersComponent:()=>v});var e=i(95),m=i(7148);class u extends e.cw{constructor(o,n=new e.qu){super(n.group({nbWeeksForOneSprint:new e.NI(o?.nbWeeksForOneSprint,[e.kI.required,e.kI.min(1)]),marginRate:new e.NI(o?.marginRate,[e.kI.required,e.kI.min(0),e.kI.max(1)]),velocityRateForNewComer:new e.NI(o?.velocityRateForNewComer,[e.kI.required,e.kI.min(0),e.kI.max(1)])}).controls),this.parameters=o,this.formBuilder=n,this.nbWeeksForOneSprint=this.get("nbWeeksForOneSprint"),this.marginRate=this.get("marginRate"),this.velocityRateForNewComer=this.get("velocityRateForNewComer")}}var a=i(249),f=i(3610),r=i(5678),d=i(8696);function _(t,o){1&t&&(r.TgZ(0,"clr-control-error"),r._uU(1,"This is a required field"),r.qZA())}function g(t,o){1&t&&(r.TgZ(0,"clr-control-error"),r._uU(1,"Lower value is 1"),r.qZA())}function Z(t,o){1&t&&(r.TgZ(0,"clr-control-error"),r._uU(1,"This is a required field"),r.qZA())}function h(t,o){1&t&&(r.TgZ(0,"clr-control-error"),r._uU(1,"Lower value is 0"),r.qZA())}function T(t,o){1&t&&(r.TgZ(0,"clr-control-error"),r._uU(1,"Higher value is 0"),r.qZA())}function P(t,o){1&t&&(r.TgZ(0,"clr-control-error"),r._uU(1,"This is a required field"),r.qZA())}function C(t,o){1&t&&(r.TgZ(0,"clr-control-error"),r._uU(1,"Lower value is 0"),r.qZA())}function q(t,o){1&t&&(r.TgZ(0,"clr-control-error"),r._uU(1,"Higher value is 1"),r.qZA())}let v=(()=>{class t{constructor(n){this.parametersService=n,this.formParameters={},this.parameters=n.getParameters(),this.formParameters=new u(m.m),n.getParameters().subscribe({next:l=>{this.formParameters=new u(l)}})}updateParameters(){if(this.formParameters.valid){const n=new m.d(this.formParameters.controls.nbWeeksForOneSprint.getRawValue(),this.formParameters.controls.marginRate.getRawValue(),this.formParameters.controls.velocityRateForNewComer.getRawValue());this.parametersService.setParameters(n)}}static#r=this.\u0275fac=function(l){return new(l||t)(r.Y36(d.T))};static#e=this.\u0275cmp=r.Xpm({type:t,selectors:[["app-edit-parameters"]],outputs:{parameters:"parameters"},standalone:!0,features:[r.jDz],decls:30,vars:9,consts:[["clrForm","","clrLayout","horizontal",3,"formGroup"],["for","nbWeeksForOneSprint"],["id","nbWeeksForOneSprint","clrInput","","type","number","min","1","formControlName","nbWeeksForOneSprint",3,"blur"],[4,"clrIfError"],["for","marginRate"],["id","marginRate","clrInput","","type","number","step","0.1","min","0","max","1","formControlName","marginRate",3,"blur"],["for","velocityRateForNewComer"],["id","velocityRateForNewComer","clrInput","","type","number","step","0.1","min","0","max","1","formControlName","velocityRateForNewComer",3,"blur"]],template:function(l,s){1&l&&(r.TgZ(0,"h1"),r._uU(1,"Adapt parameters"),r.qZA(),r.TgZ(2,"form",0)(3,"clr-input-container")(4,"label",1),r._uU(5,"Number of weeks in a sprint: "),r.qZA(),r.TgZ(6,"input",2),r.NdJ("blur",function(){return s.updateParameters()}),r.qZA(),r.TgZ(7,"clr-control-helper"),r._uU(8,"At least 1 week for a sprint"),r.qZA(),r.YNc(9,_,2,0,"clr-control-error",3)(10,g,2,0,"clr-control-error",3),r.qZA(),r.TgZ(11,"clr-input-container")(12,"label",4),r._uU(13,"Margin rate: "),r.qZA(),r.TgZ(14,"input",5),r.NdJ("blur",function(){return s.updateParameters()}),r.qZA(),r.TgZ(15,"clr-control-helper"),r._uU(16,"The margin rate to manage unexpected events"),r.qZA(),r.YNc(17,Z,2,0,"clr-control-error",3)(18,h,2,0,"clr-control-error",3)(19,T,2,0,"clr-control-error",3),r.qZA(),r.TgZ(20,"clr-input-container")(21,"label",6),r._uU(22,"Velocity rate for new comer: "),r.qZA(),r.TgZ(23,"input",7),r.NdJ("blur",function(){return s.updateParameters()}),r.qZA(),r.TgZ(24,"clr-control-helper"),r._uU(25,"A new comer is not as efficient as other teammate, here is the rate for this"),r.qZA(),r.YNc(26,P,2,0,"clr-control-error",3)(27,C,2,0,"clr-control-error",3)(28,q,2,0,"clr-control-error",3),r.qZA()(),r._UZ(29,"app-available-days")),2&l&&(r.xp6(2),r.Q6J("formGroup",s.formParameters),r.xp6(7),r.Q6J("clrIfError","required"),r.xp6(1),r.Q6J("clrIfError","min"),r.xp6(7),r.Q6J("clrIfError","required"),r.xp6(1),r.Q6J("clrIfError","min"),r.xp6(1),r.Q6J("clrIfError","max"),r.xp6(7),r.Q6J("clrIfError","required"),r.xp6(1),r.Q6J("clrIfError","min"),r.xp6(1),r.Q6J("clrIfError","max"))},dependencies:[a.AnW,a.MgK,a.VqA,a.CM6,a.qk9,a.YAP,a.mIp,a.xRP,a.G55,e.UX,e._Y,e.Fj,e.wV,e.JJ,e.JL,e.qQ,e.Fd,e.sg,e.u,f.F],encapsulation:2})}return t})()}}]);