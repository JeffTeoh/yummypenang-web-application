$( document ).ready(function() {
  var category = "Laksa";

  //display suggestion items
  var suggRef = firebase.database().ref('suggestion').child(category);
  var suggObj;
  var i = 1; //counter for each items

  suggRef.once("value",function(snapshot){
    snapshot.forEach(function(childSnapshot){
      suggObj = childSnapshot.val();
      var name = suggObj.name;
      var address = suggObj.address;
      var opHours = suggObj.operationHours;
      var phone = suggObj.phone;
      var image = suggObj.image;
      var link = suggObj.link;
      var staticMap = suggObj.staticMap;
      var vote = suggObj.totalVote;
      var key = suggObj.key;
      
      $("#suggestionList").prepend(
      '<li class="list-group-item">' +
        '<div class="container">' +
          '<div class="row">' +
            '<div class="col-10">' +
              '<div class="row">' +
                '<div class="col-md-4 nopadding">' +
                  '<img src="' + image + '" alt="' + name + '" class="img-fluid">' +
                '</div>' +
                '<div class="col-md-4 nopadding">' +
                  '<a href="' + link + '" target="_blank">' +
                    '<img src="' + staticMap + '" alt="Google Map of ' + name + '" class="img-fluid">' +
                  '</a>' +
                '</div>' +
                '<div class="col-md-2 nobreak text-left" style="color: black;">' +
                  '<p><b id="name' + i + '">' + name + '</b></p>' +
                  '<p>' + address + '</p>' +
                  '<p>Opening Hours: ' + opHours + '</p>' +
                  '<p>Phone: ' + phone + '</p>' +
                  '<p class="d-none" id="key' + i + '">' + key + '</p>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="col-2 vote">' +
              '<div id="topic' + i + '" class="upvote">' +
                '<a class="upvote voteUp voteClick"></a>' +
                '<span class="count">' + vote + '</span>' +
                '<a class="downvote voteDown voteClick"></a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="container">' +
          '<!-- Button (Double) -->' +
          '<div class="form-group">' +
            '<div class="col-md-3 offset-md-9">' +
              '<button class="btn approve btn-success" id="approve' + i + '">Approve</button>' +
              '<button class="btn reject btn-danger ml-1" id="reject' + i + '">Reject</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</li>');
      i += 1;
    });

    $(".approve").click(function(){
      var id = $(this).attr('id');
      var index = id.substr(-1);
      var indexKey = $("#key" + index).text();
      var tempCategoryName = $("#dropdownMenuButton").html();
      var categoryName = tempCategoryName.replace(/\s/g, '');

      var suggTempRef = firebase.database().ref('suggestion').child(categoryName);
      var suggTempObj;
      var i = 1; //counter for each items

      suggTempRef.once("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
          suggTempObj = childSnapshot.val();
          if (suggTempObj.key == indexKey) {
            firebase.database().ref('foodCat').child(categoryName).child(indexKey).update(suggTempObj);
            firebase.database().ref('suggestion').child(categoryName).child(indexKey).remove();
          }
        });
      });
      location.reload();
    });

    $(".reject").click(function(){
      var id = $(this).attr('id');
      var index = id.substr(-1);
      var indexKey = $("#key" + index).text();
      
      var delSuggRef = firebase.database().ref('suggestion').child(category);
      delSuggRef.child(indexKey).remove();
      location.reload();
    });
  });

  //display food items
  var foodRef = firebase.database().ref('foodCat').child(category).orderByChild('totalVote');
  var foodObj;
  var i = 1; //counter for each items

  foodRef.once("value",function(snapshot){
    snapshot.forEach(function(childSnapshot){
      foodObj = childSnapshot.val();
      var name = foodObj.name;
      var address = foodObj.address;
      var opHours = foodObj.operationHours;
      var phone = foodObj.phone;
      var image = foodObj.image;
      var link = foodObj.link;
      var staticMap = foodObj.staticMap;
      var vote = foodObj.totalVote;
      var key = foodObj.key;
      
      $("#categoryList").prepend(
      '<li class="list-group-item">' +
        '<div class="container">' +
          '<div class="row">' +
            '<div class="col-10">' +
              '<div class="row">' +
                '<div class="col-md-4 nopadding">' +
                  '<img src="' + image + '" alt="' + name + '" class="img-fluid">' +
                '</div>' +
                '<div class="col-md-4 nopadding">' +
                  '<a href="' + link + '" target="_blank">' +
                    '<img src="' + staticMap + '" alt="Google Map of ' + name + '" class="img-fluid">' +
                  '</a>' +
                '</div>' +
                '<div class="col-md-2 nobreak text-left" style="color: black;">' +
                  '<p><b id="name' + i + '">' + name + '</b></p>' +
                  '<p>' + address + '</p>' +
                  '<p>Opening Hours: ' + opHours + '</p>' +
                  '<p>Phone: ' + phone + '</p>' +
                  '<p class="d-none" id="key' + i + '">' + key + '</p>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="col-2 vote">' +
              '<div id="topic' + i + '" class="upvote">' +
                '<a class="upvote voteUp voteClick"></a>' +
                '<span class="count">' + vote + '</span>' +
                '<a class="downvote voteDown voteClick"></a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="container">' +
          '<!-- Button (Double) -->' +
          '<div class="form-group">' +
            '<div class="col-md-3 offset-md-9">' +
              '<button class="btn edit btn-success" id="edit' + i + '">Edit</button>' +
              '<button class="btn delete btn-danger ml-1" id="delete' + i + '">Delete</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</li>');
      i += 1;
    });

    $(".edit").click(function(){
      var id = $(this).attr('id');
      var index = id.substr(-1);
    });

    $(".delete").click(function(){
      var id = $(this).attr('id');
      var index = id.substr(-1);
    });
  });  
});

