const express = require('express')
const path = require('path')
const cors = require('cors')
const request = require('request')
const PORT = process.env.PORT || 5000
const app = express()
var corsOptions = {
  origin: 'https://ampbyexample.com',
  optionsSuccessStatus: 200,
  credentials:true
}
app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
app.options('/dropdown.json', cors(corsOptions))
app.get('/dropdown.json',cors(corsOptions),function (req, res, next) {	
	var json = {
		"items": [{
			degrees: [{
				"id": 728,
				"name": "Bachelor's",
				"product": null,
				"flexpath": null
			}, {
				"id": 730,
				"name": "Certificate",
				"product": null,
				"flexpath": null
			}, {
				"id": 731,
				"name": "Doctoral",
				"product": null,
				"flexpath": null
			}, {
				"id": 729,
				"name": "Master's",
				"product": null,
				"flexpath": null
			}]
		}]
	};
	if(req.query.degree === '728'){
		console.log("inside degreee");
		json = {
			items: [{
				aos:[{"id":5896,"name":"Analytics","product":null,"flexpath":null},{"id":733,"name":"Business","product":null,"flexpath":null},{"id":736,"name":"Counseling","product":null,"flexpath":null},{"id":746,"name":"Education ","product":null,"flexpath":null},{"id":3704,"name":"Education Technology","product":null,"flexpath":null},{"id":741,"name":"Health Administration","product":null,"flexpath":null},{"id":748,"name":"Human Resource Management","product":null,"flexpath":null},{"id":764,"name":"Human Services","product":null,"flexpath":null},{"id":2445,"name":"Informatics","product":null,"flexpath":null},{"id":2432,"name":"Information Security","product":null,"flexpath":null},{"id":752,"name":"Information Technology ","product":null,"flexpath":null},{"id":1425,"name":"Nursing  ","product":null,"flexpath":null},{"id":761,"name":"Psychology ","product":null,"flexpath":null},{"id":2058,"name":"Public Administration","product":null,"flexpath":null},{"id":5934,"name":"Public Health","product":null,"flexpath":null}]
			}]
		}		
	}
	if(req.query.degree === '728' & req.query.aos === '5896'){
		json = {
			items: [{
				specialization:[{"id":5898,"name":"Grad Cert - Advanced Analytics Using SAS","product":3671,"flexpath":null},{"id":5897,"name":"Grad Cert - Analytics Using SAS","product":3673,"flexpath":null}]
			}]
		}
	}
	res.json(json);
});

app.get('/testing.json',cors(corsOptions),function (req, res, next) {
	var url = 'https://s3.amazonaws.com/assets.capella-mt.com/jsondata/group/8';
	if(req.query.degree !== undefined){
		url+='/'+req.query.degree;
	}
	if(req.query.aos !== undefined){
		url+='/'+req.query.aos;
	}
	url+='/data.js';
	console.log(url);
	request.get(url, function(err,httpResponse,body){
		var response = {
			items:[{
				data:[]
			}]
		};
		if(req.query.empty !== 'true'){
			try {
				response.items[0].data = JSON.parse(body.replace('jsondata(','').replace(')',''));			
			}catch(e){
				console.log(e);
			}
		}
		res.send(response);
	});
});
