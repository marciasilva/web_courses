//Check if wer are running on the server
if (Meteor.isServer){
	console.log('server side');
	Meteor.startup(function(){
		//create if nothing is found
		if (Images.find().count() == 0){		
			for (var i=1;i<23;i++){
				Images.insert(
					{
      				img_src:"img_"+i+".jpg", //name of the image folder public
      				img_alt:"image number "+i 
   					}
				);	
			}// end of for insert images(no more images)
			// count the images!
			console.log("startup.js says: "+Images.find().count());
		}// end of if have no images
	});

}