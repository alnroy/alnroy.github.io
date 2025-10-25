const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!GOOGLE_API_KEY) {
    console.error("❌ GOOGLE_API_KEY missing. Check Vercel environment settings.");
    return res.status(500).json({ error: "Server configuration error: Google API Key missing." });
  }

  const { audioBase64 } = req.body;
  if (!audioBase64) {
    return res.status(400).json({ error: "Missing audioBase64 in request body" });
  }

  if (!process.env.GOOGLE_API_KEY) {
    console.error('GOOGLE_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error: Google API Key missing.' });
  }

  // Remove "data:audio/webm;base64," prefix if it exists
  const audioContent = audioBase64.split(',')[1] || audioBase64;

  const googleRequestBody = {
    config: {
      encoding: "WEBM_OPUS",
      sampleRateHertz: 48000,
      languageCode: "en-US",
      enableAutomaticPunctuation: true,
    },
    audio: { content: audioContent },
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

    // ✅ Handle empty or non-JSON responses gracefully
    let googleData;
    try {
      googleData = await googleResponse.json();
    } catch {
      console.error("Google API returned empty response body.");
      return res.status(502).json({ error: "Invalid response from Google API" });
    }

    if (!googleResponse.ok) {
      console.error("Google Speech API Error:", googleData);
      return res.status(googleResponse.status).json({
        error: "Failed to transcribe audio from Google Speech API",
        details: googleData.error?.message || "Unknown error from Google API",
      });
    }

    const transcript =
      googleData.results?.[0]?.alternatives?.[0]?.transcript || "";

    return res.status(200).json({ transcript });

  } catch (error) {
    console.error("Error in speech API:", error);
    return res.status(500).json({
      error: "Internal server error during speech recognition",
      details: error.message || "Unexpected error occurred.",
    });
  }
}
