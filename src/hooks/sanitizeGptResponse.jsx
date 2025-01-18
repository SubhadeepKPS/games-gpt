const sanitizeGptResponse = (rawResponse) => {
  try {
    // console.log("Raw API Response:", rawResponse);
    // let sanitizedResponse = rawResponse;

    // Trim leading and trailing whitespace
    let sanitizedResponse = rawResponse.trim();

    // Remove hidden/invisible characters
    sanitizedResponse = sanitizedResponse.replace(/[\u200B-\u200D\uFEFF]/g, "");

    // Replace problematic characters
    sanitizedResponse = sanitizedResponse.replace(/\\n/g, "\n");

    // Fix misplaced commas or invalid formatting
    sanitizedResponse = sanitizedResponse.replace(/,(\s*[}\]])/g, "$1");

    // Match the valid JSON object and parse it
    const jsonMatch = sanitizedResponse.match(/\{.*\}/s); // Match the first JSON object
    if (!jsonMatch) throw new Error("No valid JSON found in the response.");

    const parsedJson = JSON.parse(jsonMatch[0]); // Parse the JSON
    console.log("Parsed JSON:", parsedJson);

    return parsedJson;
  } catch (error) {
    console.error("Error while parsing OpenAI response:", error.message);
    throw error;
  }
};

export default sanitizeGptResponse;
