class Bug {



/** create bug object **/
  constructor(description) {
    if(description){
      this.title = description.title;
      this.description = description.description;
      this.issue_type = description.issue_type;
      this.priority = description.priority;
      this.status = description.status;
    }
    this.errors = [];
  }


  isValid() {
       this.errors = [];
       if (!this.title || this.title.length <= 2) {
           this.errors.push("The title must contain at least three characters");
       }
       if (!this.description || this.description.length <= 0) {
           this.errors.push("The bug must have a description.");
       }
       if (!this.priority || this.priority.length <= 0) {
           this.errors.push("The bug must have a priority assigned");
       }
       if(!this.status || this.status.length <= 0){
            this.errors.push("The bug must have a status");
       }

       return this.errors.length <= 0;
   }

  static all() {
    return this.allBugs;
  }

  static find(id) {
    return this.allBugs.find((item) => item.id == id);
  }

  static create (bugDescription) {
    let newBug = new Bug(bugDescription);
    if(newBug.isValid()){
      newBug.id = ++Bug.idCount;
      this.allBugs.push(newBug);
    }
    return newBug;
  }

  static delete(id) {
    let i = 0;
    for(i=0; i<this.allBugs.length; i++){
      if(this.allBugs[i].id == id){
        this.allBugs.splice(i,1);
      }
    }
  }
}

Bug.idCount = 0;
Bug.allBugs = [];
Bug.create({ title: 'App Crashing', description: 'This app is broken',
issue_type: 'Issue', priority: 'High', status: 'Open'});
Bug.create({ title: 'Needs Style', description: 'Too plain. Add style',
issue_type: 'Enhancement', priority: 'High', status: 'Open'});
Bug.create({ title: 'Email Server Down', description: 'Cant access email server',
issue_type: 'Issue', priority: 'High', status: 'Closed'});


console.log(Bug.allBugs);

module.exports = Bug;
