import { NextRequest } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Headers que não devem ser repassados entre proxies (hop-by-hop)
// Nota: content-length NÃO está aqui — será recalculado ao bufferizar o body
const REQUEST_HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "te",
  "trailer",
  "upgrade",
  "proxy-authorization",
  "proxy-authenticate",
  "host",
  "content-length", // removido e recalculado após bufferizar o body
]);

// Nos headers de resposta ao cliente também removemos hop-by-hop
const RESPONSE_HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "te",
  "trailer",
  "upgrade",
  "proxy-authenticate",
  "host",
]);

function buildTargetUrl(request: NextRequest, path: string[]) {
  return `${BACKEND_URL}/api/v1/${path.join("/")}${request.nextUrl.search}`;
}

function buildForwardHeaders(request: NextRequest, bodyLength?: number) {
  const headers = new Headers();

  for (const [key, value] of request.headers.entries()) {
    if (!REQUEST_HOP_BY_HOP.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

  // Re-adiciona content-length correto após bufferizar o body
  if (bodyLength !== undefined) {
    headers.set("content-length", String(bodyLength));
  }

  headers.set("x-forwarded-host", request.headers.get("host") ?? "");
  headers.set("x-forwarded-proto", request.nextUrl.protocol.replace(":", ""));

  return headers;
}

function buildResponseHeaders(upstreamResponse: Response) {
  const headers = new Headers();

  for (const [key, value] of upstreamResponse.headers.entries()) {
    if (!RESPONSE_HOP_BY_HOP.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

  // Preserva múltiplos Set-Cookie corretamente
  const setCookies =
    typeof upstreamResponse.headers.getSetCookie === "function"
      ? upstreamResponse.headers.getSetCookie()
      : [];

  if (setCookies.length > 0) {
    headers.delete("set-cookie");
    for (const cookie of setCookies) {
      headers.append("set-cookie", cookie);
    }
  }

  return headers;
}

async function proxyRequest(request: NextRequest, path: string[]) {
  const targetUrl = buildTargetUrl(request, path);
  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  let body: ArrayBuffer | undefined;
  if (hasBody) {
    // Bufferiza o body para garantir Content-Length correto no upstream
    // e evitar problemas com streams já consumidos por middlewares
    body = await request.arrayBuffer();
  }

  const headers = buildForwardHeaders(
    request,
    body !== undefined ? body.byteLength : undefined
  );

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: body,
      redirect: "manual",
      cache: "no-store",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Upstream connection failed";
    console.error(`[proxy] Falha ao conectar ao backend (${targetUrl}):`, message);
    return new Response(
      JSON.stringify({ status: 502, message: "Backend indisponível. Tente novamente em instantes." }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: buildResponseHeaders(upstreamResponse),
  });
}

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function handleRequest(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
export const HEAD = handleRequest;