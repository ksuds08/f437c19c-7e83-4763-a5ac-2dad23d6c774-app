export async function KeywordOptimizerHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Invalid Content-Type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const requestBody: KeywordOptimizerRequest = await req.json();

    const { resumeText, industryKeywords } = requestBody;
    if (!resumeText || !Array.isArray(industryKeywords)) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const optimizedResult = optimizeKeywords(resumeText, industryKeywords);

    return new Response(JSON.stringify({ optimizedResume: optimizedResult }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

type KeywordOptimizerRequest = {
  resumeText: string;
  industryKeywords: string[];
};

function optimizeKeywords(resumeText: string, industryKeywords: string[]): string {
  let optimizedResume = resumeText;

  industryKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    if (!regex.test(optimizedResume)) {
      optimizedResume += ` ${keyword}`;
    }
  });

  return optimizedResume;
}
