#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the env.js template
const envFilePath = path.join(__dirname, 'src/assets/env.js');
let content = fs.readFileSync(envFilePath, 'utf8');

// Replace variables with actual environment variables
content = content.replace('${HUGGINGFACE_API_KEY}', process.env.HUGGINGFACE_API_KEY || '');

// Write the file back
fs.writeFileSync(envFilePath, content);

console.log('Environment variables injected into env.js!');
