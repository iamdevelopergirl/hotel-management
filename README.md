# hotel-management

Server runs on http://localhost:8080 <br />

<b> Available api's :</b> <br/>

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


ReadMe for front end is available inside webapp folder. <br/>
