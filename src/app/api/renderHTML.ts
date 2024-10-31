// /pages/api/renderMJML.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mjml2html from 'mjml';

interface MJMLRequestBody {
  mjmlContent: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { mjmlContent } = req.body as MJMLRequestBody;
    try {
      const htmlOutput = mjml2html(mjmlContent).html;
      res.status(200).json({ html: htmlOutput });
    } catch (error) {
      res.status(500).json({ error: 'Failed to render MJML' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
