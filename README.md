# direction-calculation-cli
Calculate distances and travel durations between multiple origin and destination locations which uses the Google Maps Directions API

***To use it you need to create a .env file, which contains a valid Google Maps Directions API_KEY***

### Parameters:
<code>origins</code> - | (pipe) separated addresses

<code>destinations</code> - | (pipe) separated addresses

<code>mode</code> - travel method ['transit', 'driving', 'walking', 'bicycling']

### Example call:

<code>node app.js --origins='1111 Budapest|1214 Budapest' --destinations='1088 Budapest|1244 Budapest' --mode='driving'</code>

### Example result:

Distance is measured in meters, duration is measured in seconds

```json
[
    {
        "origin": "Budapest, 1111 Hungary",
        "destination": "Budapest, 1088 Hungary",
        "calculations": {
            "totalDistance": 7000,
            "totalDuration": 1576,
            "count": 2,
            "averageDistance": 3186,
            "averageDuration": 786
        },
        "details": [
            {
                "distance": {
                    "text": "3.2 km",
                    "value": 3186
                },
                "duration": {
                    "text": "13 mins",
                    "value": 786
                },
                "status": "OK"
            },
            {
                "distance": {
                    "text": "3.8 km",
                    "value": 3814
                },
                "duration": {
                    "text": "13 mins",
                    "value": 790
                },
                "status": "OK"
            }
        ]
    },
    {
        "origin": "Budapest, 1214 Hungary",
        "destination": "Budapest, Hungary",
        "calculations": {
            "totalDistance": 26441,
            "totalDuration": 3244,
            "count": 2,
            "averageDistance": 12327,
            "averageDuration": 1552
        },
        "details": [
            {
                "distance": {
                    "text": "12.3 km",
                    "value": 12327
                },
                "duration": {
                    "text": "26 mins",
                    "value": 1552
                },
                "status": "OK"
            },
            {
                "distance": {
                    "text": "14.1 km",
                    "value": 14114
                },
                "duration": {
                    "text": "28 mins",
                    "value": 1692
                },
                "status": "OK"
            }
        ]
    }
]
```
