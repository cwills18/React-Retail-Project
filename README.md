# React-Retail-Project

This website is a work-in-progress implementation of a retail website made with React for a fake company called Silly Socks. Currently, the major emphasis has been on functionality, so the website is not particularly responsive yet. For this reason, it is best viewed on a desktop computer of screen size 13"(ideal) or larger.

The current features that have been developed for this project include:
- A Firebase database of products, as well as an additional database for users (although currently the webpage is set to function with a specific user ID only, which is loaded on mount of the homepage).
- A basic user interface with Home, Shop, Saved Items and Checkout pages, as well as a detailed page on each product where uesrs can select sizes before adding to the cart.
- A working cart mechanism that stores and updates key values like prices and quantities for different sizes locally first (for quicker updating of the user interface), and then sends updates to the user's cart in Firebase.
- Stock quantities are updated as the user adds and removes items from the cart.
- A working search bar component which returns results that contain the search terms in their name, description, colours or categories.
- Two different React carousels on the home page.
- Functionality for users to save products by clicking the star on the product image, and then accessing their saved items through the star icon in the navbar. These items are also saved as favourites to the user in Firebase.
- Various functions for formatting prices and strings into sentence case for consistency.

Improvements that still need to be made:
- Responsivity needs to be added.
- There is currently a bug with one of the functions causing an error in firebase somewhere when the homepage loads. I have not yet located the cause of this error, or figured out if it is impacting the user interface. 
- Currently there is no feedback given to the user when the products they have in their cart have reached the maximum limit of available stock. While there is code in place to stop them adding more to the cart at this point, I would also like to add something that says "Maximum items reached" or something along those lines.
- Currently the user cannot add to saved items from within the detailed product page. Would like to add this functionality also.
- Functions that communicate with the databases potentially need some refactoring. Currently the functions are a bit long and at times are repeating steps (like checking if an item is in the cart). If I had more time, I would like to clean up these functions a bit more and potentially make smaller functions that do less.

