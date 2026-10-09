import { NextResponse } from 'next/server';
import { wedding } from '@/lib/wedding';
export async function POST(request: Request) {
 const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY, token=process.env.INVITATION_TOKEN;
 if(!url||!key||!token) return NextResponse.json({error:'Submissions are not connected yet.'},{status:503});
 try {
  const data=await request.json();
  if(data.token!==token) return NextResponse.json({error:'A valid invitation code is required.'},{status:403});
  const name=typeof data.name==='string'?data.name.trim():'';
  const message=typeof data.message==='string'?data.message.trim():'';
  if(!name||name.length>100||message.length>1000||!['rsvp','guestbook'].includes(data.kind)) return NextResponse.json({error:'Please check your name and message.'},{status:400});
  if(data.kind==='guestbook'&&message.length<5) return NextResponse.json({error:'Please write at least 5 characters.'},{status:400});
  const guests=data.attendance==='no'?0:Number(data.guests);
  if(data.kind==='rsvp'&&(!['yes','no'].includes(data.attendance)||!Number.isInteger(guests)||guests<0||guests>wedding.maxGuests||(data.attendance==='yes'&&guests<1))) return NextResponse.json({error:'Please check attendance and guest count.'},{status:400});
  const dietary=typeof data.dietary==='string'?data.dietary.trim():'';
  if(dietary.length>200) return NextResponse.json({error:'Dietary preferences must be under 200 characters.'},{status:400});
  const response=await fetch(`${url}/rest/v1/wedding_responses`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({wedding_id:process.env.WEDDING_ID||'hana-ren-2027',kind:data.kind,name,message,attendance:data.kind==='rsvp'?data.attendance:null,guests:data.kind==='rsvp'?guests:null,dietary,approved:false})});
  if(!response.ok) return NextResponse.json({error:'We could not save your response. Please try again.'},{status:502});
  return NextResponse.json({ok:true});
 } catch { return NextResponse.json({error:'Unable to process your response.'},{status:400}); }
}
