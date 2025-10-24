import fetch from "node-fetch";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false, // we handle multipart/form-data with multer
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Use multer to parse the file
  upload.single("audio")(req, {}, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: "File upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    try {
      const audioBase64 = req.file.buffer.toString("base64");

      const body = {
        config: {
          encoding: "WEBM_OPUS",
          sampleRateHertz: 48000,
          languageCode: "en-US",
        },
        audio: { content: audioBase64 },
      };

      const response = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.GOOGLE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      const transcript =
        data.results?.[0]?.alternatives?.[0]?.transcript || "No speech detected.";
      res.status(200).json({ transcript });
    } catch (err) {
      console.error("Google API error:", err);
      res.status(500).json({ error: "Transcription failed" });
    }
  });
}
