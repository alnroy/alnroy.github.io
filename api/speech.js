import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { audioBase64 } = req.body;

  if (!audioBase64) {
    return res.status(400).json({ error: 'Missing audioBase64 in request body' });
  }

  if (!process.env.GOOGLE_API_KEY) {
    console.error('GOOGLE_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error: Google API Key missing.' });
  }

  const audioContent = audioBase64.split(',')[1]; // Remove "data:audio/webm;base64," prefix

  const googleRequestBody = {
    config: {
      encoding: "WEBM_OPUS", // Assuming your MediaRecorder outputs WebM Opus
      sampleRateHertz: 48000, // Adjust if your audio has a different sample rate
      languageCode: "en-US",
      enableAutomaticPunctuation: true,
    },
    audio: {
      content: audioContent,
    },
  };

  try {
    const googleResponse = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleRequestBody),
      }
    );

    const googleData = await googleResponse.json();

    if (!googleResponse.ok) {
      // Google API returned an error
      console.error('Google Speech API Error:', googleData);
      return res.status(googleResponse.status).json({
        error: 'Failed to transcribe audio from Google Speech API',
        details: googleData.error?.message || 'Unknown error from Google API',
      });
    }

    // Successfully got a response from Google
    const transcript = googleData.results?.[0]?.alternatives?.[0]?.transcript || '';

    return res.status(200).json({ transcript });

  } catch (error: any) {
    console.error('Error in Vercel speech API:', error);
    return res.status(500).json({
      error: 'Internal server error during speech recognition process',
      details: error.message || 'An unexpected error occurred.',
    });
  }
}