export async function FeedbackSystemHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    const contentType = req.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const body: FeedbackRequest = await req.json();
    const validationError = validateFeedbackRequest(body);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Simulate feedback processing
    const feedbackResponse: FeedbackResponse = {
      message: 'Thank you for your feedback!',
      inputs: body
    };

    return new Response(JSON.stringify(feedbackResponse), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

type FeedbackRequest = {
  userId: string;
  feedbackText: string;
  rating: number;
};

type FeedbackResponse = {
  message: string;
  inputs?: FeedbackRequest;
};

function validateFeedbackRequest(body: FeedbackRequest): string | null {
  if (!body.userId || typeof body.userId !== 'string') {
    return 'Invalid or missing userId';
  }
  if (!body.feedbackText || typeof body.feedbackText !== 'string') {
    return 'Invalid or missing feedbackText';
  }
  if (typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5) {
    return 'Rating should be a number between 1 and 5';
  }
  return null;
}