import { validateRequest, fetchIndustryAdvice } from './utils';

export async function IndustryAdviceAPIHandler(req: Request): Promise<Response> {
  try {
    const { valid, error } = validateRequest(req);
    if (!valid) {
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    const { industry } = await req.json();
    const advice = await fetchIndustryAdvice(industry);

    return new Response(JSON.stringify({ advice }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}