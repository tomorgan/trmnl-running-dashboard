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
    },
    {
      "date": "2025-12-03",
      "distance_miles": 6.1,
      "duration_minutes": 52,
      "pace_per_mile": "8:31"
    },
    {
      "date": "2025-12-05",
      "distance_miles": 4.2,
      "duration_minutes": 36,
      "pace_per_mile": "8:34"
    }
  ],
  "quote": "The miracle isn't that I finished. The miracle is that I had the courage to start."
}
```

## Setup

1. Clone this repository
2. Configure your API endpoint in the TRMNL plugin settings
3. Deploy the `index.html` file to your TRMNL device

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
