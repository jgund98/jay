const puppeteer=require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");
const B="http://localhost:3441";
(async()=>{
  const xml=await (await fetch(B+"/sitemap.xml")).text();
  const routes=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
  const br=await puppeteer.launch({headless:"new"});
  let bad=0;
  for(const vp of [{w:375,h:812,n:"mobile"},{w:1440,h:900,n:"desktop"}]){
    const p=await br.newPage();
    await p.setViewport({width:vp.w,height:vp.h,deviceScaleFactor:1});
    for(const r of routes){
      await p.goto(B+r,{waitUntil:"networkidle0"});
      await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}window.scrollTo(0,0);});
      const res=await p.evaluate(()=>{
        const out={overflow:[],broken:[],fused:[],orphan:[]};
        const docW=document.documentElement.clientWidth;
        if(document.documentElement.scrollWidth>docW+1){
          document.querySelectorAll("*").forEach(el=>{
            const b=el.getBoundingClientRect();
            if(b.width>0&&b.right>docW+2&&!el.closest("[data-allow-x]")&&getComputedStyle(el.parentElement||el).overflowX!=="auto")
              out.overflow.push(el.tagName+"."+String(el.className).slice(0,40)+" right="+Math.round(b.right));
          });
        }
        document.querySelectorAll("img").forEach(i=>{if(i.complete&&i.naturalWidth===0)out.broken.push(i.currentSrc||i.src);});
        // fused words: lowercase immediately followed by uppercase inside a text node with no space
        const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
        let n; while(n=w.nextNode()){
          const t=n.nodeValue;
          const m=t&&t.match(/[a-z]{3,}[A-Z][a-z]{2,}/);
          if(m && !n.parentElement.closest("script,style")) out.fused.push(m[0]);
        }
        // orphaned last word in headings
        document.querySelectorAll("h1,h2,h3").forEach(h=>{
          const txt=h.innerText.trim(); if(!txt) return;
          const r=document.createRange(); r.selectNodeContents(h);
          const rects=[...r.getClientRects()].filter(x=>x.width>1);
          // group rects into LINE boxes by rounded top — styled spans split rects
          const lines=new Map();
          rects.forEach(x=>{const k=Math.round(x.top/4);const L=lines.get(k)||{l:1e9,r:-1e9};L.l=Math.min(L.l,x.left);L.r=Math.max(L.r,x.right);lines.set(k,L);});
          const ws=[...lines.values()].map(L=>L.r-L.l);
          if(ws.length>1){
            const last=ws[ws.length-1], widest=Math.max(...ws);
            if(last < widest*0.22) out.orphan.push(txt.slice(0,50)+" | lastLine="+Math.round(last)+"px of "+Math.round(widest));
          }
        });
        return out;
      });
      const probs=Object.entries(res).filter(([,v])=>v.length);
      if(probs.length){bad++;console.log("✗ ["+vp.n+"] "+r);probs.forEach(([k,v])=>console.log("   "+k+": "+[...new Set(v)].slice(0,4).join(" ~ ")));}
    }
    await p.close();
  }
  console.log(bad?"\n"+bad+" route/viewport combos with findings":"\nCLEAN — "+routes.length+" routes x 2 viewports");
  await br.close();
})();
