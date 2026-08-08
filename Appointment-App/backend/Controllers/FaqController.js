const axios = require("axios");

const askFaq = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || question.trim() === "") {
            return res.status(400).json({ error: "Question is required" });
        }

        const response = await axios.post("http://127.0.0.1:8000/ask", {
            question: question
        });

        return res.status(200).json({ answer: response.data.answer });

    } catch (error) {
        console.error("Error calling FAQ AI service:", error.message);
        return res.status(500).json({ error: "Failed to get answer from FAQ service" });
    }
};

module.exports = { askFaq };