'use strict';

/*
 Query Params: 
 * taken: How many to take
 * current: what's current in game (with the one taken)
*/

//console.log('Loading...');

module.exports.matches = (event, context, callback) => {
	var isValid = function(value, min, max) {
		if (value == undefined
				|| value < min
				|| value > max) {
			return false;
		}
		return true;
	}, taken, left;
	
  const done = function(err, reply) {
		//console.log('Calling callback:('+JSON.stringify(err)+', '+JSON.stringify(reply)+')');
		callback(null, {
			statusCode: (err != undefined) ? 400 : 200,
			body: (err != undefined) ? {'message':err.error}: JSON.stringify(reply)
    });	
  };

	
	//console.log('Got query: ...?taken='+event.queryStringParameters.taken+'&left='+event.queryStringParameters.taken);
	if (isValid(event.queryStringParameters.taken, 1, 3)
			&& isValid(event.queryStringParameters.current, 1, 12)) {		
		taken = 4 - event.queryStringParameters.taken;
		left = event.queryStringParameters.current - 4;

		//console.log('Replying with {taken: '+taken+', left: '+left+'}');

		done(null,{
			'taken': taken,
			'left': left,
			'win' : (left == 0) ? true : false
		});
	} else {
		//console.log('Request is invalid');
		done({'error':'That\'s not how you should play'});
	}
};










