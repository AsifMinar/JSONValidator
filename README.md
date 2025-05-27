# JSONValidator

JSONValidator is a JavaScript tool to validate JSON syntax, supporting objects, arrays, strings, numbers, booleans, and null values. It parses JSON text using lexical and syntactic analysis, outputting "Valid JSON" (exit code 0) or "Invalid JSON" with an error message (exit code 1). Built for beginners, it’s ideal for learning parsing techniques and handles ASCII-based JSON with robust error checking. Perfect for validating JSON against the JSON_checker test suite.

## Features
- Validates JSON objects and arrays
- Supports strings, numbers, booleans, and null
- Provides clear error messages for invalid JSON
- Beginner-friendly command-line interface

## Requirements
- Node.js

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/AsifMinar/JSONValidator.git
   ```
2. Ensure `json_parser.js` is in the project directory.

## Usage
Run the program with Node.js:
```bash
node json_parser.js
```
Edit `json_parser.js` to test different JSON inputs:
```javascript
checkJSON('{"key": "value"}'); // Valid JSON
checkJSON('{"key": 123, "array": [true, null]}'); // Valid JSON
checkJSON('{"key": bad}'); // Invalid JSON
```

## Testing
- Modify test cases in `json_parser.js` with your JSON strings.
- Run `node json_parser.js` to see results.
- Use the [JSON_checker suite](http://www.json.org/JSON_checker/test.zip) for advanced testing.

## Limitations
- Supports ASCII JSON only (no escaped characters like `\"`).
- Focused on validation, not data extraction.
