const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(path).toString("base64"),
      mimeType,
    },
  };
}

async function run({ image, prmt }) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = { prmt };

  const imageParts = [fileToGenerativePart({ image }, "image/jpeg")];

  const result = await model.generateContent([...imageParts, prompt]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

module.exports = {
    run,
}