const puppeteer=require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");
const [route,y,w,h,out]=process.argv.slice(2);
(async()=>{
  const br=await puppeteer.launch({headless:"new"});
  const p=await br.newPage();
  await p.setViewport({width:+w,height:+h});
  await p.evaluateOnNewDocument(()=>{try{sessionStorage.setItem("gc-owner-seen","1")}catch(e){}});
  await p.goto("http://localhost:3441"+(route==="ROOT"?"/":route),{waitUntil:"networkidle0"});
  await p.evaluate(async()=>{for(let k=0;k<document.body.scrollHeight;k+=300){window.scrollTo(0,k);await new Promise(r=>setTimeout(r,50));}});
  await p.evaluate((yy)=>window.scrollTo(0,+yy),y);
  await new Promise(r=>setTimeout(r,900));
  await p.screenshot({path:out});
  await br.close();console.log("saved "+out);
})();
