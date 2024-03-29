## Instructions:

1. To run the backend, navigate to /backend and type `npm start`. 
- The app will run on port 3000

2. To run the frontend, navigate to /frontend and type `npm start`.
- The app will run on port 3001

3. I used my own live cluster that contains updated data. If you prefer to use your own local mongodb connection, please feel free to change it.

## Exam Notes:
Issues I've found and some changes that I've made.

1. Initially, after creating a user profile, it wouldn't appear in the list unless the page is refreshed, resulting in a poor user experience. I fixed this by triggering the **`getAllProfiles`** action after successfully creating a new user profile.

2. I moved the creation of the user profile to a modal because it should not occupy a lot of space in the UI. This not only improves the UI but also enhances the overall user experience.

3. I added an update functionality to every user profile and implemented it in the Profile Form Modal, just like where the user profile gets created. This was done intentionally to create a reusable component for both the update and create functionalities.

4. I applied a delete functionality for each user profile, along with a dialog component to help prevent accidental deletion of the user's profile when the button is clicked. This enhances the user experience of this feature.

5. I added functionality for creating, displaying, and editing tags.

6. There's an issue with the initial setup that might cause some performance bottlenecks in the future if not fixed. The problem is that all the components are rendered in the App component. So when DataTable updates, it affects User Management as well. The solution I applied is to separate the components based on their features into different files to avoid re-renders whenever one of their states updates.

7. In the backend, I found an issue in **`getProfileById`**. I resolved it by changing the conditional statement to simply apply the **`find`** method.

8. Initially, the search filter had poor performance because it scanned all the data in the table one by one. Since the table has 1000 items, displaying all of them at once in the UI is not advisable. My solution was to apply virtualization to the table to efficiently render the large dataset in the UI. This optimization improves performance and memory usage.

9. I changed the **`dataItems`** state from state to constant since it doesnt need a state update.

10. There was an issue with the **`total`** function in the DataTable; I fixed it to accurately calculate the total when the items update.

11. I sorted the `getAllProfiles` query in descending order to have the newest user profile data on top.

12. In the profile form, the submit button will be disabled if either the 'name' or 'email' fields are empty. Additionally, I have aligned these validations with those specified in the Mongoose schema to provide an additional layer of validation on the backend.

## Tools used:

1. I chose MUI as the UI framework for this project primarily due to its reusable components, which allowed me to complete the project quickly. However, in large-scale applications, I don't commonly recommend MUI or any CSS-in-JS approach, as parsing might cause a slight performance overhead on some components if not done correctly. In such cases, I prefer using TailwindCSS, Bootstrap, or just plain css.

2. I applied a large dataset renderer from **`react-virtualizer`** to fix the performance issue present in the DataTable component. In some cases, I might create my own virtualizer based on specific needs, especially if the items are too dynamic to display. However, in this case, the library helped to resolve the problem quickly.

## Additional notes:

1. In the backend, I retained the app's initial structure without making changes, since it's unnecessary to update and abstract different parts into separate directories. However, for larger applications, I would consider organizing it by creating separate directories for `services`, `models`, `controllers`, and `router`. This approach can enhance the overall structure of the app. I can also add additional layers of validations to ensure sure that the entry points for each of these features have solid security.
