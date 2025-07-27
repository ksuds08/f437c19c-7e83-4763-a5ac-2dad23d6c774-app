export async function TemplateLibraryHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const url = new URL(req.url);
    const industry = url.searchParams.get('industry');
    const careerLevel = url.searchParams.get('careerLevel');

    if (!industry || !careerLevel) {
      return new Response(JSON.stringify({ error: 'Missing required query parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const templates = getTemplates(industry, careerLevel);

    return new Response(JSON.stringify({ templates }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function getTemplates(industry: string, careerLevel: string): Array<{ id: string, name: string, description: string }> {
  // This is a stub function for example purposes.
  // In a real application, this would query a database or use an AI service.
  return [
    { id: '1', name: 'Professional Resume', description: `A professional template for ${industry} at ${careerLevel} level.` },
    { id: '2', name: 'Creative Resume', description: `A creative template suited for ${industry} professionals at ${careerLevel} level.` }
  ];
}