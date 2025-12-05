# Test Data

This directory contains various test scenarios for the TRMNL Running Dashboard plugin.

## Test Files

- `empty-week.json` - No runs logged, 0% progress
- `exceeding-goal.json` - Over 100% of weekly goal, 5 runs
- `edge-cases.json` - Long event name, long quote, single half-marathon run

## Usage

These files can be used to:
1. Validate your API response structure
2. Test the plugin rendering with different data states
3. Debug edge cases and boundary conditions

## Loading Test Data

Use `test-preview.html` to interactively test different scenarios, or manually load these JSON files to validate your API transformation logic matches the expected output format.
