
## API
###Real time data (RTD)
1. [get] /rtd/get/telemetry/:id
2. [get] /rtd/get/telecommand/:id
3. [get] /rtd/test/connect
4. [get] /rtd/test/disconnect

###Ground track display (GTD)
1. [get] /gtd/orbit/:satelliteId

###Satellite Detail
1. [get] /detail/:satelliteId/gtd
2. [get] /detail/:satelliteId/telemetry/:type
3. [get]
/detail/:satelliteId/telecommand/:type

## port
1. 3000 : client 
2. 3001 : server(socket)
3. 3002 : server(api)
4. 3003 : dummy server