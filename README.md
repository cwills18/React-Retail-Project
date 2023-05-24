# React-Retail-Project


## Demo & Snippets

-   Include hosted link

---

## Requirements / Purpose

-   This eCommerce website was a project for my coding training. 
-   Developed in React for quick building of product grid in conjunction with data stored in Firebase/Firestore

---

## Design Goals / Approach

-  I started by sketching what I wanted the end result to look like on both a mobile/tablet device, and a larger screen on a computer
-  Next, I identififed which components I would need to create and what containers and contexts would be needed to support the required functioning of these components
-  Because I initially only had 7 days to work on this assignment, I decided I didn't have time to make the website both functional and responsive, so I decided to focus on functionality first, as I was not very familiar with React at the time and thought this would be the best use of the time. For this reason, it is best viewed on a desktop computer of screen size 13"(ideal) or larger until I have the chance to make it responsive.

---

## Features

- A Firebase database of products, as well as an additional database for users (although currently the webpage is set to function with a specific user ID only, which is loaded on mount of the homepage).
- A basic user interface with Home, Shop, Saved Items and Checkout pages, as well as a detailed page on each product where users can select sizes before adding to the cart.
- A working cart mechanism that stores and updates key values like prices and quantities for different sizes locally first (for quicker updating of the user interface), and then sends updates to the user's cart in Firebase.
- Stock quantities are updated as the user adds and removes items from the cart.
- A working search bar component which returns results that contain the search terms in their name, description, colours or categories.
- Two different React carousels on the home page.
- Functionality for users to save products by clicking the star on the product image, and then accessing their saved items through the star icon in the navbar. These items are also saved as favourites to the user in Firebase.
- Various functions for formatting prices and strings into sentence case for consistency.

---

## Known issues

-  Responsivity needs to be added.
- Currently there is no feedback given to the user when the products they have in their cart have reached the maximum limit of available stock. While there is code in place to stop them adding more to the cart at this point, I would also like to add something that says "Maximum items reached" or something along those lines.
- Currently the user cannot add to saved items from within the detailed product page. Would like to add this functionality also.
- Functions that communicate with the databases potentially need some refactoring. Currently the functions are a bit long and at times are repeating steps (like checking if an item is in the cart). If I had more time, I would like to clean up these functions a bit more and potentially make smaller functions that do less.
- Socks that don't have both adult and kids sizes available are sometimes taking too long to assign the appropriate category to the size, resulting in some socks being sent to the database as "null XL" instead of "adults XL". Need to look at alternatives for this code.

---

## Future Goals

-  Address issues above
-  Use Stripe's developer mode to implement a checkout process
-  Add user feedback about required fields (eg: red borders) on the product page when users try to add a product to the cart without selecting the size.

---

## Change logs

-   Write a paragraph labelled with the date every day you work on the project to discuss what you've done for the say. Be specific about the changes that have happened for that day.

### 24/05/2022 - {Bug fixes}

- Fixed bug causing an error in firebase when the homepage loads. This was caused by intiial user state being an object, rather than null.
- Rewrote price formatting service function to allow for computer rounding issues.
- Added a useEffect in CheckoutSummary related to totalSavings state, so that savings would display accurately when checkout page loads.

---

## What did you struggle with?

-  Because the state setters that interacted with the database were quite slow, I had issues with needing to create local states for several fields and do periodic checks that they matched the database states in different components to avoid bugs. This has resulted in a lot of code and states to keep track of. Would like to learn Redux and use this as a potential solution.



