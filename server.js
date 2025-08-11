const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const PORT = 5000;

// Replace with your GitHub token from Marketplace (ghp_...)
const GITHUB_TOKEN = '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';
const MODEL_NAME = 'openai/gpt-4.1';
const ENDPOINT = 'https://models.github.ai/inference';

const openai = new OpenAI({
  apiKey: GITHUB_TOKEN,
  baseURL: ENDPOINT,
});

app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is working with GitHub AI model");
});

// Generic chat endpoint
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: messages || [],
      temperature: 0.8,
    });

    res.json(response);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: 'Failed to contact GitHub AI API' });
  }
});

// Preparation tips endpoint
app.post('/api/preparation-tips', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: "system", content: "You are a helpful assistant for blood donors." },
        { role: "user", content: "Give me preparation tips before donating blood." }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error fetching preparation tips:", error);
    res.status(500).json({ error: "Failed to fetch preparation tips" });
  }
});

// Post-care tips endpoint
app.post('/api/post-care', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: "system", content: "You are a helpful assistant for blood donors." },
        { role: "user", content: "Give me post-donation care tips for a blood donor." }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error fetching post-care tips:", error);
    res.status(500).json({ error: "Failed to fetch post-donation care tips" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
