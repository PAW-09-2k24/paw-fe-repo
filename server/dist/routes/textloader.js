"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const memory_1 = require("langchain/vectorstores/memory");
const openai_1 = require("@langchain/openai");
const chains_1 = require("langchain/chains");
const documents_1 = require("@langchain/core/documents");
const puppeteer_1 = __importDefault(require("puppeteer"));
const fetchPAWContext = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://paw-09.vercel.app/";
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto(url);
    const context = yield page.evaluate(() => {
        const tasks = Array.from(document.querySelectorAll(".task-item"));
        return tasks.map(task => {
            const titleElement = task.querySelector(".task-title");
            const title = titleElement ? titleElement.textContent : "No title available"; // Use textContent for null checks
            const status = task.classList.contains("done") ? "Done" : "To Do";
            return { title, status };
        });
    });
    yield browser.close();
    return context;
});
exports.default = (question = "") => __awaiter(void 0, void 0, void 0, function* () {
    const contextData = yield fetchPAWContext();
    const contextText = contextData
        .map(task => `Task: ${task.title} | Status: ${task.status}`)
        .join("\n");
    const vectorStore = yield memory_1.MemoryVectorStore.fromDocuments([new documents_1.Document({ pageContent: contextText })], new openai_1.OpenAIEmbeddings());
    const searchResponse = yield vectorStore.similaritySearch(question, 1);
    const textRes = searchResponse
        .map((item) => item === null || item === void 0 ? void 0 : item.pageContent)
        .join("\n");
    const llm = new openai_1.OpenAI({ modelName: "gpt-4" });
    const chain = (0, chains_1.loadQAStuffChain)(llm);
    const result = yield chain.invoke({
        input_documents: [new documents_1.Document({ pageContent: `${textRes}` })],
        question,
    });
    console.log(`\n\n Question: ${question}`);
    console.log(`\n\n Answer: ${result.text}`);
    return result.text;
});
