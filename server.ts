import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", name: "생기부 365 API", time: new Date().toISOString() });
  });

  // API Route: AI Topic Recommendation Generator
  app.post("/api/ai/topic-generator", async (req, res) => {
    try {
      const { grade, major, subject, keywords } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
당신은 대한민국 최고 명문대 입시 컨설턴트입니다. 
다음 조건에 따라 고등학생을 위한 맞춤형 생기부 탐구주제 3개를 JSON 배열 형식으로 추천해주세요.

- 학년: ${grade || "전체"}
- 희망 계열/전공: ${major || "자율"}
- 대상 과목: ${subject || "자율"}
- 관심 키워드: ${keywords || "최신 입시 트렌드"}

응답은 오직 JSON 형식이어야 합니다. Markdown 코드 블록 없이 순수 JSON만 반환해 주세요.
[
  {
    "topicTitle": "주제 제목",
    "motivation": "탐구 동기 및 배경",
    "explorationDetails": "구체적 탐구 내용 및 서적/논문 연계 방향",
    "deepeningTip": "교과 개념 연계 심화 팁",
    "linkedCompetency": "학업역량 또는 진로역량"
  }
]
`;
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        const responseText = response.text || "";
        try {
          const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleanedText);
          return res.json({ success: true, topics: parsed, isAiGenerated: true });
        } catch {
          // If JSON parse fails, fallback handled below
        }
      }

      // Fallback if no Gemini key or parse error
      return res.json({
        success: true,
        isAiGenerated: false,
        message: "Gemini API 키가 설정되지 않아 데이터베이스 매칭 결과로 전환되었습니다.",
      });
    } catch (err: any) {
      console.error("AI Topic Generator Error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API Route: AI Setuk Draft Helper
  app.post("/api/ai/setuk-drafter", async (req, res) => {
    try {
      const { subject, grade, activityDetails, competencyTarget } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
당신은 고등학교 선생님 및 입시 컨설턴트입니다. 학생이 입력한 활동 내용을 바탕으로 생활기록부 '세부능력 및 특기사항(세특)' 모범 문장 1문단을 작성해 주세요.

조건:
- 과목: ${subject}
- 학년: ${grade}
- 핵심 강조 역량: ${competencyTarget || "학업역량 및 진로역량"}
- 학생의 활동 요약: ${activityDetails}

작성 규칙:
1. ~함, ~임, ~을 보여줌, ~으로 평가됨 등 생활기록부 공식 서술형 종결어미 사용.
2. 단순히 참가가 아닌 '주제선정 이유 - 탐구과정 - 교과개념 적용 - 배운점 및 성장' 흐름이 드러날 것.
3. 분량: 약 300~500자 내외.
4. 개인정보나 과장된 표현 없이 평가관이 신뢰할 수 있는 객관적 서술 style.
`;
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        return res.json({ success: true, draftText: response.text, isAiGenerated: true });
      }

      return res.json({
        success: true,
        isAiGenerated: false,
        draftText: `[가이드 예시문] ${subject} 수업 시간에 ${activityDetails} 관련 주제를 바탕으로 깊이 있는 자료 조사를 수행함. 교과서에서 배운 이론적 배경을 토대로 관련 최신 사례를 분석하고, 보고서를 작성하여 학급 동료들에게 명확하게 발표함. 탐구 과정에서 주도적인 질문과 꾸준한 학업 열의를 보여줌.`,
      });
    } catch (err: any) {
      console.error("AI Setuk Drafter Error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Serve Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[생기부 365] Server running on http://localhost:${PORT}`);
  });
}

startServer();
