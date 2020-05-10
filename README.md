## Steps
- `clone repo`
- `npm install`
- `node startup.js`

## Usage
use below curl for getting statistics according to filter

curl --location --request GET 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "filter": [
        {
            "key": "Location",
            "value": "value 3"
        },
        {
            "key": "Designation",
            "value": "value 8"
        }
    ],
    "analysis":["mean","median","variance","mode","range"]
}'

filter should be an array of objects having 2 properties key and value
analysis must be an array and must be these only mean,median,variance,mode,range

find db schema in dbDump folder


├── README.md <br />
├── config <br />
│   └── default.json <br />
├── database <br />
│   ├── dbProperties.js <br />
│   ├── index.js <br />
│   └── mongoLib.js <br />
├── dbDump <br />
│   ├── Questions.bson <br />
│   ├── Questions.metadata.json <br />
│   ├── User.bson <br />
│   └── User.metadata.json <br />
├── logging <br />
│   └── logging.js <br />
├── middlewares <br />
│   └── index.js <br />
├── modules <br />
│   ├── anlytics <br />
│   │   ├── controllers <br />
│   │   │   └── controllers.js <br />
│   │   ├── index.js <br />
│   │   ├── services <br />
│   │   │   └── services.js <br />
│   │   └── validators <br />
│   │       └── validators.js <br />
│   └── index.js <br />
├── package-lock.json <br />
├── package.json <br />
├── properties <br />
│   ├── constants.js <br />
│   └── envProperties.js <br />
├── response <br />
│   └── responses.js <br />
├── services <br />
│   ├── httpService.js <br />
│   └── startupService.js <br />
├── startup.js <br />
├── utilities <br />
│   ├── analyticsUtility.js <br />
│   └── dateUtility.js <br />
└── validators <br />
    └── index.js <br />