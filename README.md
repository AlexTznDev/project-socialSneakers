# Project Name
  S.SNEAKERS
## Description
S.SNEAKERS is a platform for all kind of public, but specially those that love a good pair of sneakers.
Users or visitors here can see others' people sneakers posts but in order to interact with them, they actually have to sign up! so do it for free.
## User Stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events listeners - create - edit - delete** - The app is fully equiped with the necessary functionalities for making the users' experience a great one.
  It is very clickable.
## Backlog
List of other features outside of the MVPs scope
User profile:
- Users' can see other users profiles and comment their posts.
- Users' can add or "follow" each other in order to build a friendlist.
- Once the account is created and new user is logged in, they got the chance to edit their profile and make it attractive.
Post:
- Multiple users can comment the same post created and also click on the comment's owner, so they can see their profile.
Homepage
- In the Homepage, users (already signed up or logged in) or visitors, can appreciate a list of all the current users posts displayed in a random way.
- Only users with an account and logged in can have access to the posts information by giving it a 'click'
- Homepage is provided by a 'SearchByUsername' and 'SearchByBrand', also allowed only for validated users.
## ROUTES:
- GET /
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - res.render("auth/signup-form.hbs")
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - res.render("auth/login-form.hbs")
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
    -
- POST /auth/logout
  - body: (empty)
  - res.redirect("/home");
- GET /profile
  - res.render("profile/user-profile.hbs", {
      userInfo: responseUser,
      allSneakers: reponseSneaker,
      shoesInSell: shoesInSell,
      allFriends: allFriends,
    });
- POST /profile/edit
  - redirects to
  - body:
    - name
      age: age,
      description: description,
      profilePicture: image,
- GET /profile/infor-user/:id
  - renders the profile-specigic user detail page
- POST /home
  - redirects to /home if user is anonymous
  - res.render("homePage/home-page.hbs", {
        allId: arrayOfId,
      });
    users posts displayed in a random way.
## Models
User model
const userSchema = new mongoose.Schema({
    username: {type: String, unique: true,},
    email: {type: String,unique: true,},
    password: String,
    age: Number,
    description: String,
    profilePicture: String,
    friends:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    followers: Number,
    role: {type: String, enum: ["user", "admin"], default: "user",}},
    {timestamps: true});
Sneaker model
const sneakerSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    brand: String,
    model: String,
    size: Number,
    color: String,
    material: String,
    description: String,
    image: String,
    comments: [{type:mongoose.Schema.Types.ObjectId, ref:"Comments"  }],
    status: {type: String, enum: ["used" , "new"]},
    likes: Number,
    forSale: {type: String,nenum: ["For sale" , "No, i keep it!"]},
      price: Number},
    {timestamps: true,});
Comments model
const commentsSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref :"User", required: true},
    profilePicture: String,
    comentario: String,
    name:String,
    fechaYHora: String})
Search model
const searchSchema = new mongoose.Schema({
  search: [{type: mongoose.Schema.Types.ObjectId, ref: "User",}],
  owner:String,
  searchString: String,
  usernameString: String});
## Links
### Collaborators
  - Alexandre Tuyzusian
  - Victor Mamani
### Git
The url to your repository and to your deployed project
[Repository Link](https://github.com/AlexTznDev/project-socialSneakers)
[Deploy Link](https://social-sneaker.cyclic.app/home)
### Slides
[Slides Link](https://drive.google.com/drive/folders/19AyRSb4OPHFYSV6Urw9HP9yRW4vnUSV0)