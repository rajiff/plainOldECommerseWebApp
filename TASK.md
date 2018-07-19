### Task Details -
 
eCommerce company ABC sells their products on their website. 
Company currently gets products from 3 vendors X, Y and Z.
 
Implement the following for company ABC -
 
1. Provide a page for Vendors where they can identify themselves (X, Y, or Z) and submit a product to ABC
2. For each product vendor should be able to provide name, description, image, quantity available and price per unit
3. Provide a products page for ABC employees to see the products submitted by X, Y, Z
4. If an ABC employee is on the products page and a vendor submits a product, it should immediately and automatically show up on ABC's page without requiring any page refresh or other action from the user.
5. ABC is a data-analytic thinking company, wants to track everything about the vendor as to what they do during product submission. Product submission page must do complete event tracking which captures all mouse movements, clicks, scrolls, keystrokes, text entered and form fills. That means even when a user stops half way through without submitting product, there will be some data captured from the user.
 
Plan and design keeping in mind the bigger scope, scale and growth.

### Assumptions
1. Vendors need a separate page for login, all other type of users will login from the normal main login page
2. Only vendor's submit product page has to be event tracked for user experience and usage insights 
3. ONly for ABC's employee a real time product update has to be pushed for other type of users its not required
4. the Data captured from the product submission will be accessible only for a admin user in a separate page


#### Notes 
1. Though from assumption it looks like vendor needs a different page to login, i have chosen to login from sampe page, however code is designed to easily change over if a separate page is required 
2. The site is responsive and layout is fluid to suite to different device sizes
3. Have not used Angular, as thought its a bit of over kill for the current scope of the app
4. Have not used role based authorization, as only one place we would have used it and took shortcut to save time in completing the project
5. Pagination too is done in simpler way (hence if pages run beyond XX number, the layout may look awkward)
6. App follows MVC architecture
7. Have used a command patten to code the routes and app follows easier structure to represent model, view & controller all seprate and also keeps the infra at bay
8. Signup page is provided with role as dropbox to be chosen by user signing up, however if this would have been a real production requirement, i would have serpated it and differ on that context