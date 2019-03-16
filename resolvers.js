const user={
    _id:"1",
    name:"nikhil",
    email:"karkra.nikhil@gmail.com",
    picture:"https://cloudinary.com/asdf"
}

module.exports={
    Query:{
        me:()=>user
    }
}