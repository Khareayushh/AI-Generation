const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// // Converts local file information to a GoogleGenerativeAI.Part object.
// function fileToGenerativePart(imageData, mimeType) {
//   return {
//     inlineData: {
//       data: Buffer.from(imageData, 'binary').toString('base64'),
//       mimeType
//     },
//   };
// }

console.log("Hello world")

async function run({ prompt }) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  // console.log({prompt, imageData});
  // const prompt = prmt;

  // const imageParts = fileToGenerativePart(imageData, "image/jpeg");
  console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  console.log(text);
  return text;
}

module.exports = {
  run,
};
