/**
 * Validation script for TRMNL Running Dashboard
 * Run with: node validate.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Validating TRMNL Running Dashboard Plugin...\n');

let errors = 0;
let warnings = 0;

// Check required files exist
const requiredFiles = [
    'plugin.html',
    'plugin.json',
    'mock-api.json',
    'sample-merge-variables.json',
    'quotes.json',
    'README.md',
    'API-GUIDE.md'
];

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ✅ ${file}`);
    } else {
        console.log(`  ❌ ${file} - MISSING`);
        errors++;
    }
});

// Validate plugin.json
console.log('\n📋 Validating plugin.json...');
try {
    const pluginConfig = JSON.parse(fs.readFileSync('plugin.json', 'utf8'));
    
    const requiredFields = ['plugin_uuid', 'name', 'description', 'version', 'markup_strategy'];
    requiredFields.forEach(field => {
        if (pluginConfig[field]) {
            console.log(`  ✅ ${field}: ${pluginConfig[field]}`);
        } else {
            console.log(`  ❌ ${field} - MISSING`);
            errors++;
        }
    });
    
    if (pluginConfig.markup_strategy !== 'handlebars') {
        console.log(`  ⚠️  markup_strategy should be 'handlebars'`);
        warnings++;
    }
    
    if (pluginConfig.merge_variables && pluginConfig.merge_variables.length > 0) {
        console.log(`  ✅ ${pluginConfig.merge_variables.length} merge variables defined`);
    } else {
        console.log(`  ❌ No merge variables defined`);
        errors++;
    }
} catch (e) {
    console.log(`  ❌ Error parsing plugin.json: ${e.message}`);
    errors++;
}

// Validate sample merge variables
console.log('\n📊 Validating sample-merge-variables.json...');
try {
    const sampleData = JSON.parse(fs.readFileSync('sample-merge-variables.json', 'utf8'));
    const pluginConfig = JSON.parse(fs.readFileSync('plugin.json', 'utf8'));
    
    const requiredVars = pluginConfig.merge_variables
        .filter(v => v.required)
        .map(v => v.name);
    
    requiredVars.forEach(varName => {
        if (sampleData.hasOwnProperty(varName)) {
            console.log(`  ✅ ${varName}: ${JSON.stringify(sampleData[varName]).substring(0, 50)}...`);
        } else {
            console.log(`  ❌ ${varName} - MISSING`);
            errors++;
        }
    });
} catch (e) {
    console.log(`  ❌ Error validating sample data: ${e.message}`);
    errors++;
}

// Validate quotes.json
console.log('\n💬 Validating quotes.json...');
try {
    const quotes = JSON.parse(fs.readFileSync('quotes.json', 'utf8'));
    
    if (Array.isArray(quotes)) {
        console.log(`  ✅ ${quotes.length} quotes loaded`);
        
        if (quotes.length < 10) {
            console.log(`  ⚠️  Consider adding more quotes (current: ${quotes.length})`);
            warnings++;
        }
        
        quotes.forEach((quote, i) => {
            if (typeof quote !== 'string' || quote.length === 0) {
                console.log(`  ❌ Quote ${i} is invalid`);
                errors++;
            }
        });
    } else {
        console.log(`  ❌ quotes.json should be an array`);
        errors++;
    }
} catch (e) {
    console.log(`  ❌ Error parsing quotes.json: ${e.message}`);
    errors++;
}

// Check plugin.html for required merge variables
console.log('\n🎨 Validating plugin.html...');
try {
    const html = fs.readFileSync('plugin.html', 'utf8');
    const pluginConfig = JSON.parse(fs.readFileSync('plugin.json', 'utf8'));
    
    const requiredVars = pluginConfig.merge_variables.map(v => v.name);
    
    requiredVars.forEach(varName => {
        if (html.includes(`{{${varName}}}`)) {
            console.log(`  ✅ {{${varName}}} found in template`);
        } else if (varName === 'runs' && html.includes('{{#each runs}}')) {
            console.log(`  ✅ {{#each ${varName}}} found in template`);
        } else if (varName === 'has_runs' && html.includes('{{#if has_runs}}')) {
            console.log(`  ✅ {{#if ${varName}}} found in template`);
        } else {
            console.log(`  ⚠️  {{${varName}}} not found in template`);
            warnings++;
        }
    });
} catch (e) {
    console.log(`  ❌ Error validating plugin.html: ${e.message}`);
    errors++;
}

// Validate test data
console.log('\n🧪 Validating test data...');
const testFiles = fs.readdirSync('test-data').filter(f => f.endsWith('.json'));
testFiles.forEach(file => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join('test-data', file), 'utf8'));
        console.log(`  ✅ ${file} - valid JSON`);
    } catch (e) {
        console.log(`  ❌ ${file} - invalid JSON: ${e.message}`);
        errors++;
    }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION SUMMARY');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
    console.log('✨ All checks passed! Plugin is ready.');
} else {
    if (errors > 0) {
        console.log(`❌ ${errors} error(s) found`);
    }
    if (warnings > 0) {
        console.log(`⚠️  ${warnings} warning(s) found`);
    }
}

process.exit(errors > 0 ? 1 : 0);
