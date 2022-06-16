const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const url = `mongodb+srv://cluster:${process.env.PASSWORD}@cluster0.4vzo1.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection =  client.db("Database").collection("Collection");
module.exports = {
  async getDB(){
   
    return (async function(){
      try{
        await client.connect();
        const data = await collection.find({}).toArray();
        return data;
      }catch(err){
        console.log(err);
      }finally{
        client.close();
      }
    })();
   
  },
  async postDB(date){
    return (async function(){
      try{
        await client.connect();
        const data = await collection.insertOne({ date: `${Date.now(date)}` })
        return data
      }catch(err){
        console.log(err);
      }finally{
        client.close();
      }
    })();

},
async deleteDB(id){
  return (async function(){
    try{
      await client.connect();
      const data = await collection.findOneAndDelete({ _id: ObjectId(id)})
      return data
    }catch(err){
      console.log(err);
    }finally{
      client.close();
    }
  })();
},
async updateDB(id, date){
  return (async function(){
    try{
      await client.connect();
      const data = await collection.findOneAndUpdate({ _id: ObjectId(id)}, { $set: { date: `${date}` }})
      return data
    }catch(err){
      console.log(err);
    }finally{
      client.close();
    }
  })();
}
}