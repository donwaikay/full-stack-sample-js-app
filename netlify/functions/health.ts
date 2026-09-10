export default async () => new Response(JSON.stringify({status:'ok',service:'api',timestamp:new Date().toISOString()}),{headers:{'content-type':'application/json','cache-control':'no-store'}});
