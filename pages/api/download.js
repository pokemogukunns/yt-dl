import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      error: 'YouTube URL is required',
      message: 'URL parameter is missing'
    });
  }

  try {
    // YouTube動画の情報を取得
    const info = await ytdl.getInfo(url);
    
    // 最適なフォーマットを選択
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    // ダウンロードリンクを返す
    return res.status(200).json({
      success: true,
      downloadUrl: format.url
    });

  } catch (error) {
    console.error('Error fetching YouTube video info:', error);

    // 詳細なエラーメッセージとスタックトレースをJSONとして返す
    return res.status(500).json({
      error: 'Failed to fetch video information',
      message: error.message,
      stack: error.stack,
      url: req.query.url, // エラーが発生したURLも返しておく
    });
  }
}
