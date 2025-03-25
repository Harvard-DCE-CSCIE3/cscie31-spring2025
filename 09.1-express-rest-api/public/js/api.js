// wrap in IIFE to control scope
(function(){

   const baseURL = ''; //  for development, it's http://localhost:3030

   function testAPIs(){
    // test list first
    var testId = '';
    var testJSON = {};

    // list
    callAPI('GET', '/api/photos', null, null)
      .then((list)=>{
        console.log('\n\n***************************\nlist results:');
        console.log(list);
        testId = list[0]._id;
      })
      .then(()=>{
        // create form data object with photo and metadata
        // This section is for uploading a file to the REST API
        let input = document.querySelector('input[type="file"]')
        let data = new FormData()
        data.append('image', input.files[0]);
        data.append('title', 'My API Test Title');
        data.append('description','This is an AJAX API test');

        // If you don't have a file upload component to your application, a simple JSON object will do
        /**
        let data = {
          "title": "My API Test Title",
          "description": "This is an AJAX API test"
        }
         */

        // create the POST call to the API
        callAPI('POST', '/api/photos', null, data)
          .then((photo)=>{
            console.log('\n\n***************************\ncreate results:');
            console.log(photo);
            return photo;
          })
          .then((photo)=>{
            // find
            return callAPI('GET','/api/photos/'+photo._id, null, null)
          .then((photo)=>{
            // output the result of the Promise returned by response.json()
            console.log('\n\n***************************\nfind results:');
            console.log(photo);
            return photo;
          })
          .then((photo)=>{
            // update description
            photo.description += ' appended by the AJAX API ';
            return callAPI('PUT','/api/photos/'+photo._id, null, photo)
          .then((photo)=>{
            // output the result of the Promise returned by response.json()
            console.log('\n\n***************************\nupdate results:');
            console.log(photo);
            return photo;
          })
          .then((photo)=>{
            // now find again to confirm that the dedscription update was changed
            return callAPI('GET','/api/photos/'+photo._id, null, null)
          })
          .then((photo)=>{
            // output the result of the Promise returned by response.json()
            console.log('\n\n***************************\nfind results (should contain updated description field):');
            console.log(photo);
            return photo;
          })
          .then((photo)=>{
            //delete
            callAPI('DELETE', '/api/photos/'+photo._id, null, null)
                .then((result)=>{
                console.log('\n\n***************************\ndelete result:');
                console.log(result);
                })
            });
        })
     })
    })
    .catch((err)=>{
      console.error(err);
    });



  async function callAPI(method, uri, params, body){
    jsonMimeType = {
      'Content-type':'application/json'
    }
    try{
      /*  Set up our fetch.
       *   'body' to be included only when method is POST
       *   If 'PUT', we need to be sure the mimetype is set to json
       *      (so bodyparser.json() will deal with it) and the body
       *      will need to be stringified.
       *   '...' syntax is the ES6 spread operator.
       *      It assigns new properties to an object, and in this case
       *      lets us use a conditional to create, or not create, a property
       *      on the object. (an empty 'body' property will cause an error
       *      on a GET request!)
       */
      var response = await fetch(baseURL + uri, {
        method: method, // GET, POST, PUT, DELETE, etc.
        ...(method=='POST' ? {body: body} : {}),
        ...(method=='PUT' ?  {headers: jsonMimeType, body:JSON.stringify(body)} : {})
      });
      // response.json() parses the textual JSON data to a JSON object. 
      // Returns a Promise that resolves with the value of the JSON object 
      //  which you can pick up as the argument passed to the .then()
      return response.json(); 
    }catch(err){
      console.error(err);
      return "{'status':'error'}";
    }
  }
      }

  // Calls our test function when we click the button
  //  afer validating that there's a file selected.
  document.querySelector('#testme').addEventListener("click", ()=>{
    let input = document.querySelector('input[type="file"]')
    if (input.value){ 
      testAPIs();
    }else{
      alert("please select an image file first");
    }
  });
})();
