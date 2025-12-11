# TRMNL Running Dashboard

A custom plugin for TRMNL e-ink displays that shows your weekly running progress, upcoming events, and recent runs.

## Features

- **Weekly Progress**: Visual progress bar showing miles run vs. target
- **Event Countdown**: Weeks until your next running event
- **Recent Runs**: List of runs completed this week
- **Inspiration**: Random running quotes to keep you motivated

## API Contract

The plugin expects a JSON endpoint that returns the following structure:

```json
{
  "week_label": "Week of Dec 1-7, 2025",
  "weekly_miles": 15.5,
  "target_miles": 25.0,
  "progress_percentage": 62,
  "weeks_until_event": 8,
  "event_name": "London Marathon 2026",
  "has_weekly_plan": true,
  "weekly_plan": [
    {
      "day": "Monday",
      "day_short": "Mon",
      "workout": "Rest day",
      "completed": false
    },
    {
      "day": "Tuesday",
      "day_short": "Tue",
      "workout": "Easy 5 miles",
      "completed": true,
      "distance_miles": 5.2,
      "duration_minutes": 45,
      "pace_per_mile": "8:39",
      "weather": {
        "temp_morning": 8,
        "precipitation_prob": 20
      }
    },
    {
      "day": "Wednesday",
      "day_short": "Wed",
      "workout": "Tempo 6 miles",
      "completed": true,
      "distance_miles": 6.1,
      "duration_minutes": 52,
      "pace_per_mile": "8:31",
      "weather": {
        "temp_morning": 10,
        "precipitation_prob": 0
      }
    }
  ],
  "quote": "The miracle isn't that I finished. The miracle is that I had the courage to start."
}
```

### Field Descriptions

- **week_label**: Display label for the current week (e.g., "Week of Dec 1-7, 2025")
- **weekly_miles**: Total miles run this week
- **target_miles**: Target miles for the week
- **progress_percentage**: Percentage of weekly goal achieved (0-100)
- **weeks_until_event**: Number of weeks until next event
- **event_name**: Name of your target running event
- **has_weekly_plan**: Boolean indicating if weekly_plan array has items
- **weekly_plan**: Array of 7 days (Monday-Sunday) with:
  - **day**: Full day name
  - **day_short**: Abbreviated day name (Mon, Tue, etc.)
  - **workout**: Description of planned workout
  - **completed**: Boolean indicating if workout was completed
  - **distance_miles**: (Optional) Actual distance if completed
  - **duration_minutes**: (Optional) Actual duration if completed
  - **pace_per_mile**: (Optional) Actual pace if completed (format: "8:30")
  - **weather**: (Optional) Weather forecast object with:
    - **temp_morning**: Morning temperature in Celsius
    - **precipitation_prob**: Precipitation probability (0-100)
- **quote**: Inspirational running quote

## Quick Start

1. **Clone this repository**
   ```bash
   git clone https://github.com/tomorgan/trmnl-running-dashboard.git
   cd trmnl-running-dashboard
   ```

2. **Test locally**
   ```bash
   # Open test preview in browser
   open test-preview.html
   
   # Validate plugin structure
   node validate.js
   ```

3. **Implement your API** (see `API-GUIDE.md`)
   - Create endpoint that returns running data
   - Transform to TRMNL merge variable format
   - Deploy to a public HTTPS endpoint

4. **Deploy to TRMNL**
   - Upload `plugin.html` and `plugin.json`
   - Configure your API endpoint URL
   - Add API key if required

## Files

- `plugin.html` - TRMNL plugin template (production)
- `plugin.json` - Plugin configuration and metadata
- `sample-merge-variables.json` - Example merge variables for testing
- `mock-api.json` - Sample API response structure
- `quotes.json` - Collection of 20+ inspirational running quotes
- `API-GUIDE.md` - Complete guide for implementing your API
- `index.html` - Standalone preview version (for local testing)

## TRMNL Framework

This plugin is built using the [TRMNL Framework](https://usetrmnl.com/framework) for e-ink display optimization.

## Development & Testing

1. Open `index.html` in a browser for a quick preview
2. Review `API-GUIDE.md` for implementing your data source
3. Test with `sample-merge-variables.json` structure
4. Deploy `plugin.html` and `plugin.json` to TRMNL

## License

MIT
