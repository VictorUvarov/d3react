(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{188:function(e,t,a){},192:function(e,t,a){},194:function(e,t,a){},195:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(68),o=a.n(r),s=a(50),c=a.n(s),u=a(69),l=a(4),d=a(5),h=a(7),p=a(6),m=a(8),f=(a(88),function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"vis-root",id:this.props.id},i.a.createElement("h1",{className:"vis-title"},this.props.title),i.a.createElement("p",{className:"vis-text"},this.props.text),this.props.visualization)}}]),t}(n.Component)),g=(a(89),function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"question-root",id:this.props.id},i.a.createElement("h1",null,this.props.title),i.a.createElement("p",{className:"question-text"},this.props.text))}}]),t}(n.Component)),b=a(23),y=a(32),v=function(){function e(){Object(l.a)(this,e)}return Object(d.a)(e,null,[{key:"filterObjectList",value:function(e,t,a){return e.filter(function(e){return a?""!==e[t]&&0!==+e[t]:""!==e[t]})}},{key:"getListFromListOfObjects",value:function(e,t,a){var n=[];return e.forEach(function(e){!0===a?n.push(+e[t]):n.push(e[t])}),n}},{key:"getRandomColor",value:function(){return"#"+(16777216+16777215*Math.random()).toString(16).substr(1,6)}},{key:"cleanTime",value:function(e){var t=e.substring(0,2);return parseInt(t)%24+":00:00"}},{key:"getUniqueListFromKey",value:function(e,t){var a=[];return e.forEach(function(e){a.findIndex(function(a){return a[t]===e[t]})<=-1&&a.push(e[t])}),a=Object(y.a)(new Set(a))}},{key:"addKeyToObjectFromMatchingListKey",value:function(e,t,a,n){return e.forEach(function(e){for(var i in t)if(t.hasOwnProperty(i)){var r=t[i];if(e[n.matchingKeyInList].includes(r[n.matchingKeyInObject])){var o=+e[n.valueKey];t[i][n.keyToAdd]=a(o)}}}),t}}]),e}(),O=a(196),w=a(72),j=function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement(O.a,null,this.props.values.map(function(t,a){return i.a.createElement(w.a,{color:"info",key:a,onClick:function(){return e.props.onClick(t)}},t)}))}}]),t}(n.Component),C=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).updateYear=function(e){a.setState({year:e})};var n=v.filterObjectList(e.data,"numCustomersAffected",!0),i=v.getUniqueListFromKey(n,"year");return a.state={data:n,year:e.data[0].year,years:i,screenWidth:e.screenSize[0],screenHeight:e.screenSize[1]},a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"creatChartConfig",value:function(e,t,a){return{labels:e,datasets:[{data:t,backgroundColor:a}]}}},{key:"formatChartData",value:function(e){var t=[],a=[],n=[];return e.forEach(function(e){t.push(e.description),a.push(parseInt(e.numCustomersAffected)),n.push(v.getRandomColor())}),{labels:t,values:a,colors:n}}},{key:"getChartOptions",value:function(){return{title:{display:this.props.displayTitle,text:this.props.title+" ("+this.state.year+")",fontSize:25},legend:{display:this.props.displayLegend,position:this.props.legendPosition},layout:{padding:{left:0,right:50,bottom:50,top:0}}}}},{key:"removeDuplicates",value:function(e){var t=[];return e.forEach(function(e){t.findIndex(function(t){return t.description===e.description})<=-1&&t.push({year:e.year,description:e.description,numCustomersAffected:e.numCustomersAffected})}),t}},{key:"render",value:function(){var e=this,t=this.state,a=t.data,n=t.years,r=a.filter(function(t){return t.year===e.state.year}),o=this.removeDuplicates(r),s=this.formatChartData(o),c=s.labels,u=s.values,l=s.colors,d=this.creatChartConfig(c,u,l);return i.a.createElement("div",null,i.a.createElement(j,{onClick:this.updateYear,values:n}),i.a.createElement(b.c,{data:d,options:this.getChartOptions()}))}}]),t}(n.Component);C.defaultProps={displayTitle:!0,displayLegend:!0,legendPosition:"right",title:"Title"};var k=a(28),E=a(197),S=a(198),A=a(200),T=a(199),x=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).toggle=function(){a.setState(function(e){return{dropdownOpen:!e.dropdownOpen}})},a.state={dropdownOpen:!1,cause:e.causes[0]},a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement(E.a,{isOpen:this.state.dropdownOpen,toggle:this.toggle},i.a.createElement(S.a,{caret:!0},this.state.cause),i.a.createElement(A.a,null,i.a.createElement(T.a,{header:!0},this.props.header),i.a.createElement(T.a,{divider:!0}),this.props.causes.map(function(t,a){return i.a.createElement(T.a,{key:a,onClick:function(){e.props.updateCause(t),e.setState({cause:t})}},t)})))}}]),t}(n.Component),M=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).updateCause=function(e){for(var t=[],n=a.state.data.filter(function(t){return t.description===e}),r=0;r<n.length/10;r++)t.push(i.a.createElement(k.ForceGraphNode,{key:r,node:{id:r},fill:"red"}));for(console.log(r);r<a.state.data.length/10;r++)t.push(i.a.createElement(k.ForceGraphNode,{key:r,node:{id:r},fill:"black"}));a.setState({cause:e,causeCount:n.length,nodes:t})};var n=v.filterObjectList(e.data,"numCustomersAffected",!0),r=v.getUniqueListFromKey(n,"description");return a.state={data:e.data,nodes:[],width:e.screenSize[0],height:e.screenSize[1],cause:r[0],causes:r,causeCount:0},a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({width:e.screenSize[0],height:e.screenSize[1]})}},{key:"componentDidMount",value:function(){for(var e=this,t=[],a=this.state.data.filter(function(t){return t.description===e.state.cause}),n=0;n<a.length/10;n++)t.push(i.a.createElement(k.ForceGraphNode,{key:n,node:{id:n},fill:"red"}));for(;n<this.state.data.length/10;n++)t.push(i.a.createElement(k.ForceGraphNode,{key:n,node:{id:n},fill:"black"}));this.setState({causeCount:a.length,nodes:t})}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("label",null,this.state.causeCount," out of ",this.state.data.length," outages due to"," ",this.state.cause," in the last 15 years."),i.a.createElement(x,{header:"Select a cause",causes:this.state.causes,updateCause:this.updateCause}),i.a.createElement(k.ForceGraph,{simulationOptions:{height:this.state.height-250,width:this.state.width,animate:!0}},this.state.nodes))}}]),t}(n.Component),N=(a(188),function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"landing-root",id:this.props.id},i.a.createElement("h1",null,this.props.title),i.a.createElement("p",{className:"landing-text"},this.props.text))}}]),t}(n.Component)),L=a(76),z=a.n(L),I=a(79),q=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).state={years:[],sums:[]},a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=v.getUniqueListFromKey(this.props.data,"year");e.reverse();var t=[];this.props.data.forEach(function(a){var n=e.findIndex(function(e){return e===a.year});void 0===t[n]?t[n]={year:e[n],sum:+a.numCustomersAffected}:t[n].sum+=+a.numCustomersAffected});var a=[],n=[];t.forEach(function(e){a.push(e.year),n.push(e.sum)}),this.setState({years:a,sums:n})}},{key:"render",value:function(){var e="rgba(75,192,192,1)";return i.a.createElement("div",null,i.a.createElement(b.b,{data:{labels:this.state.years,datasets:[{label:"",fill:!1,lineTension:.1,backgroundColor:"rgba(75,192,192,0.6)",borderColor:e,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:e,pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:e,pointHoverBorderColor:e,pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:this.state.sums}]},options:{legend:{display:!1},title:{display:!0,text:this.props.title,fontSize:25},scales:{xAxes:[{display:!0,scaleLabel:{display:!0,labelString:"Year",fontSize:25}}],yAxes:[{display:!0,scaleLabel:{display:!0,labelString:"Number of customers affected",fontSize:25},gridLines:{display:!0}}]}}}))}}]),t}(n.Component),W=a(77),H=a.n(W),D=a(40),K=a(78),F=(a(192),function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).initConfig=function(){var e={};for(var t in D)D.hasOwnProperty(t)&&(e[t]={name:D[t]});return e},a.mapHandler=function(e){a.setState({title:e.target.dataset.name})},a.statesCustomConfig=function(){return a.state.config};var n=v.filterObjectList(e.data,"numCustomersAffected",!0),i=a.initConfig(),r=v.getListFromListOfObjects(n,"numCustomersAffected",!0),o=Math.max.apply(Math,Object(y.a)(r))/10,s=Math.min.apply(Math,Object(y.a)(r)),c=Object(K.a)().domain([s,o]).range(["#d3d3d3","#ff0000"]);return i=v.addKeyToObjectFromMatchingListKey(n,i,c,{matchingKeyInList:"geographicAreas",matchingKeyInObject:"name",valueKey:"numCustomersAffected",keyToAdd:"fill"}),a.state={currentYear:e.data[0].year,title:"United States Map",data:n,config:i,max:o,min:s,colorScale:c},a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentWillUpdate",value:function(){console.log(this.state.title)}},{key:"render",value:function(){return i.a.createElement(H.a,{onClick:this.mapHandler,customize:this.state.config,width:this.props.screenSize[0],height:this.props.screenSize[1]-250,title:"United States Map"})}}]),t}(n.Component)),P=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).state={times:[],sums:[]},a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.data,t="beginTime",a=v.filterObjectList(e,t,!1);a.forEach(function(e){e[t]=v.cleanTime(e[t])});var n=v.getUniqueListFromKey(a,t),i=[],r="numCustomersAffected";a.forEach(function(e){var a=n.findIndex(function(a){return a===e[t]});void 0===i[a]?i[a]={beginTime:n[a],sum:+e[r]}:i[a].sum+=+e[r]});var o=[],s=[];i.forEach(function(e){var t=e.beginTime.substring(0,2).includes(":")?e.beginTime.substring(0,1):e.beginTime.substring(0,2),a=parseInt(t);o[a]=e.beginTime,s[a]=e.sum}),this.setState({times:o,sums:s})}},{key:"render",value:function(){var e="rgba(70, 130, 180, 1)";return i.a.createElement("div",null,i.a.createElement(b.a,{data:{labels:this.state.times,datasets:[{label:"",fill:!1,lineTension:.1,backgroundColor:"rgba(70, 130, 180, 0.6)",borderColor:e,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:e,pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:e,pointHoverBorderColor:e,pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:this.state.sums}]},options:{legend:{display:!1},title:{display:!0,text:this.props.title,fontSize:25},scales:{xAxes:[{display:!0,scaleLabel:{display:!0,labelString:"Time",fontSize:25}}],yAxes:[{display:!0,scaleLabel:{display:!0,labelString:"Number of customers affected",fontSize:25},gridLines:{display:!0}}]}}}))}}]),t}(n.Component),R=a(33),U=["#home-page","#question-page-1","#vis-page-1","#question-page-2","#vis-page-2","#question-page-3","#vis-page-3","#question-page-4","#vis-page-4","#question-page-5","#vis-page-5","#conclusion-page"],B=0;document.onkeydown=function(e){38===(e=e||window.event).keyCode?(B--,B%=U.length,Object(R.a)(U[B])):40===e.keyCode?(console.log(e.keyCode),B++,B%=U.length,Object(R.a)(U[B])):37===e.keyCode?(B--,B%=U.length,Object(R.a)(U[B])):39===e.keyCode&&(B++,B%=U.length,Object(R.a)(U[B]))};var G=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(a=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).state={screenWidth:1920,screenHeight:1080,data:null},a.onResize=function(){a.setState({screenWidth:window.innerWidth,screenHeight:window.innerHeight})},a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(c.a.mark(function e(){var t=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:window.addEventListener("resize",this.onResize,!1),this.onResize(),Object(I.a)(z.a,function(e,a){if(e)throw e;t.setState({data:a})});case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.data,a=e.screenWidth,n=e.screenHeight;return null===t?i.a.createElement("div",null,"loading..."):i.a.createElement("div",{className:"App"},i.a.createElement("div",null,i.a.createElement(N,{id:"home-page",jumpTarget:"#question-page-1",title:"Power outages in the United States",text:"We currently live in a time where electronics become more and more integral in our daily lives. As a result, the  demand for power increases and events like power outages are  becoming more and more concerning. Power outages  in the United States occur for many reasons. Analysis of the  causes, frequency, and the impact of power outages follows..."}),i.a.createElement(g,{id:"question-page-1",jumpTarget:"#vis-page-1",title:"What causes outages?",text:"The simulation below shows the causes of power outages and their  relative frequency to one another in the United States from  2000-2014. From the simulation we learned that severe  weather conditions cause the most power outages."}),i.a.createElement(f,{id:"vis-page-1",jumpTarget:"#question-page-2",title:"Each node represents about 10 power outages",visualization:i.a.createElement(M,{data:t,screenSize:[a,n]})}),i.a.createElement(g,{id:"question-page-2",jumpTarget:"#vis-page-2",title:"What are the most common causes?",text:"To answer this question we used an interactive pie chart  that filters the data based on year. Based on that year you can see what the most common causes on power outages in the United  States."}),i.a.createElement(f,{id:"vis-page-2",jumpTarget:"#question-page-3",visualization:i.a.createElement(C,{data:t,title:"Power Outage Causes and Number of Customer Affected",screenSize:[a,n]})}),i.a.createElement(g,{id:"question-page-3",jumpTarget:"#vis-page-3",title:"Where is it more common?",text:"To answer this question we used a chloropleth map to show which states experience power outages more frequently. The darker the color of the state the more people were affected."}),i.a.createElement(f,{id:"vis-page-3",jumpTarget:"#question-page-4",title:"Amount of Customers Affected in the United States",visualization:i.a.createElement(F,{data:t,screenSize:[a,n]})}),i.a.createElement(g,{id:"question-page-4",jumpTarget:"#vis-page-4",title:"When is it more impactful?",text:"Looking at the bar graph below we can conclude that the most common hours of the day when people experience power outages are between 3:00pm - 6:00pm"}),i.a.createElement(f,{id:"vis-page-4",jumpTarget:"#question-page-5",visualization:i.a.createElement(P,{data:t,title:"Number of People Affected for Every Hour"})}),i.a.createElement(g,{id:"question-page-5",jumpTarget:"#vis-page-5",title:"When is it more impactful?",text:"By looking at the line graph below we can answer when power outages are more impactful based on year. The years 2008, 2011, and 2012 had the highest incidences of power outages in the last 15 years of our data set range."}),i.a.createElement(f,{id:"vis-page-5",jumpTarget:"#conclusion-page",visualization:i.a.createElement(q,{data:t,title:"Number of People Affected Over Time"})}),i.a.createElement(N,{id:"conclusion-page",jumpTarget:"#home-page",title:"Conclusion",text:"Through the use of both static and interactive visualizations  we were able to take a data set that truly intrested us and explored  the different ways to represent the answers we found. Some key  insights we found from the data set include; that roughly half of  the power outages in the last fifteen years have been caused by  severe weather conditions, that people in 2014 who experienced  power outages mainly had been caused by system failures, and  that New Mexico, Oklahoma, and Kansas experience power outages more frequently than the rest of the United States."})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(193),a(194);o.a.render(i.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},40:function(e){e.exports={AL:"Alabama",AK:"Alaska",AS:"American Samoa",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",DC:"District Of Columbia",FM:"Federated States Of Micronesia",FL:"Florida",GA:"Georgia",GU:"Guam",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MH:"Marshall Islands",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",MP:"Northern Mariana Islands",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PW:"Palau",PA:"Pennsylvania",PR:"Puerto Rico",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VI:"Virgin Islands",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"}},76:function(e,t,a){e.exports=a.p+"static/media/power_outages.b012b964.csv"},81:function(e,t,a){e.exports=a(195)},88:function(e,t,a){},89:function(e,t,a){}},[[81,1,2]]]);
//# sourceMappingURL=main.7d385b54.chunk.js.map