import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: NextResponse) {
  try {
    // Log the incoming request body for debugging
    console.log("Incoming Request:", req);

    // Validate request payload
    const body = await req.json();
    if (!body.messages) {
      console.error("Invalid Request: messages field missing in payload");
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Make API call to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: body.messages,
    });

    // Log the response from OpenAI for debugging
    console.log("OpenAI Response:", completion.choices[0].message);

    const theResponse = completion.choices[0].message;
    return NextResponse.json({ output: theResponse }, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error encountered:", error);

    // Send a generic error message to the client
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
