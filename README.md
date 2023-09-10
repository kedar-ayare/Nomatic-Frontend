## The submission is divided in 2 Git Repos.

[Frontend](https://github.com/kedar-ayare/Nomatic-Frontend)

[Backend](https://github.com/kedar-ayare/Nomatic-Backend)

The submission is made using React-Native, NodeJS + ExpressJS, MongoDB Atlas.

To try use the app, download the .apk file in the Frontend Repo, pull both repo in your local machine. 

Use **"npm start"** to start the development server and add your's device's **IPv4 address** in the add's debug menu's Bundel Location along with **":8081"** as the developement server runs on the port 8081.

Use **"nodemon index.js"** to start the Node server which would run on port **3000**.

I have used a third party tool called **[NGROK](https://ngrok.com/)** that helps in tunnelling the port 3000, so that we can access the backend eventhough it's running on local machine. The link from NGROK should be added to the **"data.js"** file in **"utilities"** module in Frontend Repo.

### Modules used in the Project:

#### Frontend:
    "@react-native-async-storage/async-storage": "^1.19.3",
    "@react-native-community/blur": "^4.3.2",
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/stack": "^6.3.17",
    "axios": "^1.5.0",
    "react": "18.2.0",
    "react-native": "0.72.4",
    "react-native-check-box": "^2.1.7",
    "react-native-modal-datetime-picker": "^17.1.0",
    "react-native-picker-select": "^8.1.0",
    "react-navigation-stack": "^2.10.4"

#### Backend:
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "4.1",
    "mongoose": "^7.5.0",
    "nodemon": "^3.0.1"


## App Screenshots:

### 1. Login Page - Common for users and admin
<img src="https://kedarayare.000webhostapp.com/nomatic/ss-01.png" width="300">
This screen uses 2 text fields to get email and password input from user. Once validated, it stores the received User Token in local storage using AsyncStorage module.


2. Home page with list of Products
<img src="https://kedarayare.000webhostapp.com/nomatic/ss-02.png" width="300">
This screen upon loading fetches product details, user cart and user past order details using axios which are stored in state variables. The products are showed using a component called "ProdCard". This screen also shows the number of items in user cart at the top.

3. When a product is added to a cart
<img src="https://kedarayare.000webhostapp.com/nomatic/ss-03.png" width="300">
This screen displays the UI changes once user adds a prod to the cart. The **"Add to Cart"** text is replaced with **"Remove from Cart"** and the item count in cart is increased.

4. Cart Page
<img src="https://kedarayare.000webhostapp.com/nomatic/ss-04.png" width="300">
The cart is displayed using a modal, that shows list of items in cart using the component "ProcCompact" with a button to confirm button


5. When Order is Confirmed
<img src="https://kedarayare.000webhostapp.com/nomatic/ss-05.png" width="300">
This images shows how user is prompted when the order is confirmed and asked to go back to home screen.

6. Order History
<img src="https://kedarayare.000webhostapp.com/nomatic/ss-06.png" width="300">
This screen shows all past orders of a user.


## Users in DB

### Customer email: "Test" password: "Password"
### Admin - email: "Admin" password: "Admin"


## Due to time constraint, I couldn't complete all requirements
### 1. Sale initiation feature is not implemented from both frontend and backend.
### 2. Some error in backend with respect to token verification that causes the need to restart server.
