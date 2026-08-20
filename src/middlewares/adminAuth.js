export  let authToken = (req,res,next) =>{

      let token = req?.query?.admin ? true : false;
    if(!token){
      res.status(401).send('you are cooked')
    }else{
      next()
    }
}