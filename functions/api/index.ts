// Auto-generated index.ts for Pages Functions routing
import type { Request } from 'itty-router';

import { AIEngineHandler } from './AIEngine';
import { KeywordOptimizerHandler } from './KeywordOptimizer';
import { IndustryAdviceAPIHandler } from './IndustryAdviceAPI';
import { FeedbackSystemHandler } from './FeedbackSystem';
import { TemplateLibraryHandler } from './TemplateLibrary';

export async function onRequest({ request }: { request: Request }): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/api/AIEngine") return AIEngineHandler(request);
  if (path === "/api/KeywordOptimizer") return KeywordOptimizerHandler(request);
  if (path === "/api/IndustryAdviceAPI") return IndustryAdviceAPIHandler(request);
  if (path === "/api/FeedbackSystem") return FeedbackSystemHandler(request);
  if (path === "/api/TemplateLibrary") return TemplateLibraryHandler(request);

  return new Response("Not found", { status: 404 });
}
