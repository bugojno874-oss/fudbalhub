const FEEDS=[
 ['BBC Sport','https://feeds.bbci.co.uk/sport/football/rss.xml'],
 ['Sky Sports','https://www.skysports.com/rss/12040'],
 ['ESPN FC','https://www.espn.com/espn/rss/soccer/news'],
 ['The Guardian Football','https://www.theguardian.com/football/rss']
];
function json(data,status=200,ttl=600){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':`public,max-age=${ttl},stale-while-revalidate=120`,'access-control-allow-origin':'*'}})}
function text(s){return (s||'').replace(/<!\[CDATA\[|\]\]>/g,'').replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#x27;/g,"'").replace(/&apos;/g,"'").replace(/\s+/g,' ').trim()}
function items(xml){const out=[];for(const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)){const b=m[1];const title=text((b.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]);const desc=text((b.match(/<description[^>]*>([\s\S]*?)<\/description>/i)||[])[1]);const date=text((b.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i)||[])[1]);const link=text((b.match(/<link[^>]*>([\s\S]*?)<\/link>/i)||[])[1]);if(title)out.push({title,description:desc,date,link})}return out}
export async function onRequestGet(){try{const all=[];for(const [source,url] of FEEDS){try{const r=await fetch(url,{headers:{'user-agent':'FudbalHub/1.0'}});if(!r.ok)continue;for(const x of items(await r.text()))all.push({...x,source})}catch(e){console.log(source,e.message)}}all.sort((a,b)=>new Date(b.date||0)-new Date(a.date||0));const seen=new Set();const clean=all.filter(x=>{const k=x.title.toLowerCase();if(seen.has(k))return false;seen.add(k);return true}).slice(0,50);return json({updated:new Date().toISOString(),items:clean})}catch(e){return json({error:e.message},502,0)}}
