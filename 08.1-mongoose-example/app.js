const mongoose = require('mongoose');

// We're using Promises here with .then() and .catch()
// An alternative would be to use async/await, which would mean wrapping this entire block in an async function
//  and then using await instead of .then() and .catch(). 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  // here we declare the function that will be called when the connection is successful as async, so that we can use await within it
  .then( async ()=>{

    console.log("connected!");
    // define a schema that matches the data we want to work with
    const characterSchema = mongoose.Schema({
      name: {type: String, required:true},
      role: {type: String, required:false},
      story: {type: String, required:false}
    });

    // create a model for the schema
    const Character = mongoose.model('Character', characterSchema);

    // create a new instance of the model with one of the characters
   const c1 = new Character({ name: 'Bill Smoke', role: "Assassin", story: "Half-Lives: The First Luisa Rey Mystery" });
    // here we will save this new character, then find all characters (to show that it worked), and then delete the character
    // Also, here we use async/await instead of .then(). They are equivalent, so either syntax is fine.
    try{
      let c = await c1.save();
      console.log(`Saved Character ${c}`);

      let characters = await Character.find({});
      console.log(`found characters! ${characters}`);

      //let r = await c.deleteOne();
      //console.log(`deleted one ${r}`);  
    }catch(err){
      console.log(err);
    } 

  })
  .catch((err)=>{ console.error(`database connection error:${err}`); })