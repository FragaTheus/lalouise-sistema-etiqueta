import { NextRequest } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ?? "https://lalouise-backend-latest.onrender.com";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "te",
  "trailer",
  "upgrade",
  "proxy-authorization",
  "proxy-authenticate",
  "host",
  "content-length",
]);

function buildTargetUrl(request: NextRequest, path: string[]) {
  return `${BACKEND_URL}/api/v1/${path.join("/")}${request.nextUrl.search}`;
}

function getForwardHeaders(request: NextRequest) {
  const headers = new Headers();

  for (const [key, value] of request.headers.entries()) {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

  headers.set("x-forwarded-host", request.headers.get("host") ?? "");
  headers.set("x-forwarded-proto", request.nextUrl.protocol.replace(":", ""));

  return headers;
}

function getResponseHeaders(upstreamResponse: Response) {
  const headers = new Headers();

  for (const [key, value] of upstreamResponse.headers.entries()) {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

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
  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  const upstreamResponse = await fetch(buildTargetUrl(request, path), {
    method: request.method,
    headers: getForwardHeaders(request),
    body: hasBody ? request.body : undefined,
    redirect: "manual",
    cache: "no-store",
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: getResponseHeaders(upstreamResponse),
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
export const OPTIONS = handleRequest;
export const HEAD = handleRequest;