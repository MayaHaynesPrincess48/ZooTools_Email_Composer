export const runtime = 'edge';

export async function POST(): Promise<Response> {
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer Far4n-ZDIKz2XADoC6-Drzp3qAm_3dgl_EedzGI4',
    },
  };

  const r = await fetch(
    'https://api.cloudflare.com/client/v4/accounts/1SlS_Sa7SC9IuABNPWLxeGMH4G8/images/v2/direct_upload',
    options,
  );

  const result = await r.json();

  return new Response(JSON.stringify({ result }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache, no-store, must-revalidate',
    },
  });
}
