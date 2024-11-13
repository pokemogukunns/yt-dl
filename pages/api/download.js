import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  // クエリパラメータからYouTubeのURLを取得
  const { url } = req.query;

  // URLが提供されていない場合はエラーメッセージを返す
  if (!url) {
    return res.status(400).json({ error: 'YouTube URL is required' });
  }

  try {
    // YouTube動画の情報を取得
    const info = await ytdl.getInfo(url);

    // 動画の最適なダウンロードリンクを取得（動画の最高画質）
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    // ダウンロードリンクを返す
    return res.status(200).json({ downloadUrl: format.url });
  } catch (error) {
    console.error('Error fetching YouTube video info:', error);
    return res.status(500).json({ error: 'Failed to fetch video information' });
  }
}
