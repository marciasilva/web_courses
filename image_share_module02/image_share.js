// this is image_share.js
//Create a new table on data base called images 
Images = new Mongo.Collection("images");
console.log(Images.find().count());

if (Meteor.isClient) {
  console.log('Client side');

    //-1 makes sort in reverse order; sort by date it was created and the rating. 
   Template.images.helpers({images:
    Images.find({}, {sort:{createdOn: -1, rating:-1}})
  });



   Template.images.events({
    //when click on the image, set it weidth to 50 px
    'click .js-image':function(event){
        $(event.target).css("width", "50px");
    }, 
    //this refers to the data the template was displaying (an image)
    //_id refers to an unique identifier for an item in a Mongo collection
    'click .js-del-image':function(event){
       var image_id = this._id;
       console.log(image_id);
       // use jquery to hide the image component
       // when hids finished remove it at the end of the animation
       $("#"+image_id).hide('slow', function(){
        Images.remove({"_id":image_id});
       })  
    }, 
    'click .js-rate-image':function(event){
      var rating = $(event.currentTarget).data("userrating");
      console.log('Rating: ' + rating);
      var image_id = this.id;
      console.log('Click to rate the image: ' + image_id);

      //update is a database function, parameters: id of the image and the thing it will be changed
      Images.update({_id:image_id}, 
                    {$set: {rating:rating}});
    }, 

    //on click in js-show-image-form show the form to add a new image
    'click .js-show-image-form':function(event){
      $("#image_add_form").modal('show');
    }

   });

//add the events to the template image_add_form
//only saves image from interet, it does not load images from local 
  Template.image_add_form.events({

    'submit .js-add-image':function(event){
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      console.log("src: "+img_src+" alt:"+img_alt);

      Images.insert({
        img_src:img_src, 
        img_alt:img_alt, 
        createdOn:new Date()
      });
       $("#image_add_form").modal('show');
      return false;
    }
  });


}

