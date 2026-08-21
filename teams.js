const BASE='https://v3.football.api-sports.io';
const LEAGUES=[2,39,140,78,135,61,88,94,203,307,253,144,315,210];
const season=new Date().getUTCFullYear();
function json(data,status=200,ttl=3600){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':`public,max-age=${ttl},stale-while-revalidate=300`,'access-control-allow-origin':'*'}})}
export async function onRequestGet({env}){
 if(!env.FOOTBALL_API_KEY)return json({error:'FOOTBALL_API_KEY nije postavljen.'},500,0);
 try{const out=[];const seen=new Set();
  for(const league of LEAGUES){const r=await fetch(`${BASE}/teams?league=${league}&season=${season}`,{headers:{'x-apisports-key':env.FOOTBALL_API_KEY}});if(!r.ok)continue;const d=await r.json();for(const x of d.response||[]){const id=x.team?.id;if(id&&!seen.has(id)){seen.add(id);out.push({...x,_league:league)}}}
  }
  return json({updated:new Date().toISOString(),season,response:out});
 }catch(e){return json({error:e.message},502,0)}
}
