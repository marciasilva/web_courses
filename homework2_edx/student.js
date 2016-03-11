var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  courses: [{ type: String, ref: 'Course' }]
});

/* Returns the student's first name, which we will define
 * to be everything up to the first space in the student's name.
 * For instance, "William Bruce Bailey" -> "William" */
schema.virtual('firstName').get(function() {	
	console.log('inside firstName virtual: ' + this.name);
	var res = this.name.split(" ");
	if(res.length !== 0)
		return res[0];

  	return 'Execution fail in firstName';
});

/* Returns the student's last name, which we will define
 * to be everything after the last space in the student's name.
 * For instance, "William Bruce Bailey" -> "Bailey" */
schema.virtual('lastName').get(function() {
	console.log('inside lastName virtual: ' + this.name);
	var res = this.name.split(" ");
	if(res.length !== 0)
		return res[res.length -1];

  	return 'Execution fail in lastName';
});

module.exports = schema;
