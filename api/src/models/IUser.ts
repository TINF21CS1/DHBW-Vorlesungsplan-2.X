interface IUser {
    id:string,
    name:string,
    email:string,
    salt:string,
    hashedpassword:string
    pepper:string
    role:string
}