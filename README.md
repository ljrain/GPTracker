# GP Smart Tracker

A comprehensive Gastroparesis and IBS-C tracker designed to help users monitor their daily meals and symptoms.

## Purpose

GP Smart Tracker provides an easy way for individuals with Gastroparesis or IBS-C to track their meals and symptoms throughout the day. By maintaining detailed records, users can identify patterns between food consumption and symptom flare-ups, helping them make informed dietary choices and provide valuable information to their healthcare providers.

## Main Functionality

- **Meal Tracking**: Log meals with details including title, photo, notes, and timestamp
- **Symptom Tracking**: Record symptoms with severity scores and notes to monitor health patterns
- **Data Export**: All data is stored in JSON format for easy sharing and analysis

## Data Structure

Data is stored in JSON format with the following structure:

### Meal Entry

| Field     | Type   | Description                        |
|-----------|--------|------------------------------------|
| Title     | String | Name or description of the meal    |
| Photo     | String | Path or URL to meal photo          |
| Notes     | String | Additional notes about the meal    |
| Date Time | String | Timestamp of when the meal was eaten |

### Symptom Entry

| Field         | Type    | Description                              |
|---------------|---------|------------------------------------------|
| Title         | String  | Name or description of the symptom       |
| Symptom Score | Integer | Severity rating from 1 (mild) to 5 (severe) |
| Notes         | String  | Additional notes about the symptom       |
| Date Time     | String  | Timestamp of when the symptom occurred   |

### Example JSON

```json
{
  "meals": [
    {
      "title": "Breakfast",
      "photo": "/images/breakfast.jpg",
      "notes": "Light meal with toast and scrambled eggs",
      "dateTime": "2024-01-15T08:30:00Z"
    }
  ],
  "symptoms": [
    {
      "title": "Nausea",
      "symptomScore": 3,
      "notes": "Mild nausea after breakfast",
      "dateTime": "2024-01-15T09:15:00Z"
    }
  ]
}
```
