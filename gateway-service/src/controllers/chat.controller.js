import axios from "axios";

export const streamChat = async (req, res) => {
  const { message, document_ids, conversation_id } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Fallback simulator for token-by-token streaming
  if (process.env.MOCK_AI_CORE === "true") {
    const demoResponse =
      "Revenue grew 18% quarter over quarter, driven mainly by the enterprise segment. Full breakdown is on page 4.";
    const tokens = demoResponse.split(" ");
    let i = 0;

    const interval = setInterval(() => {
      if (i < tokens.length) {
        res.write(`data: ${JSON.stringify({ token: tokens[i] + " " })}\n\n`);
        i++;
      } else {
        res.write(
          `data: ${JSON.stringify({
            citations: [{ document_id: "doc_1", page: 4 }],
            done: true,
          })}\n\n`
        );
        clearInterval(interval);
        res.end();
      }
    }, 60);

    return;
  }

  // Live proxy to Python FastAPI service
  try {
    const aiCoreUrl = process.env.AI_CORE_URL || "http://localhost:8000";
    const response = await axios({
      method: "post",
      url: `${aiCoreUrl}/internal/chat/stream`,
      data: { message, document_ids, conversation_id },
      responseType: "stream",
    });

    response.data.pipe(res);
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: "Failed to stream chat response" })}\n\n`);
    res.end();
  }
};