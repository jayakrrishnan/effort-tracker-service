# effort-tracker-service
node service

## health
GET: http://localhost:8080/api/status

## register
POST: http://localhost:8080/api/user/register 
sample req: 
{
"userId":"U60907",
"email":"U60907@u-cheat.com",
"role":1,
"password":"jay"
}

## login
POST: http://localhost:8080/api/user/login
sample req:
{
"email":"U60907",
"password":"jay"
}

## insert effort
POST: http://localhost:8080/api/tracker/
sample req:
{
"userId":"U60907",
"effortDate":"2020-09-23",
"projectId":1,
"projectTaskHr":7.5,
"projectMeetingHr":0.75,
"trainingHr":0,
"vdiUnavailHr":0,
"leaveHr":0,
"otherHr":0,
"wfoHr":0,
"wfhHr":8,
"reworkHr":0,
"adhocHr":0,
"rsnForNotWorking":"",
"commentForNotWorking":"",
"rsnForWFH":"BCP",
"comments":"enjoyy more"
}

## fetch effort
POST: http://localhost:8080/api/tracker/fetch
sample req:
{
"userId":"U60907",
"effortDate":"2020-09-22",
"projectId":1
}

## update effort
PUT: http://localhost:8080/api/tracker/
sample req:
{
"userId":"U60907",
"effortDate":"2020-09-23",
"projectId":1,
"projectTaskHr":7.25,
"projectMeetingHr":0.75,
"trainingHr":0,
"vdiUnavailHr":0,
"leaveHr":0,
"otherHr":0,
"wfoHr":0,
"wfhHr":8,
"reworkHr":0,
"adhocHr":0,
"rsnForNotWorking":"",
"commentForNotWorking":"",
"rsnForWFH":"BCP",
"comments":"enjoyy more"
}

## delete effort
DELETE: http://localhost:8080/api/tracker?userId=U60907&effortDate=2020-09-22&projectId=2
