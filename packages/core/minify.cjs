#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Minification options
const terserOptions = {
  compress: {
    dead_code: true,
    drop_console: true,
    drop_debugger: true,
    keep_classnames: true,
    keep_fnames: true,
    passes: 2
  },
  mangle: {
    reserved: ['beautify', 'round', 'formatNumber', 'formatCurrency', 'abbreviateNumber', 'applyMask'],
    properties: false
  },
  output: {
    comments: false
  }
};

// Walk directory recursively to find JS files
async function walkDir(dir) {
  const files = await readdir(dir);
  const result = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);
    
    if (stats.isDirectory()) {
      const subDirFiles = await walkDir(filePath);
      result.push(...subDirFiles);
    } else if (file.endsWith('.js')) {
      result.push(filePath);
    }
  }
  
  return result;
}

// Minify a single file
async function minifyFile(filePath) {
  console.log(`Minifying: ${filePath}`);
  const code = await readFile(filePath, 'utf8');
  
  try {
    const output = await minify(code, terserOptions);
    await writeFile(filePath, output.code);
    const originalSize = code.length;
    const minifiedSize = output.code.length;
    const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    console.log(`Reduced ${filePath} by ${savings}% (${originalSize} → ${minifiedSize} bytes)`);
  } catch (error) {
    console.error(`Error minifying ${filePath}: ${error.message}`);
  }
}

// Main function
async function main() {
  try {
    // Process the dist directory
    const distDir = path.join(__dirname, 'dist');
    console.log(`Looking for JS files in: ${distDir}`);
    
    const jsFiles = await walkDir(distDir);
    console.log(`Found ${jsFiles.length} JS files to minify`);
    
    for (const file of jsFiles) {
      await minifyFile(file);
    }
    
    console.log('Minification complete!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
