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
  "content-encoding", 
]);

function buildTargetUrl(request: NextRequest, path: string[]) {
  const targetPath = path.join("/");
  const query = request.nextUrl.search;
  return `${BACKEND_URL}/api/v1/${targetPath}${query}`;
}

function getForwardHeaders(request: NextRequest, bodyBuffer?: ArrayBuffer) {
  const headers = new Headers();

  for (const [key, value] of request.headers.entries()) {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

  if (bodyBuffer && bodyBuffer.byteLength > 0) {
    headers.set("content-length", String(bodyBuffer.byteLength));
  }

  headers.set("x-forwarded-host", request.headers.get("host") ?? "");
  headers.set("x-forwarded-proto", request.nextUrl.protocol.replace(":", ""));

  return headers;
}

async function proxyRequest(request: NextRequest, path: string[]) {
  try {
    const targetUrl = buildTargetUrl(request, path);
    const method = request.method;
    const hasBody = method !== "GET" && method !== "HEAD";

    const bodyBuffer = hasBody ? await request.arrayBuffer() : undefined;
    const body = bodyBuffer && bodyBuffer.byteLength > 0 ? bodyBuffer : undefined;
    const headers = getForwardHeaders(request, body ? bodyBuffer : undefined);

    const upstreamResponse = await fetch(targetUrl, {
      method,
      headers,
      body: body ?? null,
      redirect: "manual",
      cache: "no-store",
    } as RequestInit & { duplex: string });

    const responseHeaders = new Headers();

    for (const [key, value] of upstreamResponse.headers.entries()) {
      if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    }

    const setCookies =
      typeof upstreamResponse.headers.getSetCookie === "function"
        ? upstreamResponse.headers.getSetCookie()
        : [];

    if (setCookies.length > 0) {
      responseHeaders.delete("set-cookie");
      for (const cookie of setCookies) {
        responseHeaders.append("set-cookie", cookie);
      }
    }

    const responseBody = await upstreamResponse.arrayBuffer();
    responseHeaders.set("content-length", String(responseBody.byteLength));

    return new Response(responseBody, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return Response.json(
      { message: "Falha ao comunicar com o backend." },
      { status: 502 },
    );
  }
}

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function OPTIONS(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function HEAD(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}