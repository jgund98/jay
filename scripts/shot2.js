const puppeteer=require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");
const [route,sel,w,off,out]=process.argv.slice(2);
(async()=>{
  const br=await puppeteer.launch({headless:"new"});
  const p=await br.newPage();
  await p.setViewport({width:+w,height:+w>600?900:812});
  await p.evaluateOnNewDocument(()=>{try{sessionStorage.setItem("gc-owner-seen","1")}catch(e){}});
  await p.goto("http://localhost:3441"+(route==="ROOT"?"/":route),{waitUntil:"networkidle0"});
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}});
  await p.evaluate((s,o)=>{const el=[...document.querySelectorAll("h1,h2,section")].find(x=>x.innerText&&x.innerText.includes(s));if(el){el.scrollIntoView({block:"start"});window.scrollBy(0,+o);}},sel,off);
  await new Promise(r=>setTimeout(r,900));
  await p.screenshot({path:out});
  await br.close();console.log("saved "+out);
})();
