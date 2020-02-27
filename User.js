class User {



/** create user object **/
  constructor(description) {
    if(description){
      this.lname = description.lname;
      this.fname = description.fname;
      this.email = description.email;
      this.pic = description.pic;
    }
    this.errors = [];
  }

  isValidExt(extension) {
    let acceptExt = [".gif", ".jpg", ".png"];
    let b = false;
    let i=0;
    for (i=0; i<acceptExt.length; i++){
      if(extension === acceptExt[i]){
          b = true;
      }
    }
    return b;
  }

  isValid() {
       this.errors = [];
       if (!this.lname || this.lname.length <= 0) {
           this.errors.push("Last name must not be empty.");
       }
       if (!this.fname || this.fname.length <= 0) {
           this.errors.push("First name must not be empty.");
       }
       if (!this.email || this.email.length <= 0) {
           this.errors.push("Email must not be empty.");
       }

       if(!this.pic || this.pic.length <= 0){
          // do nothing
       }
       else {
        if(this.pic.length > 1 && this.pic.length < 5){
          this.errors.push("Not a valid picture. Filename must be greater than 4 characters.")
       }
       else if(this.pic.length > 5){
         let ext = this.pic.substr(this.pic.length-4).trim();
         if(!this.isValidExt(ext)){
           this.errors.push("Not a valid picture extension. Must be jpg, gif or png.");
         } 
       }
       else {}
       }
      
       return this.errors.length <= 0;
   }


  static all() {
    return this.allUsers;
  }

  static find(id) {
    return this.allUsers.find((item) => item.id == id);
  }
  
  static findName(id) {
    let i = 0;
    for(i=0; i<this.allUsers.length; i++){
      if(this.allUsers[i].id == id){
        return this.allUsers[i].fname + " " + this.allUsers[i].lname;
      }
    }
  }

  static create (userDescription) {
    let newUser = new User(userDescription);
    if(newUser.isValid()){
      newUser.id = ++User.idCount;
      this.allUsers.push(newUser);
    }
    return newUser;
  }

  
  static delete(id) {
    let i = 0;
    for(i=0; i<this.allUsers.length; i++){
      if(this.allUsers[i].id == id){
        this.allUsers.splice(i,1);
      }
    }
  }
}

User.idCount = 0;
User.allUsers = [];
User.create({ lname: "Builder", fname: "Bob", email:"bobbuilder@gmail.com", pic:"bob.jpg"});
User.create({ lname: "Flintstone", fname: "Fred", email:"flintstone_fred@hotmail.com", pic:""});

console.log("USERS");
console.log("===========================");
console.log(User.allUsers);

module.exports = User;
