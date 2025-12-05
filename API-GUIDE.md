# API Implementation Guide

## Overview

Your API should return JSON data that can be transformed into the merge variables expected by the TRMNL plugin.

## Endpoint Requirements

- **Method**: GET
- **Content-Type**: application/json
- **Authentication**: Optional (Bearer token or API key)

## Required Response Format

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
  "quote": "Your inspirational quote here"
}
```

## Data Transformation

Your API response will need to be transformed into TRMNL merge variables. You'll need to:

1. **Calculate progress_percentage**: `(weekly_miles / target_miles) * 100`
2. **Format week_label**: Generate from current date (e.g., "Week of Dec 1-7, 2025")
3. **Set has_runs**: `runs.length > 0`
4. **Format run dates**: Transform ISO dates to display format (e.g., "Mon, Dec 1")

### Example Transformation Logic (Python)

```python
import json
from datetime import datetime, timedelta

def transform_api_response(api_data):
    """Transform API response to TRMNL merge variables"""
    
    # Calculate progress percentage
    progress = (api_data['weekly_miles'] / api_data['target_miles']) * 100
    progress_percentage = min(100, round(progress))
    
    # Generate week label
    today = datetime.now()
    week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)
    week_label = f"Week of {week_start.strftime('%b %-d')}-{week_end.strftime('%-d, %Y')}"
    
    # Format runs
    formatted_runs = []
    for run in api_data.get('runs', []):
        run_date = datetime.fromisoformat(run['date'])
        formatted_runs.append({
            'date_formatted': run_date.strftime('%a, %b %-d'),
            'distance_miles': run['distance_miles'],
            'duration_minutes': run['duration_minutes'],
            'pace_per_mile': run['pace_per_mile']
        })
    
    return {
        'week_label': week_label,
        'weekly_miles': api_data['weekly_miles'],
        'target_miles': api_data['target_miles'],
        'progress_percentage': progress_percentage,
        'weeks_until_event': api_data['weeks_until_event'],
        'event_name': api_data['event_name'],
        'has_runs': len(formatted_runs) > 0,
        'runs': formatted_runs,
        'quote': api_data['quote']
    }
```

### Example Transformation Logic (Node.js)

```javascript
function transformApiResponse(apiData) {
  // Calculate progress percentage
  const progress = (apiData.weekly_miles / apiData.target_miles) * 100;
  const progressPercentage = Math.min(100, Math.round(progress));
  
  // Generate week label
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
  const weekLabel = `Week of ${weekStart.toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric' 
  })}-${weekEnd.toLocaleDateString('en-US', { 
    day: 'numeric', year: 'numeric' 
  })}`;
  
  // Format runs
  const formattedRuns = (apiData.runs || []).map(run => {
    const runDate = new Date(run.date);
    return {
      date_formatted: runDate.toLocaleDateString('en-US', { 
        weekday: 'short', month: 'short', day: 'numeric' 
      }),
      distance_miles: run.distance_miles,
      duration_minutes: run.duration_minutes,
      pace_per_mile: run.pace_per_mile
    };
  });
  
  return {
    week_label: weekLabel,
    weekly_miles: apiData.weekly_miles,
    target_miles: apiData.target_miles,
    progress_percentage: progressPercentage,
    weeks_until_event: apiData.weeks_until_event,
    event_name: apiData.event_name,
    has_runs: formattedRuns.length > 0,
    runs: formattedRuns,
    quote: apiData.quote
  };
}
```

## Quote Rotation

To rotate quotes, you can either:

1. **Random selection**: Your API randomly selects from the `quotes.json` file on each request
2. **Daily rotation**: Use a deterministic algorithm based on the current date
3. **Sequential**: Track and increment through quotes in order

### Example Quote Selection (Python)

```python
import json
import random
from datetime import datetime

def get_daily_quote():
    """Get a quote that changes daily"""
    with open('quotes.json') as f:
        quotes = json.load(f)
    
    # Use day of year as seed for consistent daily quote
    day_of_year = datetime.now().timetuple().tm_yday
    random.seed(day_of_year)
    
    return random.choice(quotes)
```

## Testing

Use the provided `mock-api.json` as a reference for the expected data structure. You can test your transformation logic against `sample-merge-variables.json` to ensure correct output.

## Integration with TRMNL

Once your API is ready:

1. Deploy your API endpoint
2. Configure the endpoint URL in TRMNL plugin settings
3. Add API key if authentication is required
4. TRMNL will fetch and transform your data automatically
