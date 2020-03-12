# hotel-management

### Prerequsites:
`mvn` <br />
`npm` <br />


### Deployment scripts
To stop the process running on port 8080 and 3000, use `sh stop.sh` <br />
To start the server and run the application, use `sh run.sh` <br />

Note : Since both back end and front end runs in a port, it is must to stop them before rerunning it again. <br />


### Application specifics

[README for FrontEnd](./webapp/README.md). <br/>

username : manager <br />
password : password <br/>

### Login Api
`Request` { <br />
&nbsp;&nbsp;&nbsp;&nbsp;Request URL: `/login`  <br />
&nbsp;&nbsp;&nbsp;&nbsp;Request Method: GET <br />
&nbsp;&nbsp;&nbsp;&nbsp;authorization: basicAuth <br />
} <br />
`Successful Response` { <br />
&nbsp;&nbsp;&nbsp;&nbsp;status : 200 <br />
} <br />
`Unsuccessful Response` { <br />
&nbsp;&nbsp;&nbsp;&nbsp;status : errorCode <br />
} <br />



### Logout Api
`Request` { <br />
&nbsp;&nbsp;&nbsp;&nbsp;Request URL: `/logout` <br />
&nbsp;&nbsp;&nbsp;&nbsp;Request Method: GET <br />
&nbsp;&nbsp;&nbsp;&nbsp;authorization: basicAuth <br />
} <br/>
`Successful Response` { <br />
&nbsp;&nbsp;&nbsp;&nbsp;status: 200 <br />
&nbsp;&nbsp;&nbsp;&nbsp;JSESSIONID: empty <br/>
} <br />
`Unsuccessful Response` { <br />
 &nbsp;&nbsp;&nbsp;&nbsp;status : errorCode <br />
} <br />



### GetAll Items api
`Request` { <br />
&nbsp;&nbsp;&nbsp;&nbsp;Request URL: `/api/hotels` <br />
&nbsp;&nbsp;&nbsp;&nbsp;Request Method: GET <br />
&nbsp;&nbsp;&nbsp;&nbsp;authorization: basicAuth <br />
&nbsp;&nbsp;&nbsp;&nbsp;JSESSIONID: token <br />
} <br />
`Successful Response` { <br />
&nbsp;&nbsp;&nbsp;&nbsp;status: 200 <br />
&nbsp;&nbsp;&nbsp;&nbsp;data: allItemData <br/>
} <br />
`Unsuccessful Response` { <br />
&nbsp;&nbsp;&nbsp;&nbsp;status: errorCode <br />
} <br />



### Add Item Api
`Request` { <br />
&nbsp;&nbsp;&nbsp;&nbsp;Request URL: `/api/hotel` <br />
&nbsp;&nbsp;&nbsp;&nbsp;Request Method: POST <br />
&nbsp;&nbsp;&nbsp;&nbsp;authorization: basicAuth <br />
&nbsp;&nbsp;&nbsp;&nbsp;JSESSIONID: token <br />
&nbsp;&nbsp;&nbsp;&nbsp;body { <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data : formDataValues <br /> 
&nbsp;&nbsp;&nbsp;&nbsp;} <br />
} <br />
`Successful Response` { <br />
 &nbsp;&nbsp;&nbsp;&nbsp;status : 201 <br />
 &nbsp;&nbsp;&nbsp;&nbsp;data: addedItem <br />
} <br />
`Unsuccessful Response` { <br />
&nbsp;&nbsp;&nbsp;&nbsp;status: errorCode <br />
} <br />



### Edit Item Api
`Request` { <br />
     &nbsp;&nbsp;&nbsp;&nbsp;Request URL: `/api/hotel/{id}` <br />
     &nbsp;&nbsp;&nbsp;&nbsp;Request Method: PUT <br />
     &nbsp;&nbsp;&nbsp;&nbsp;authorization: basicAuth <br />
     &nbsp;&nbsp;&nbsp;&nbsp;JSESSIONID: token <br />
     &nbsp;&nbsp;&nbsp;&nbsp;body { <br />
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data : FormDatValues <br />
     &nbsp;&nbsp;&nbsp;&nbsp;} <br />
} <br />
`Successful Response` { <br />
    &nbsp;&nbsp;&nbsp;&nbsp;status : 200 <br />
    &nbsp;&nbsp;&nbsp;&nbsp;data: EditedItem <br/>
} <br />
`Unsuccessful Response` { <br />
    &nbsp;&nbsp;&nbsp;&nbsp;status: errorCode <br />
} <br />



### Delete Item Api
`Request` { <br />
	&nbsp;&nbsp;&nbsp;&nbsp;Request URL: `/api/hotel/{id}` <br />
	&nbsp;&nbsp;&nbsp;&nbsp;Request Method: DELETE <br />
	&nbsp;&nbsp;&nbsp;&nbsp;authorization: basicAuth <br />
	&nbsp;&nbsp;&nbsp;&nbsp;JSESSIONID: token <br />
} <br />
`Successful Response` { <br />
    &nbsp;&nbsp;&nbsp;&nbsp;status : 200 <br />
} <br />
`Unsuccessful Response` { <br />
    &nbsp;&nbsp;&nbsp;&nbsp;status : errorCode <br />
} <br />
