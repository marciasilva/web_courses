Websites = new Mongo.Collection("websites");
Comments = new Mongo.Collection("comments");

WebSiteIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { rating: -1 };
    },
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
        categoryFilter = options.search.props.categoryFilter;

      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.category = categoryFilter;
      }

      return selector;
    }
  }),
  collection: Websites,
  fields: ['url','description'],
  defaultSearchOptions: {
    limit: 8
  },
  permission: () => {
    //console.log(Meteor.userId());

    return true;
  }
});

// set up a schema controlling the allowable 
// structure of comment objects
Comments.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  body:{
    type: String,
    label: "Comment",
    max: 1000   
  },
  websiteid:{
    type: String, 
  }, 
  owner:{
    type: String, 
  }, 
  
}));