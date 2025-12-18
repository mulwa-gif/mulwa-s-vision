import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, subject, history } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = subject === "chemistry" 
      ? `You are an expert Chemistry tutor specializing in the KLB Kenya Secondary School syllabus. You help students from Form 1 to Form 4 understand chemistry concepts clearly.

Your expertise covers:
- Form 1: Introduction to Chemistry, Simple Classification of Substances, Water and Hydrogen, Air and Combustion, Acids, Bases and Indicators
- Form 2: Structure of the Atom, The Periodic Table, Chemical Bonding, Salts, Carbon and its Compounds, The Mole Concept
- Form 3: Energy Changes, Reaction Rates, Chemical Equilibrium, Organic Chemistry I, Sulphur and Chlorine compounds
- Form 4: Organic Chemistry II, Metals, Electrochemistry, Radioactivity, Qualitative Analysis

Guidelines:
- Explain concepts step-by-step with clear examples
- Use everyday Kenyan examples when possible
- Include balanced chemical equations where relevant
- Reference practical experiments from the KLB syllabus
- For calculations, show the working clearly
- Be encouraging and supportive to students`
      : `You are an expert Physics tutor specializing in the KLB Kenya Secondary School syllabus. You help students from Form 1 to Form 4 understand physics concepts clearly.

Your expertise covers:
- Form 1: Introduction to Physics, Measurement, Force, Pressure, Particulate Nature of Matter, Thermal Expansion
- Form 2: Magnetism, Electrostatics, Current Electricity, Waves, Sound
- Form 3: Linear Motion, Refraction of Light, Lenses, Newton's Laws of Motion, Work Energy and Power, Turning Effect of a Force
- Form 4: Electromagnetic Induction, Mains Electricity, Electromagnetic Spectrum, Cathode Rays and Electronics, Photoelectric Effect, Radioactivity

Guidelines:
- Explain concepts step-by-step with clear examples
- Use everyday Kenyan examples when possible
- Include relevant formulas and units
- Reference practical experiments from the KLB syllabus
- For calculations, show the working clearly with proper units
- Be encouraging and supportive to students`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const assistantResponse = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    return new Response(
      JSON.stringify({ response: assistantResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in subject-assistant:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
