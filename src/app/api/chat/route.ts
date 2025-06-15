import {openai} from '@ai-sdk/openai';
import {streamText} from "ai";

export async function POST (request: Request) {
    
    console.log("Using POST")
    const { messages} = await request.json();
    const result = await streamText({
        model: openai("gpt-4o"),
        messages,
    });
    return result.toDataStreamResponse();
}