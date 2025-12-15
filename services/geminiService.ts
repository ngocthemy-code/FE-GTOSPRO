import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client safely. 
// In a real app, you might want to handle the missing key more gracefully in the UI.
const ai = new GoogleGenAI({ apiKey });

export const generateResponse = async (prompt: string, context?: string): Promise<string> => {
  try {
    const fullPrompt = `
      Bạn là một trợ lý AI chuyên nghiệp cho hệ thống GTOS (Hệ thống quản lý khai thác hàng rời cảng biển).
      
      Ngữ cảnh dữ liệu hiện tại (nếu có): ${context || 'Không có dữ liệu cụ thể.'}
      
      Câu hỏi của người dùng: ${prompt}
      
      Hãy trả lời ngắn gọn, chuyên nghiệp bằng tiếng Việt. Nếu liên quan đến dữ liệu, hãy phân tích dữ liệu đó.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    return response.text || "Xin lỗi, tôi không thể xử lý yêu cầu lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với trợ lý ảo. Vui lòng kiểm tra API Key.";
  }
};