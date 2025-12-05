# Deployment Checklist

## Pre-Deployment

- [ ] All files validated with `node validate.js`
- [ ] Test preview works in browser (`test-preview.html`)
- [ ] All test scenarios pass (normal, exceeding, empty, single)
- [ ] Visual design looks good on e-ink display
- [ ] Quotes file has sufficient variety (20+ quotes)

## API Implementation

- [ ] API endpoint created and deployed
- [ ] API returns correct JSON structure (see `mock-api.json`)
- [ ] Data transformation logic implemented (see `API-GUIDE.md`)
- [ ] Quote rotation implemented
- [ ] Week label generation working
- [ ] Progress percentage calculation correct
- [ ] Run date formatting implemented
- [ ] API endpoint is publicly accessible
- [ ] HTTPS enabled (required for TRMNL)
- [ ] CORS headers configured if needed

## TRMNL Configuration

- [ ] Plugin uploaded to TRMNL
- [ ] API endpoint URL configured
- [ ] API key added (if required)
- [ ] Refresh interval set (default: 3600s / 1 hour)
- [ ] Initial render successful
- [ ] Data updates correctly

## Testing on Device

- [ ] Display renders correctly on e-ink
- [ ] Text is readable (good contrast)
- [ ] Progress bar displays properly
- [ ] Empty state shows correctly
- [ ] Quotes rotate as expected
- [ ] Data refreshes on schedule
- [ ] No layout issues or overflow

## Documentation

- [ ] README.md updated with any specific setup notes
- [ ] API endpoint documented
- [ ] Any custom configuration noted

## Post-Deployment

- [ ] Monitor first few data refreshes
- [ ] Verify quote rotation works
- [ ] Check for any rendering issues
- [ ] Adjust styling if needed for e-ink optimization

## Optional Enhancements

- [ ] Add support for kilometers (in addition to miles)
- [ ] Include average pace for the week
- [ ] Show longest run of the week
- [ ] Add year-to-date mileage
- [ ] Include streak counter (consecutive days/weeks)
- [ ] Weather integration for recent runs
- [ ] Elevation gain tracking
- [ ] Personal records tracking

## Troubleshooting

If the plugin doesn't display correctly:

1. Check TRMNL logs for API errors
2. Validate API response with `validate.js`
3. Test with `sample-merge-variables.json`
4. Review `TESTING.md` for debugging steps
5. Check browser console for JavaScript errors

## Support

- GitHub Issues: https://github.com/tomorgan/trmnl-running-dashboard/issues
- TRMNL Documentation: https://usetrmnl.com/framework
