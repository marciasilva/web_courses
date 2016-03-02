
console.log('running on client');

Router.configure({
	layoutTemplate : 'ApplicationLayout'
});

// 'home' page -- render the navbar and the docList template
Router.route('/', function () {
  console.log("you hit / ");
  	//nme of the template and the yield place that will hender
  this.render("navbar_template", {to:"header"});
  this.render("search", {to:"search"});
  this.render("website_form", {to:"addSite"});  
  this.render("website_list", {to:"website_list"});
});

// individual document page
Router.route('/link/:_id', function () {
  console.log("you hit /link  "+this.params._id);
  this.render("navbar_template", {to:"header"});
  this.render("", {to:"addSite"});
   this.render("linkItem", {to:"website_list"});

  //this.render("linkItem", {to:"main"});  
});

	/////
	// template helpers 
	/////
	Accounts.ui.config({
		passwordSignupFields:"USERNAME_AND_EMAIL"
	});

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, {sort:{rating:-1}});
		}
	});

	Template.body.helpers({ username : function(){
		if(Meteor.user()){
			console.log(Meteor.user().username);
			Meteor.user().username;
		}
		else{
			return "Log in to include a new link";
		}
	}
	});

	Template.search.helpers({
  		sitesIndex: () => WebSiteIndex
	});

	Template.linkItem.helpers({
  		website:function(){
  			var website = Websites.findOne({_id:Session.get("linkId")});
    		return website;
  		}
	});

	Template.insertCommentForm.helpers({
  		// find current doc id
  		websiteid:function(){
    		return Session.get("linkId");
  		} 
	});

	Template.commentList.helpers({
 		 // find all comments for current doc
  		comments:function(){
    		return Comments.find({websiteid:Session.get("linkId")});
  		}
	});




//linkItem

	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!
				// put the code in here to remove a vote from a website!
			var website = Websites.findOne(website_id);
			website.rating = website.rating + 1;
			website.upVotes = website.upVotes + 1;
			Websites.update(website_id, website);
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);

			// put the code in here to remove a vote from a website!
			var website = Websites.findOne(website_id);
			website.rating = website.rating - 1;
			website.downVotes = website.downVotes + 1;
			Websites.update(website_id, website);
			return false;// prevent the button from reloading the page
		},
		"click .js-detail" : function(event){
			var website_id = this._id;
			Session.set("linkId", website_id);
			return true;
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){
			var url, title, desc;
			url = event.target.url.value;
			title = event.target.title.value;
			desc = event.target.description.value;

			//  put your website saving code in here!
			Websites.insert({
				title : title,
				url : url,
				description : desc,
				createdOn : new Date(),
				rating : 0,
				upVotes : 0,
				downVotes : 0
			});
			
			return false;// stop the form submit from reloading the page

		}
	});

