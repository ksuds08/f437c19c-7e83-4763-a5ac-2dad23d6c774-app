export function validateRequest(req: Request): { valid: boolean; error?: string } {
  if (req.method !== 'POST') {
    return { valid: false, error: 'Invalid request method' };
  }

  const contentType = req.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    return { valid: false, error: 'Invalid Content-Type' };
  }

  return { valid: true };
}

export async function fetchIndustryAdvice(industry: string): Promise<string> {
  // Simulate fetching industry-specific advice. In a real application, replace this with an actual data source or API call.
  const adviceMap: { [key: string]: string } = {
    'technology': 'Focus on your technical skills and projects.',
    'finance': 'Highlight your analytical skills and certifications.',
    'healthcare': 'Emphasize your patient care and regulatory knowledge.'
  };

  return adviceMap[industry.toLowerCase()] || 'General advice: Highlight your strengths and achievements.';
}