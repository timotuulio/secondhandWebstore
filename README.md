
## TODO: Headers buttons have different margins or something
## TODO: How stock and users and all that zhass works

# WWW Programming Part 2 Coursework Project plan
## Course project group information
#### Group Name: X
Tapio Nevalainen | Timo Tuulio
------------ | -------------
80997 | 415428
<tapio.nevalainen@tuni.fi> | <timo.tuulio@tuni.fi>

#### GitLab repository: <https://course-gitlab.tuni.fi/tieta12-2019-2020/x>
---

## TL;DR
<div style="text-align: justify">
This is a project for secondhand webstore. It includes signing in with different roles, selling and buying items and an Api that connects everything to a database.
</div>
---

## How to run
<div style="text-align: justify">
- Clone the project
- Start the api by running command "node app" in Api-folder
- Start the react app by running command "npm start" in frontend-folder. It should open your web-browser to see the program.
- Create user, add some items in "Sell product", see them in "active offers"
- Create a shopkeeper and buy the items in "Offers"-page and set them up to sales in "Stock"-page. The items can now be seen in the main/shop -page by everyone.
- Go to the user and buy the items. Check the "Sales history"-page for your receipts.
</div>

---

## Functionality

<div style="text-align: justify">
The project includes an api and the frontend for a second hand webstore. In the webstore users can sell their own items which the shop can then buy and sell back to the users. The backend includes mongoose and mongoDB and frontend that is implemented with React, along with the Redux state design. User authentication is done with JSON webtoken.

Users:
Users 
// We will start by designing the database and Mongoose schemas that can be done without worrying about the frontend. After this API can be designed and implemented. Next, basic frontend is implemented with React, along with the Redux state design. Authentication is designed at this point; we are planning to use JSON webtoken authentication. Frontend is finalized and all the parts are tied together. Finally, some tests are implemented. See project timetable in the end of this file.

</div>

---
## Pages and navigation
The site includes a static navigation bar that has links to main page (The "shop" -button) and most other pages. Depending on the users authentication only some navigation links are shown. On the graph this is marked with letters. U for user, S for shopkeeper and A for admin. Note that shopkeepers authetication includes the users authentication.
``` mermaid
graph TD
  Log(Login) --> |not<br/> Registered?| Reg
  Reg(Register)
  MP{{Mainpage that includes <br/>all vendible items}}
  MP --> |log in| Log
  MP --> |USA:Profile| Prof
  MP --> |U: Sales history| Hist
  MP --> |A:check users| LU
  MP --> |S:Stock|OwnSells
  MP --> |U:Active<br/> offers|OwnOff
  MP --> |USA:<br/>Buy item| Item
  MP --> |USA:Sell product| NewItem
  MP --> |SA:Offers|Offers
  Hist(Sales history)
  NewItem(Add new <br/>sales item)
  LU(List of users) --> |A:Check profile<br/>of a single user| Prof
  Prof(Users own profile)
  OwnOff(Own offerings <br/>that haven't<br/> been sold yet) --> |Edit|Edit
  Edit(Edit existing item)
  OwnSells(Shops items <br/>that are not <br/>yet for sale) --> |S:Add to <br/>sales|Edit
  Item(Modal window <br/>to buy item)
  Offers(Offers that <br/>users have<br/> given)

```

---
## Modules your group created in your Node project    
Our planned working directory is as follows:
<pre><code>
Directory
- Api
 | controllers
 | | itemController.js
 | | receiptController.js
 | | userController.js
 | Models
 | | db.js
 | | itemModel.js
 | | receiptModel.js
 | | userModel.js
 | Routes
 | | api.js
 | app.js
 | package.json
- frontend
 | Public
 | | index.html
 | src
 | | Actions
 | | | actions.js
 | | | actionTypes.js
 | | Components
 | | | allItemsComponent.js
 | | | allUsersComponent.js
 | | | appComponent.js
 | | | headerComponent.js
 | | | itemComponent.js
 | | | loginComponent.js
 | | | profileComponent.js
 | | | receiptComponent.js
 | | | sellComponent.js
 | | | signupComponent.js
 | | Containers
 | | | appContainer.js
 | | | headerContainer.js
 | | | loginContainer.js
 | | | profileContainer.js
 | | | receiptContainer.js
 | | | sellContainer.js
 | | | signupContainer.js
 | | Reducers
 | | | loadReducer.js
 | | | loginReducer.js
 | | | pageReducer.js
 | | | rootReducer.js
 | | store
 | | | store.js
 | | App.js
 | | constants.js
 | | index.js
 | | stateNames.js
 | package.json
</code></pre>
---
## Mongo database and Mongoose schemas    
<div style="text-align: justify">
Configurations for the database are made in db.js -file which is used from app.js -file. There are three mongoose models to use.  
UserModel is for all users in the webshop. It has a role for admins, shopkeepers and users. The email needs to be unique for every user.
</div>

<pre><code>
USER
- name: STRING
- role: STRING
- bankAccount: STRING
- email: STRING
- phoneNumber: STRING
- address: STRING
- password: STRING
- selfLink: STRING
</code></pre>

Item model models individual item that is sold in the shop. OwnerID links every item to individual user. When the shop is the owner, OwnerID reads "SHOP" otherwise it is the users ID. There is an option to add image of the item although there is no functionality made for it in the store. The status is either "offered", "stock", "sales" or "sold". Offered when the shop hasn't yet bought it, stock when shop has bought it but not yet added it to the shop, sales when it is in sales and sold when a user has bought it.
<pre><code>
ITEM
- ownerID: STRING
- title: STRING
- price: NUMBER
- image: img
- description: STRING
- created: STRING
- status: STRING
</code></pre>

ReceiptModel holds receipts of sold items. It includes IDs of both buyer, sales date and some iteminfo
<pre><code>
RECEIPT
- title: STRING
- seller: STRING
- buyer: STRING
- amount: NUMBER
- date: STRING
</code></pre>


---
## API
We use api-calls as such  GET for fetches, POST for adding new content, PUT for update and DELETE for deleting.  
For the API, we use the following URLs. The first five function with all HTTP-methods but Single receipt, All offered items, Own offered items, Stock items and Sales items are usable only with GET. Log in and Buy item work only with POST.
All urls have /api at the start, for example "/api/user"

Description | API path
------------ | -------------
All users | /user
Single user | /user/:id
All items | /item
Single item | /item/:id
All receipts | /receipt
Single receipt | /receipt/:id
All offered items | /items/offers
Own offered items | /items/offers/:id
Stock items | /items/stock
Sales items | /items/sales
Log in | /login
Buy item | /buy/:id

---
## React and Redux  

React:
React was used for the frontend of the project.
- Index.js renders the frontend.
- App.js has the main component which sends appComponent to be rendered.
- AppComponent collects correct components together debending on the page user is on.
- allItemsComponent shows items from the database depending on which page the user is on. It can show items that are on sale, items that are still in the stock of the shop or offers a user has done that haven't been bought yet.
- allUsersComponent shows all users in database for the admin. It also has links to show the profile.
- headerComponent is the header which has buttons which change the page-state and thus the page. This is shown on every page.
- itemComponent is the page for single item with the possibility to buy it from there.
- loginComponent has the log in functionality and a link to sign up.
- profileComponent shows the profile of the user. There are also buttons for editing and removing the user.
- receiptComponent holds receipts of the user. It has two tabs which other is of sold items and others what the user has bought from the shop.
- sellComponent works in three ways. It is used if the user wants to offer a new item to sell, edit an existing item or if a shopkeeper wants to set an item from stock to sales.
- signupComponent is used for signing up a new user. Note that in a fully functioning program the user couldn't decide his/her role. The first admin would be done directly to the database and later that user could change other users roles to admin or shopkeeper.

Redux:
Redux was used for handling the state of the app.
- loadReducer has a value depending on if the api-fetches that the React-components do have loaded.
- loginReducer holds states for if the user has logged in or not, the user data, JSON webtoken and the role of the user.
- pageReducer holds a state regarding on which page the user is on. In some cases it also holds info on the item, the user was editing or adding for sale.
---
## Testing and bugs

No automatic testing is implemented. All the code is tested manually.
Bugs in the project:
- When a user buys an item from the itemlist, the item stays for a few seconds in the list before getting removed from it. Or sometimes the window freezes so that it becomes unscrollable until the whole page is reloaded. This has something to do with modal windows.


---
## Future improvements and missing functionality
Here are pointed out some functionality that is still missing from the project.
- Giving admin the possibility to change users info and role. Now there is a "Go to profile" button in the list of all users but it does nothing pressed.
- Giving admin the possibility to see all the receipts.
- Handling of the money is done from bank account and in an unrefined way.

Here are explained some improvements that were considered to be added to the project but which we didn't have time.
- Uploading images to items.
- UI elements could be improved in many parts of the project.
- Better use of constants-file. Right now it isn't referred often and there are lots of string-values that could come straight from constants-file instead of being handwritten every time.
- For localization purposes all text could come imported from a file. This way different languages could be easily implemented by just doing new files for different languages.
- Search functionality for items, users and receipts. Also tags could be added to the items so that it could be possible to search for example furniture.
- Security measures could be added. TODO
---
## Project timetable and division of work    

All parts of the project were done more or less equally and both partisipants worked on all parts of the project. In the table below the "Person responsible" is in name only.
Due date | Functionality | Person responsible | Current status | Completed
------------ | ------------- | ------------- | -------------| -------------
**1.3.2020** | Initial Project plan | Tapio,Timo | DONE | &#9745;
**4.3.2020** | Database model design | Tapio | ***In progress*** | &#9744;
**7.3.2020** | React setup | Timo | ***In progress*** | &#9744;
**9.3.2020** | Redux state design | Timo | Todo |&#9744;
**11.3.2020** | Authentication design and implementation | Tapio | Todo |&#9744;
**13.3.2020** | Finalize frontend | Timo | Todo | &#9744;
**15.3.2020** | Combine database,state, and frontend functionality | Tapio,Timo | Todo | &#9744;
**18.3.2020** | Test implementation | Tapio | Todo | &#9744;
**20.3.2020** | Return work | - | Todo | &#9744;
