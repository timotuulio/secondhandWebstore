
# WWW Programming Part 2 Coursework Project plan
## Course project group information
#### Group Name: X
Tapio Nevalainen | Timo Tuulio
------------ | -------------
80997 | 415428
<tapio.nevalainen@tuni.fi> | <timo.tuulio@tuni.fi>

#### GitLab repository: <https://course-gitlab.tuni.fi/tieta12-2019-2020/x>

---

## Planned functionality

<div style="text-align: justify">
We will start by designing the database and Mongoose schemas that can be done without worrying about the frontend. After this API can be designed and implemented. Next, basic frontend is implemented with React, along with the Redux state design. Authentication is designed at this point; we are planning to use JSON webtoken authentication. Frontend is finalized and all the parts are tied together. Finally, some tests are implemented. See project timetable in the end of this file.

</div>

---
## Pages and navigation
The site includes a static navigation bar that has links to main page and most other pages. Depending on the users authentication only some navigation links are shown. On the graph this is marked with letters. U for user, S for shopkeeper and A for admin. Note that shopkeepers authetication includes the users authentication.
``` mermaid
graph TD
  Log(Login) --> |not<br/> Registered?| Reg
  Reg(Register)
	MP{{Mainpage that includes <br/>all vendible items}} --> |log in| Log
  MP --> |register| Reg
  MP --> |USA:Check <br/>own profile| Prof
  MP --> |A:check users| LU
  MP --> |S:Own sellings|OwnSells
  MP --> |U:Own offers|OwnOff
  MP --> |SA:CheckOffers|Offers
  MP --> |click item| Item
  LU(List of users) --> |A:Check profile<br/>of a single user| Prof
  Prof(Users profile) --> |A:Check what <br/>shopkeeper sells|OwnSells
  Prof --> |A: Chek users offerings|OwnOff
  Prof --> |USA: Edit info| Edit(Edit profile)
  OwnOff(Own offerings <br/>that haven't<br/> been sold yet)
  OwnSells(Items that the <br/>shopkeeper sells) --> |S:click item|Item
  Item(Info about<br/>single item) --> |U:buy|Buy
  Buy(Payment page)
  Offers(Offers that <br/>users have<br/> given)

```

---
## Modules your group created in your Node project    
Our planned working directory is as follows:
<pre><code>
Directory
- package
- Public
  - index.html
- src
   - Actions
    - actions.js
  - Reducers
    - rootReducer.js
    - reducer1.js
    - reducer2.js
  - Routes
    - api.js
    - user.js
    - shop.js
  - Components
    - header.js
    - item.js
    - user.js
    - allItems.js
    - allUsers.js
  - app.js
  - api.js
- readme.md
</code></pre>
---
## Mongo database and Mongoose schemas    
<div style="text-align: justify">
There will be two main models for User and Item, and an additional model for ListItems, that links users and items together.
User model models individual user that is assigned one of the available roles. Email is used to identify an individual user and in login.
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

Item model models individual item that is sold in the shop. OwnerID links every item to individual user. There might be an option to add image of the item.
<pre><code>
ITEM
- ownerID: STRING
- price: FLOAT
- image: img
- description: STRING
- selfLink: STRING
</code></pre>

ListItem model models relations between users and items. List of items that relate to an individual user consists of those that belong to that user. There will be dummy users for retrieving all sold items and all offered items.
<pre><code>
ListItem
- userID: STRING
- Items: List of Items
</code></pre>


---
## API
We use api-calls as such  GET for fetches, POST for adding new content, PUT for update and DELETE for deleting.  
For the API, we use the following URLs. 

Description | API path 
------------ | ------------- 
All users | /api/user 
Single user | /api/user/:id 
All items | /api/item 
Single item | /api/item/:id 
List of users with items | /api/listitems 
Single users all items | /api/listitems/:id 


---
## React and Redux  

React-redux will be utilized. React for UI and redux for handling the state of the app.


---
## Testing

Automatic testing is considered. Otherwise manuallt testing urls with different authentication, and users/items with different kinds of values.

---
## Project timetable and division of work    

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
