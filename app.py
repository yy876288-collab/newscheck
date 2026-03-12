import os
import json
from flask import Flask, request, jsonify, render_template
from google import genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure Gemini API
google_api_key = os.getenv("GEMINI_API_KEY")
if google_api_key:
    client = genai.Client(api_key=google_api_key)
else:
    client = None
    print("WARNING: GEMINI_API_KEY not found in environment variables.")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400
        
    text_to_analyze = data['text']
    
    if not google_api_key:
        return jsonify({"error": "Gemini API key not configured on server"}), 500
         
    prompt = f"""
    You are an expert fact-checker. Analyze the following text and determine its factual accuracy.
    
    CRITICAL RULES for classification:
    - "True": The claim is factually accurate, supported by evidence, or standard verifiable reporting.
    - "False": The claim is demonstrably wrong, fabricated, or a known hoax.
    - "Misleading": The text contains some truth but twists facts, takes things out of context, or uses deceptive framing.
    - "Unverified": There is not enough public evidence to prove or disprove the claim, or it is a subjective opinion.
    
    You must output a JSON object with exactly two keys:
    1. "status": Must be exactly one of: "True", "False", "Misleading", or "Unverified".
    2. "explanation": A concise explanation (2-3 sentences max) of why it received this status. Point out specific parts of the text if applicable.
    
    Text to analyze:
    \"\"\"{text_to_analyze}\"\"\"
    
    Respond ONLY with the JSON:
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        response_text = response.text.strip()
        
        # Clean up possible markdown wrappers
        if response_text.startswith("```json"):
            response_text = response_text[7:-3].strip()
        elif response_text.startswith("```"):
            response_text = response_text[3:-3].strip()
            
        try:
            result = json.loads(response_text)
            
            # Validate structure
            if "status" not in result or "explanation" not in result:
                raise ValueError("Improper JSON format from model")
                
            return jsonify(result)
            
        except json.JSONDecodeError:
            return jsonify({
                "status": "Error",
                "explanation": "Failed to parse model response."
            }), 500
            
    except Exception as e:
        print(f"Error during API call: {e}")
        
        # Handle cases where safety filters block the response
        error_msg = str(e)
        if "safety" in error_msg.lower() or "blocked" in error_msg.lower():
            error_msg = "The input text was blocked by the AI safety filters."
            
        return jsonify({
            "status": "Error",
            "explanation": f"API Error: {error_msg}"
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
