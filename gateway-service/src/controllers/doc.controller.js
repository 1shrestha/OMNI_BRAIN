import axios from "axios";

export const analyzeSource = async (req, res) => {
  const { source, type } = req.body;

  if (!source) {
    return res.status(400).json({ error: "Source URL or document is required" });
  }

  // Set SSE response headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Fallback simulator if teammate hasn't deployed AI core yet
  if (process.env.MOCK_AI_CORE === "true") {
    res.write(`data: ${JSON.stringify({ step: "scrape", status: "in_progress" })}\n\n`);
    
    setTimeout(() => {
      res.write(`data: ${JSON.stringify({ step: "scrape", status: "completed" })}\n\n`);
      res.write(`data: ${JSON.stringify({ step: "embed", status: "in_progress" })}\n\n`);
    }, 1200);

    setTimeout(() => {
      res.write(`data: ${JSON.stringify({ step: "embed", status: "completed", chunks: 41 })}\n\n`);
      res.write(`data: ${JSON.stringify({ step: "chat", status: "ready" })}\n\n`);
      res.end();
    }, 2400);

    return;
  }

  // Live proxy to Python FastAPI service
  try {
    const aiCoreUrl = process.env.AI_CORE_URL || "http://localhost:8000";
    const response = await axios({
      method: "post",
      url: `${aiCoreUrl}/internal/analyze`,
      data: { source, type: type || "url" },
      responseType: "stream",
    });

    response.data.pipe(res);
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: "Failed to connect to AI Core service" })}\n\n`);
    res.end();
  }
};

export const getDocuments = async (req, res) => {
  const mockDocs = [
    {
      id: "doc_1",
      type: "PDF",
      title: "Q3-financial-report.pdf",
      meta: "41 chunks indexed • 12 pages",
      status: "Ready",
      isReady: true,
    },
    {
      id: "doc_2",
      type: "DOC",
      title: "employee-handbook.docx",
      meta: "18 chunks indexed • 6 pages",
      status: "Ready",
      isReady: true,
    },
    {
      id: "doc_3",
      type: "...",
      title: "product-specs.pdf",
      meta: "Uploading: 64%",
      status: "Processing",
      isReady: false,
    },
  ];

  res.status(200).json({ documents: mockDocs });
};