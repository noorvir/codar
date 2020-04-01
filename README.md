# wvv-hackathon

## Backend docs

### Encounters

An encounter has the following fields:
* `timestamp` unixtime timestamp of the moment the encounter occured (int)
* `minDistance` the smallest distance measured for the encounter in centimeters (int)
* `duration` the duration of the encounter in seconds (int)
* `pid` the pseudonymous identifier of the encoutered person
* `reportType` the reason for the encounter to be published. can be "SYMPTOMS_TESTED_POSITIVE" or "SYMPTOMS_TESTED_NEGATIVE" or "SYMPTOMS_NOT_TESTED".

Encounters are published by people who have reported that they are symptomatic.

*location is currently not supported, the app can still collect location data on the client side*

### HTTP Api

All api functions are a available under `https://europe-west1-chainbreaker-app.cloudfunctions.net/api`.
Authorization is done via an apiKey that should be included in every request using the `Authorization` HTTP header.  
Example: `Authorization: Bearer <apiKey>`

#### GET /encounters?pids=*pid1*,*pid2*,...
Fetch all encounters that contain one of the pids listed in the `pids` parameter.  
Request response example:
```
{
	encounters: [
			{
				timestamp: 2873642,
				minDistance: 100,
				duration: 121,
				pid: pid1
			},
			{
				timestamp: 2263745,
				minDistance: 50,
				duration: 43,
				pid: pid2
			},
			...
	]
}
```

*From a privacy perspective this is not good, since we could match the reqeust IP with the provided pids and provided pids automatically become correlated which makes it useless to have changing pids in the first place.*

#### POST /encounters
Post multiple encounters to the database.  
Request body example:
```
{
	encounters: [
		{
			timestamp: 2873642,
			minDistance: 100,
			duration: 121,
			pid: some_random_pid
		},
		...
	]
}
```

#### GET /encounters/exports?startAfter=*timestamp*
Fetch references to the exports created by the `exportEncounters` cronjob ordered by creation time starting after `startAfter`.

### Cronjobs

#### deleteEncounters
Every 24 hours a cronjob checks deletes encounters that are older than a month.  
*We could also anonymise the encounter by removing the pid instead of deleting it entirely.*

#### exportEncounters (maybe not needed)
Every 24 hours a cronjob exports all new encounters to google cloud storage. All exported encounters are public and can be used by clients to search for matching encounters by themselves.