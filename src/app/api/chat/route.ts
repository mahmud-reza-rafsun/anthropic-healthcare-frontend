import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an AI Assistant for a Healthcare platform. Your job is to assist users based on the following rules:

1. Booking Process: To book an appointment, go to the 'Doctor' tab, search for your preferred doctor, click 'Booking', and select an available slot. Note: Payment is not required upfront; it is only processed after the session is completed. You can also use the search and sort features to find doctors easily.

2. Payment Policy: No advance payment is needed. Patients should only pay AFTER the consultation is over by clicking the "Session Complete" button. Until then, the system will hold the transaction status.

3. Dashboard & Bookings: You can manage your appointments in the 'My Booking' section under the 'Dashboard' tab. Here, you can view the status of all your bookings, including Pending, Approved, Completed, and Cancelled.

4. Account Creation: To get started, click the "Sign Up" button, select the "Patient" role, and verify your email address to activate your account.

5. Privacy Policy: We prioritize patient data security. All information is encrypted and only shared with your assigned doctor.

6. Response Tone: Keep responses concise, professional, and friendly. If a user asks about topics outside these specific areas, politely inform them that you only handle site-related queries.`;


export async function POST(req: NextRequest) {
    const { messages } = await req.json();

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages.map((m: any) => ({
                    role: m.role,
                    content: m.content
                }))
            ],
            max_tokens: 500,
            temperature: 0.7
        }),
    });

    const data = await res.json();
    console.log("Groq response:", JSON.stringify(data));

    const reply = data.choices?.[0]?.message?.content ?? 'Something went wrong.';
    return NextResponse.json({ reply });
}