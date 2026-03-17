import { NextRequest } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ?? "https://lalouise-backend-latest.onrender.com";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function buildTargetUrl(request: NextRequest, path: string[]) {
  const targetPath = path.join("/");
  const query = request.nextUrl.search;

  return `${BACKEND_URL}/api/v1/${targetPath}${query}`;
}

function getForwardHeaders(request: NextRequest) {
  const headers = new Headers(request.headers);

  headers.delete("host");
  headers.delete("content-length");
  headers.set("x-forwarded-host", request.headers.get("host") ?? "");
  headers.set("x-forwarded-proto", request.nextUrl.protocol.replace(":", ""));

  return headers;
}

async function proxyRequest(request: NextRequest, path: string[]) {
  try {
    const targetUrl = buildTargetUrl(request, path);
    const headers = getForwardHeaders(request);
    const method = request.method;
    const hasBody = method !== "GET" && method !== "HEAD";
    const bodyBuffer = hasBody ? await request.arrayBuffer() : undefined;
    const body = bodyBuffer && bodyBuffer.byteLength > 0 ? bodyBuffer : undefined;

    const upstreamResponse = await fetch(targetUrl, {
      method,
      headers,
      body,
      redirect: "manual",
      cache: "no-store",
    });

    const responseHeaders = new Headers(upstreamResponse.headers);
    const proxyResponse = new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });

    const setCookieFromUpstream =
      typeof upstreamResponse.headers.getSetCookie === "function"
        ? upstreamResponse.headers.getSetCookie()
        : [];

    if (setCookieFromUpstream.length > 0) {
      proxyResponse.headers.delete("set-cookie");

      for (const cookie of setCookieFromUpstream) {
        proxyResponse.headers.append("set-cookie", cookie);
      }
    }

    return proxyResponse;
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
