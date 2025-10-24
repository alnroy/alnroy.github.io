import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const audioFile = req.body.audio;
    if (!audioFile) {
      return res.status(400).json({ error: "No audio data provided" });
    }

    const response = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            encoding: "WEBM_OPUS",
            sampleRateHertz: 48000,
            languageCode: "en-US",
          },
          audio: { content: audioFile },
        }),
      }
    );

    const data = await response.json();
    const transcript =
      data.results?.[0]?.alternatives?.[0]?.transcript || "No speech detected.";
    res.status(200).json({ transcript });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transcription failed" });
  }
}
