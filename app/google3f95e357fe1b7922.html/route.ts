export const dynamic = "force-static";

export function GET() {
  return new Response(
    "google-site-verification: google3f95e357fe1b7922.html",
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  );
}