# Testing Guide

## Local Testing

### Option 1: Test Preview Tool
Open `test-preview.html` in your browser for an interactive testing environment.

**Features:**
- Switch between different scenarios (normal, exceeding goal, no runs, single run)
- Adjust values in real-time
- Export test data as JSON
- Preview exactly how the plugin will render

**Test Scenarios:**
1. **Normal Week** - Typical running week with 3 runs, 62% progress
2. **Exceeding Goal** - 5 runs, over 100% of weekly target
3. **No Runs** - Empty state when no runs are logged
4. **Single Run** - Minimal data with just one run

### Option 2: Manual Testing
1. Open `index.html` in a browser for the static preview
2. Modify the mock data in the `<script>` section to test different states

## Test Cases

### ✅ Visual Tests

- [ ] Progress bar correctly shows percentage (0-100%)
- [ ] Progress bar handles >100% gracefully
- [ ] Empty state displays when no runs
- [ ] Runs table formats correctly with 1-5 runs
- [ ] Long event names wrap properly
- [ ] Quotes display without overflow
- [ ] All text is readable on e-ink (high contrast)

### ✅ Data Tests

- [ ] Weekly miles display with 1 decimal place
- [ ] Target miles display correctly
- [ ] Progress percentage calculates: `(weekly_miles / target_miles) * 100`
- [ ] Progress caps at 100% for display
- [ ] Event countdown shows correct number
- [ ] Runs array handles 0 items (empty state)
- [ ] Runs array handles 1-10 items
- [ ] Date formatting is consistent

### ✅ Edge Cases

- [ ] Zero miles run (0/25)
- [ ] Exactly meeting goal (25/25)
- [ ] Exceeding goal (30/25)
- [ ] Very long event name (>30 characters)
- [ ] Very long quote (>100 characters)
- [ ] Single run
- [ ] Many runs (7+)
- [ ] Event in 1 week
- [ ] Event in 52+ weeks

## API Response Validation

Test your API implementation against these samples:

### Valid Response
```json
{
  "weekly_miles": 15.5,
  "target_miles": 25.0,
  "weeks_until_event": 8,
  "event_name": "London Marathon 2026",
  "runs": [
    {
      "date": "2025-12-01",
      "distance_miles": 5.2,
      "duration_minutes": 45,
      "pace_per_mile": "8:39"
    }
  ],
  "quote": "The miracle isn't that I finished. The miracle is that I had the courage to start."
}
```

### Required Fields
All fields are required except an empty `runs` array is acceptable.

### Field Validation
- `weekly_miles`: Number >= 0
- `target_miles`: Number > 0
- `weeks_until_event`: Integer >= 0
- `event_name`: Non-empty string
- `runs`: Array (can be empty)
- `runs[].date`: ISO date string (YYYY-MM-DD)
- `runs[].distance_miles`: Number > 0
- `runs[].duration_minutes`: Integer > 0
- `runs[].pace_per_mile`: String in format "M:SS"
- `quote`: Non-empty string

## Browser Testing

Test in multiple browsers to ensure compatibility:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if on Mac)

## TRMNL Device Testing

Once deployed to TRMNL:
1. Configure your API endpoint in plugin settings
2. Verify data refreshes every hour (3600s)
3. Check e-ink rendering quality
4. Confirm quote rotation works
5. Test with real running data

## Debugging

If the plugin doesn't render correctly:

1. **Check merge variables** - Ensure all required variables are present
2. **Validate JSON** - Use a JSON validator on your API response
3. **Check console** - Look for JavaScript errors in browser console
4. **Test handlebars** - Verify `{{variable}}` syntax is correct
5. **Review API-GUIDE.md** - Ensure transformation logic is implemented

## Performance

- Plugin should render in < 1 second
- API response should be < 50KB
- Refresh interval: 3600s (1 hour)
