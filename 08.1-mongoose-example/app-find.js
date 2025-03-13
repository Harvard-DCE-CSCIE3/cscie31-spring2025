//app-find.js
const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.njksd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(async ()=>{
    console.log("connected!");

    var characterSchema = mongoose.Schema({
      name: {type: String, required:true},
      role: {type: String, required:false},
      story: {type: String, required:false}
    });
    var Character = mongoose.model('Character', characterSchema);
    // The Ghastly Ordeal of Timothy Cavendish
    // Here we use find() with a regular expression seach on the story field
    let characters = await Character.find({story: /ghastly/i})
      .sort("-name")
      .exec();
      console.log(`found characters! ${characters}`);
      
}).catch((err)=>{console.error(err+ "errored out!")});
