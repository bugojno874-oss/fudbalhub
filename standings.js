const BASE='https://v3.football.api-sports.io';
const LEAGUES=[
 [2,'Liga prvaka'],[39,'Premier League'],[140,'La Liga'],[78,'Bundesliga'],[135,'Serie A'],[61,'Ligue 1'],
 [88,'Eredivisie'],[94,'Primeira Liga'],[203,'Süper Lig'],[307,'Saudi Pro League'],[253,'MLS'],
 [144,'Belgija'],[315,'BiH'],[210,'Hrvatska']
];
const season=new Date().getUTCFullYear();
function json(data,status=200,ttl=900){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':`public,max-age=${ttl},stale-while-revalidate=120`,'access-control-allow-origin':'*'}})}
export async function onRequestGet({env}){
 if(!env.FOOTBALL_API_KEY)return json({error:'FOOTBALL_API_KEY nije postavljen.'},500,0);
 try{
  const out=[];
  for(const [league,name] of LEAGUES){
   const r=await fetch(`${BASE}/standings?league=${league}&season=${season}`,{headers:{'x-apisports-key':env.FOOTBALL_API_KEY}});
   if(!r.ok)continue; const d=await r.json(); for(const x of d.response||[])out.push({...x,_priority:LEAGUES.findIndex(v=>v[0]===league),_label:name});
  }
  out.sort((a,b)=>(a._priority??999)-(b._priority??999));
  return json({updated:new Date().toISOString(),season,response:out});
 }catch(e){return json({error:e.message},502,0)}
}
