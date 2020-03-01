
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
We will start by designing the database and Mongoose schemas that can be done without worrying about the frontend. After this API can be designed and implemented. Next, basic frontend is implemented with React, along with the Redux state design. Authentication is designed at this point; we are planning to use JSON webtoken authentication. Frontend is finalized and all the parts are tied together. Finally, some tests are implemented.

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

---
## Mongo database and Mongoose schemas    

---
## API

---
## React and Redux

---
## Testing    

---
## Project timetable and division of work    

Due date | Functionality | Person responsible | Current status | Completed
------------ | ------------- | ------------- | -------------| -------------
**1.3.2020** | Initial Project plan | X | ***In progress*** | &#9745;
**4.3.2020** | Database model design | Y | Todo | &#9744;
**7.3.2020** | React setup | X | Todo | &#9744;
**9.3.2020** | Redux state design | Y | Todo |&#9744;
**11.3.2020** | Authentication design and implementation | X | Todo |&#9744;
**13.3.2020** | Finalize frontend | Y | Todo | &#9744;
**15.3.2020** | Combine database,state, and frontend functionality | Y | Todo | &#9744;
**18.3.2020** | Test implementation | X | Todo | &#9744;
**20.3.2020** | Return work | Y | Todo | &#9744;
