# <img src="client/src/pictures/smartcookLogo.png" alt="logo" width=50 height=50> SmartCook

### Project Description:
Love to cook but always struggle to come up with ideas? 
SmartCook is a web app that keeps track of users' ingredient inventories and recommends recipes based on the selected filters and ingredients available on hand. Users can save and customize their favourite recipes into personal journals. To connect food lovers, users can also upload food pictures and vote/comment on pictures shared by others.

#### Additional instructions on how to use the app for better experience: 
- Before using the recipe recommendation feature, go to the ingredient inventory page and populate your inventory by adding the ingredients with the corresponding amounts (without the unit) and categories. You can edit/delete the ingredient/amount using the editing panel at the bottom of the table.
- When using the recipe recommendation feature, you can click the checkmark icon under a recipe card to check if you have all the ingredients (and sufficient amount of those ingredients) in your inventory to make that recipe. If you are able to make that recipe, the required amount of ingredients will be deducted from the ingredient inventory. 
- You can change the app to dark/light mode and upload/change the user profile picture under the settings icon. Both the Settings and the Create New Post dialog pop-up are draggable. 


### Project Goals:
#### 3-5 minimal requirements
* Create user interface design (used Material UI) ✅
* Set up database to store data (set up different collections in MongoDB to store user info, ingredient inventory, recipe data, journal entries, food pictures) ✅
* Set up user login using Google OAuth ✅
* Implement ingredient inventory tracker that tracks users’ ingredients that are available on hand ✅ 
* Implement recipe recommendation feature that recommends recipes based on users’ ingredients ✅


#### 3-7 standard requirements
* Implement ingredient category filters that allow users to select ingredients of the preferred categories to be displayed on the recipe recommendation page ✅
* Implement recipe journal feature to save users’ favourite recipes with annotations ✅
* Implement food picture post feature where users can upload/share their food pictures and like/comment on others’ posts (Instagram clone) ✅
* Implement user profile picture upload feature where users can change their profile pictures that are displayed on their food picture posts ✅
* Implement image carousel feature to display the top three liked/voted food pictures that are posted/shared by users ✅ 

 
#### 2-3 stretch requirements
* Implement a more personalized recommendation system to recommend recipes based on users’ most used ingredients/dietary restrictions (did not implement the most used ingredients feature but we added recipe filters [calories, cooking time, diet type, health labels] to improve/personalize the user’s recipe search; we also implemented a popular recipe feature that highlights the recipes most liked by users) ✅
* Create group chat feature (we decided to allow users to comment under the food pictures instead of creating a group chat feature on top of it) ⚠️
* Create online grocery shopping feature (we researched and found out that there were no online grocery shopping APIs that supported this feature) ❌  

### Technologies from Units 1-5:
#### HTML, CSS, JS

We use JavaScript XML (JSX), a HTML-like markup syntax for React to give structure to the web content, along with JavaScript (JS), which is a programming language used for web-based applications to create dynamic and interactive elements that engage the users. Using JSX with JS makes it easier to create React components and write scalable codes as JSX will be converted to JS objects, allowing us to write concise HTML/XML-like structures in the same files and put HTML into JS instead of a traditional web development where we have to put JS inside an HTML file. In terms of styling, we use Material-UI APIs (useStyles/withStyles) along with inline CSS to allow flexible styling of individual components.

#### React & Redux

We use React to build our responsive frontend and utilize its advantages of reusable components and real time rendering. We use Redux for global state management, since our frontend components need to communicate with each other and are dependent on many global and dynamic properties. We also used Redux-thunk middleware to write action creators to deal with asynchronous actions. Both React and Redux enable us to build highly scalable frontend components.

#### MongoDB

A NoSQL database is used in our project to allow flexible storage of varied types of information. This flexibility does not come in handy with a SQL database, which is restricted to only using tables that are related to foreign keys. MongoDB is used specifically because of its real-time integration and indexing efficiency, along with its free cloud base service, Mongo Atlas. The cloud base service aspect is detrimental when we compare MongoDB with other viable options like CouchDB which has a limited time free trial for its services. We used MongoDB to store user info, recipe journals, food pictures, ingredient inventory, and journal entries data.

#### Node & Express

We used Node.js and Express.js to connect the frontend and backend of our app. Node.js is a server-side runtime environment built on Chrome's V8 JavaScript Engine, which is fast, lightweight, and supports the development of scalable applications. It includes npm (node package manager), which we use to efficiently install and manage app dependencies. Express is a fast, minimalist web framework for Node.js that provides more features than solely using Node.js, allowing us to use middleware and simple, robust routing to handle HTTP requests. Express also uses less code to accomplish tasks then Node.js, making it easier for us to develop a fast, secure web application.

#### Release Engineering

We deploy our web app using Heroku, which is a cloud platform that enables developers to build, run, and operate applications. The deployment process and set-up on Heroku is relatively easy compared to other platforms that require more complex configurations and DevOps skills (e.g AWS), allowing our team more time to focus on building the web app. Also, Heroku’s integration with GitHub enables our team to build, scale, and deploy the latest version of code over the course of production easily.

### Above and Beyond Functionality:

One of the cool features of our web app is the recipe recommendation page, which is more user-centric and personalized than a standard recommendation app. Users can use the recipe filters (health label, diet type, cooking time, calories) to refine/personalize their recipe search. The checkmark feature on the recipe cards also demonstrates how the ingredient inventory integrates with the recipe recommendation feature, making the app more user-centric. While the ingredient inventory keeps track of the available ingredients, the recipe recommendation generates recipes based on selected ingredients. Using the checkmark feature on these recipes, ingredient amounts will be deducted from the inventory list. We used a Natural Language Processing (NLP) API to parse ingredient names and quantities from the recipe ingredient list. Ingredient names and quantities parsed by the API are then compared to the ingredient inventory to check whether or not the ingredients/amount needed are availab/sufficient. If all the ingredients required for a recipe are found available, the required amount will be deducted from the inventory by dispatching the ingredient inventory edit action. Users will then be alerted for missing ingredients or for being low in stock.

Apart from being a recipe recommender, another cool feature is that we implement the social aspect to our web app by creating food picture posts to connect the users. Users can view, like, and comment on all the food picture posts (Instagram clone). The top 3 voted/liked pictures of the recent 7 days are also featured on the landing page.

Our app also has the following extra functionalities:

- it is fully responsive.
- it uses two external APIs: a recipe API and a Food and Database API (with Natural Language Processing).
- it uses Cloudinary: an image service that enables direct uploading of images by users.
- it uses CKEditor: a rich text editor for better content creation experience when creating recipe journal entries.
- it uses algorithms: 1) to determine the most popular recipes based on all of the recipes saved by different users, 2) to compare the ingredient names/quantities (parsed by the NLP API) with the ingredient inventory, in order to check whether or not the ingredients/amount that are needed for a recipe are available/sufficient


### Next Steps:

We plan to implement the following features to improve the functionality and usability of our app:

* Real-time (push) notifications to notify users when other users like/comment on your food pic post.

* Individual hyperlink for both the food picture and journal entry so that users can share journal entries along with the corresponding food picture posts if they desire. This will help to connect the journal and food picture posts features together.

* Social media share button that allows users to share the journal entries/ food picture posts to external social media applications (e.g Facebook).

* For the recipe recommendation page, we will improve the algorithm that parses ingredient names and quantities from the recipe card ingredient list to detect ingredients with more precision. The current algorithm is unable to detect general ingredients from specific types of that ingredient. For example, it cannot determine that "mushroom" is a general form of "brown mushroom".

### List of Contributions:

#### Samantha Lee

I implemented the user authentication of the app using Google OAuth, storing permanent user data into MongoDB and impermanent user info into Redux. I developed the dark mode feature, creating a toggle button that allows the user to view the app in either a light or dark theme. I also styled the recipe recommendation page and recipe cards, implemented the functionality of two recipe filters and the detailed view of recipe cards to display additional info, and implemented the functionality of the navigation bar to navigate between pages using react-router-dom elements.

#### Sheena Ng

I implemented the Instagram-clone food picture post features where users can upload food pictures, like/comment on other food pictures with CRUD operations (e.g edit post caption/ comments, delete the post/comments). I also implemented an individual food picture post collection where each user can view and manage all the posts they have uploaded. I designed the logo and landing page of the app, implemented React carousel to showcase the most recent top-liked food pictures, added user profile picture upload functionality as part of the app’s settings, and styled the inventory table that contains sorting functionality and pagination.

#### Xi Huang

I designed and implemented the recipe recommendation feature which takes user input, calls external API and renders the return results to a list of recipe cards, with options of saving the favorite recipes and viewing the most popular recipes. I also implemented the personal journal feature with a rich text editor, enabling users to create and preserve their desired formatting. I integrated the recommendation and the personal journal by adding the feature of importing information from the recommendation to the journal editor. In addition, I set up the image service endpoint which allows users to upload their own pictures.

#### Aly Abouzaid

I implemented the ingredient inventory which is where users get to access and store their online kitchen. Ingredients are entered along with their categories to guide users easier access to certain ingredients when looking for recipes and amounts are used to keep track and verify the possibility of making a recipe. I also implemented one of the cool features of our app which ties the recipe recommendation back to the ingredient inventory. The feature checks whether a user will be able to make a recipe based on the ingredients they have in their online kitchen. A natural language processing API was used to break down recipes to their ingredients and amounts.

### Prototype sketches:

<img src="/client/gallery/logIn.png">
<img src="/client/gallery/homePage.png">
<img src="/client/gallery/ingredientInventory.png">
<img src="/client/gallery/g1.png">
<img src="/client/gallery/g2.png">
<img src="/client/gallery/g3.png">

