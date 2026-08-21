const BASE = 'https://v3.football.api-sports.io';
const LIVE = ['1H','HT','2H','ET','BT','P','SUSP','INT'];
const PRIORITY = [
  2,   // UEFA Champions League
  39,  // Premier League
  140, // La Liga
  78,  // Bundesliga
  135, // Serie A
  61,  // Ligue 1
  88,  // Eredivisie
  94,  // Primeira Liga
  203, // Süper Lig
  307, // Saudi Pro League
  253, // MLS
  144, // Belgian Pro League
  315, // Bosnia & Herzegovina
  210  // Croatia
];
function priority(id){const i=PRIORITY.indexOf(Number(id));return i===-1?999:i}
function json(data,status=200,ttl=10){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':`public,max-age=${ttl},stale-while-revalidate=5`,'access-control-allow-origin':'*'}})}
function validDate(s){return /^\d{4}-\d{2}-\d{2}$/.test(s||'') ? s : null}
export async function onRequestGet({request,env}){
 if(!env.FOOTBALL_API_KEY)return json({error:'FOOTBALL_API_KEY nije postavljen.'},500,0);
 const u=new URL(request.url),mode=u.searchParams.get('mode')||'live';
 let endpoint;
 if(mode==='live') endpoint=`${BASE}/fixtures?live=all`;
 else {const date=validDate(u.searchParams.get('date')) || new Date().toISOString().slice(0,10);endpoint=`${BASE}/fixtures?date=${date}`}
 try{
  const r=await fetch(endpoint,{headers:{'x-apisports-key':env.FOOTBALL_API_KEY}});const data=await r.json();
  if(!r.ok || (data.errors && Object.keys(data.errors).length))return json({error:data.errors||`API greška ${r.status}`},502,0);
  const response=(data.response||[]).sort((a,b)=>priority(a.league?.id)-priority(b.league?.id));
  return json({updated:new Date().toISOString(),date:u.searchParams.get('date')||null,response},mode==='live'?10:45);
 }catch(e){return json({error:e.message},502,0)}
}
