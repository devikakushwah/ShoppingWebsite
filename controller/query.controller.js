const Query = require('../model/query.model');
exports.queryPage= (request, response)=>{
    let name = request.body.name;
    let email = request.body.email;
    let mobile = request.body.mobile;
    let subject = request.body.subject;
    let description = request.body.description;
    const query=new Query(name, email, mobile, subject, description);
   query.save()
   .then(result=>{

    console.log(result);
    response.send("Successfully");
   })
   .catch(error=>{
       console.log(error);
   })
  
}