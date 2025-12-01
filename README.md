# GPTracker
Gastroparesis Tracker

## Overview
GPTracker is a tool for tracking daily food consumption and symptoms to help manage gastroparesis.

## Data Structure

The daily log data structure is defined in JSON format. See the [JSON schema](schemas/daily-log.schema.json) for the full specification.

### Daily Log Structure

Each daily log entry contains:

- **date**: The date of the log entry (YYYY-MM-DD format)
- **foods**: An array of food items consumed
- **symptoms**: An array of symptoms experienced
- **notes**: Optional general notes for the day

### Food Entry Fields

| Field | Required | Description |
|-------|----------|-------------|
| name | Yes | Name of the food item |
| time | Yes | Time consumed (HH:MM) |
| amount | No | Quantity or portion size |
| category | No | Food texture: solid, liquid, soft, or pureed |
| notes | No | Additional notes |

### Symptom Entry Fields

| Field | Required | Description |
|-------|----------|-------------|
| name | Yes | Name or type of symptom |
| severity | Yes | Severity on a scale of 1-10 |
| time | No | Time the symptom occurred (HH:MM) |
| duration | No | How long the symptom lasted |
| notes | No | Additional notes |

### Example

See [examples/daily-log-example.json](examples/daily-log-example.json) for a complete example of a daily log entry.
