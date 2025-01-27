// Follows CSCI E31 Video 2.6, alternative to error5.js example using callbacks
let promise = new Promise(function(resolve, reject){
    setTimeout(function(){
        try{
          console.log('About to throw an error');
          var str="CSCI E31 MEAN stack";
          let i = str.indexOf("a");
          resolve("I completed successfully! "+ i);
        }
        catch(e){
          reject(`error in timeout function`);
        }
      }, 1000);

})
.then(value => console.log(value))
.catch((e)=>{ 
    console.log('Catch: I will only execute if an error is thrown');
    console.log('Error caught: ', e.message);
})
.finally(()=>console.log('Finally: I will execute irrespective of an error thrown'))
