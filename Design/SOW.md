# Statement of Work:
Victoria Chin, Lal Celikbilek, Ira Hysi, Amani Scarborough, Sunkwan Kim
## Description of project:
The team aims to create a version of Google Spreadsheets called HuskSheets using **Java with SQL** for backend operations and **Typescript/React** for frontend operations. We’ll be using **VSCode** as an IDE and **JUnit** testing. The frontend operations mostly consist of handling the clients actions and managing the GUI while the backend operations will focus on performing operations within the server. We are aiming to use a REST library to communicate between the server and client. It will mainly handle requests and responses. HuskSheets will include features like authentication, creating new sheets, editing existing sheets, seeing changes made by other clients/users, etc. Users will be able to create/sign into accounts and make changes to these spreadsheets.
## Summary Table
\# | Item | Priority | Value
--- | ----------- | --- | ---------
\- | MVP | - | -
1 | The HuskSheets server connected to a database is created and accessible for simple data manipulation. | High | Required for MVP - We must have one server to store the sheet's data
2 | The HuskSheets GUI is created to show the basic cells from the client’s side. | High |Required for MVP - We must be able to show a basic user interface for the user clients.
3 | A basic API is created to communicate between the server and the client. (Get sheets, update sheets) | High | Required for MVP - We must set up a basic API protocol to send data between the server and the client.
4 | A user system is created in the server where each user has ownership over their own document. | High | Having a user system is important as it allows users to safely own the documents, and it prevents other users from making unwanted modifications to the sheets. 
5 | A user should be able to log in to their existing account or sign up to HuskSheets (Server + GUI). | High | Having users can allow users to share the document with multiple users and collaborate on the same data.
6 | A user can create and edit the sheet and have the new data persisted in saved files (Server + GUI). | High | The changes made by the users should be preserved so that the same user or other users can access the sheet at a later time. The changes made should be saved so that they aren’t lost.
7 | A user can see documents created by the other users (GUI). | High | Several users should be able to use HuskSheets and collaborate on certain documents. To ensure collaboration users must be able to see other documents created by other users that they have access to.
8 | Other users should be able to see the changes the owner makes (GUI + Server). | High | Other users being able to see the updates made by the original user is important as some important changes might occur while other users are on the same sheet.
9 | A user can open documents created by the other users. | Medium | To allow collaboration a user must be able to open the other documents.
10 | The users can safely delete their sheets. | Medium | Deleting documents can free up more space in the storage, and only owners can delete their documents - preventing malicious activity from other users.

\# | Desirables | - | -
--- | ---------- | --- | -----
11 | On the HuskSheets GUI users should be able to type in functions to perform several calculations | Medium | Users will oftentimes use HuskSheets to keep track of data that can be used to perform certain operations or used to observe certain patterns. Hence, a feature where they can perform simple mathematical calculations would be very helpful.
12 | Users can edit other users’ sheets. (Git Fork style - other users make a copy of the document and the owner can accept others’ changes) | Medium | For several users to be able to collaborate on sheets we need to ensure seamless integration of changes made by the users. Being able to collaborate is important as HuskSheets might be used by larger groups of people that want to access and edit the same information.
13 | The users should be able to sort their data according to certain criteria (like alphabetical, time, etc) | Low | Being able to sort data is valuable as we can visualize the data according to its importance, and it can help with better navigation through large amounts of data.
14 | Users can add more rows and columns. | Low | Users may need to add more rows and columns if they are working with a vast amount of data.
15 | Users can select single or multiple cells and are able to cut, copy, paste, and delete a cell or cells. | Low | Cell selection and basic cut, copy, paste, and delete operations as it improves your productivity.

\# | Bonus Features | 
--- | -----------
16 | On the HuskSheets GUI users should be able to change the color of the cells and text
17 | On the HuskSheets GUI users should be able to create graphs by selecting columns and rows. They should select the type of chart they prefer (line charts, bar charts, pie charts, or scatter plots) and the data they’re going to be displaying on the chart. In the backend this will be translated into JSON and sent to the frontend to be displayed using a library such as Chart.js.
18 | The user should be able to format a number input on the sheet as a currency. By setting a cell as a certain currency such as the US dollars, pounds, euros, etc. there will be that currencies symbol next to the decimal and it would be rounded up to correct value. 
19 | The user can choose the option to round a numerical value in a cell up to a certain decimal point.

## MVP:
### Basis (Described above):
1. Server
2. UI
3. API
### Creation:
4. User accounts should be defined
   - Program will allow the user to choose to register a new account or login into their existing account. (front end - UI)
   - Choosing to register a new account will display a dialog box that allows the user to enter their information. (front end interaction from user that calls click listener in back end)
   - Pressing enter on this dialog box will call a corresponding query that inserts the user’s information to the database (front end interaction from user that calls click listener in the back end, also database management)
   - Logging into the system with their information will display a list of their corresponding sheets by calling a query that pulls the user’s sheets from the database (front end interaction from user that calls click listener in the back end, also database management)
    - Should a user provide incorrect information while logging in that does not correspond to a valid user account, an error message should be displayed warning the user its account could not be found (user query to cross-reference possible account combinations and whether the user’s information exists: front end - UI, also database management).
5. Users can make a new sheet
   - User can click a button that opens a new panel to represent the new sheet they wish to make (front end interaction from the user that calls click listener in the back end). 
   - The new panel should instantiate with a large grid of cells which can contain numeric or character values the user has provided. 
   - The panel should also contain a button to save the sheet, set its title, along with the option to share a sheet with other users in the system. (front end UI)
   - Once the user presses the exit button to close the panel, the previous list of sheets should be displayed. (the backend will store each cell’s input locally and then a call to the database inserts this sheet to the user’s specific account of sheets. 
   - If the user selects to open an existing sheet, the sheet with its grid of cells and corresponding input will be displayed. (front end managed by database call to that sheet’s specific contents).
6. Users can share sheets with other users
   - On the sheet panel, if the user selects to share the system, whoever they decide to share the panel with should be added as collaborators to the sheet. (front end UI, database call to insert the sheet to the collaborator’s repertoire of sheets). 
   - Users should be able to see and open the sheets created by other users. Users should be able to see changes other users make. Updates made to the sheet by any user that it has been shared with should be seen by all other collaborators. (editing the cells will require constant updating of the original cell’s information in the database, which then updates the sheet’s information as a foreign key for each collaborator).
7. Should be able safely to delete a sheet
   - In the panel containing the list of sheets accessible to the user, the user should be able to select at least one sheet, at which point a delete button will appear to provide the user with the option to delete the sheets. (front end managed by click listener in the backend).
   - Should the user select to delete the selected sheets, the sheets will be removed from the user’s account. Should the owner delete the sheet, the sheet will be delete from all user’s accounts. Should the sheets be deleted by a collaborator and be accessible to other collaborators as well, the sheet will still be accessible to these collaborators who have not deleted the sheets. (database management, delete from the user’s table in the database, but not the overall database).

## Desirable Features
8. The users should be able to type in functions to perform simple calculations on the sheet
   - The user should be able to input a formula using an “=” sign where two numbers are separated by an operator. For example, a cell input could resemble (=1+2). 
   - Pressing enter in this cell will parse the cell’s input to calculate the formula present in the sheet. It will also replace the cell’s input to the formula answer. (back end parsing and calculation of cell input to database update).
9. The users should be able to sort their data according to certain criteria (like alphabetical, time, etc)
   - The user should be able to select multiple cells. Once this selection has been made, a button at the top of the screen will allow the user to sort through the input alphabetically or numerically. (front end managed by click listener in the back end)
   - The sorting will collect the cell input and determine if it is of a numeric or letter value. It will then sort the inputs internal and replace the cells input to mirror the sorted version of the inputs (back-end sorting algorithm reflected by update statements to the database). 
10. Being able to add more columns or rows to the initial sheet
    - When a user chooses to create a new sheet, the first dialog box will display the size of the sheet (100 x 100 cells, for example). The user can change this size as they see fit. (front end UI)
    - When the user presses create, a sheet is created with the user-specified size (front end managed by click listener in the back-end). 
    - On the sheet itself, there will be another button that will allow the user to insert more rows or columns to the sheet. (front end)
    - Clicking the button to insert more rows will display another dialog box prompting the user to provide the number of rows to insert. (front end managed by click listener in back end). The same will be true for deciding to insert more columns. 
    - When the user clicks “insert” after this second dialog box with the number of rows/columns, the sheet size will be updated, and empty cells that are contained by those number of rows and columns will populate the sheet. (back end click listener prompting changes in the front end and database)
11. Cells Selection - Copy, Paste, Delete
    - Users should be able to interact with cells through basic commands on their keyboard (front end managed by key listener in the backend). 
12. Users can edit other users’ sheets. (Similar to Git Fork)
    - If a new change is made by the owner, other users will have the updated document. If the other users were working on it, they can still view the updated original document, but they will have their own copied version that they are working on.
    - If a new change is made by other users, the owner can choose to accept the changes. The owner will be able to see different copied versions of the documents.

## Additional Features (Bonus)
13. Being able to color cells and change fonts
    - User should be able to select cells and have them stored as cells to alter aesthetically (front end to back end storage)
    - There should be a panel at the top of the sheet that displays a drop-down menu of colors that can be used for the bucket fill for the cells and for the font types that can be used for the cell inputs. 
    - After selecting the cells, the user can select one color from the bucket fill options and one font from the font types. This will update the appearance of the cells to be a different color and a different font (back end reflected by front end)
14. Being able to create a graph from selecting two columns/rows
    - User should be able to select two columns or two rows that appear next to each other on the sheet. The inputs in the cells contained by the columns/rows will be stored as corresponding x-coordinates and y-coordinates. (local backend storage)
    - These lists of x and y coordinates can be used to generate line charts using the CanvasJSReact package react-charts. (front end display)
15. Freezing a column/row
    - Users should be able to select a column and store the values that appear in the cells. (front end to local backend storage)
    - There should be an option at the top of the sheet for the user to “freeze” the selected cells. (front end managed by back end click listener)
    - Once the “freeze” option is selected, allowing the user to scroll to other columns or rows will show that selected row or column as constant on the sheet by populating a fixed panel to the far left with this column’s cell values. (front end)
16. Format as currency button
    - User should be able to select a set of cells and store the values that appear in the cells (front end to local backend storage)
    - There should be a “format as currency” button at the top of the sheet. Once selected, this will place a “$” sign at the beginning of every cell’s input. (front end managed by back end click listener)
17. Rounding decimal numbers (rounding up to a certain digit)
    - User should be able to select a set of cells and store the values that appear in the cells (front end to local backend storage)
    - There should be a “round” button at the top of the sheet. Once selected, this will round the values of the digit up/down depending on the decimal point of the digit. This will also update the value of the cells of the sheet in the database (front end update, update query in the database for the sheet table)

### Hidden bonus:
- Predictive text

# User stories and use cases:
## Name: Learning about and implementing REST libraries
- Actor: Developers 
- Stakeholders and Interests:
  - User: Users will be committing actions which should be received by the server. Hence, the GUI and client will be sending requests to the server.
  - System: Must be able to accept and handle the requests sent by the clients and must be in communication with the clients
- Preconditions: The user has opened application and make a change that is sent as a request to the server
- Postconditions: The server will accept then handle the requests made by the client and the client will be able to view its response.
- Basic Flow:
  - Clients make changes: The system tracks changes made by the users
  - View Changes: The user should be able to view the changes that they’ve made.
  - Accept or Reject Changes: Depending on the changes the server will accept or reject the changes and then move onto handling them correctly
  - Handle changes: The server should handle the changes accordingly
  - Send Response: Once the server has handled the changes it should send a response to the client
  - View changes: The client should be able to the view the result of the changes sent back from the server
- Extensions (Alternative Flows):
  - Error Handling:
    - The REST library we use should handle any issues with the communication between the client and the server
- Special Requirements:
  - The REST library should handle most of this work
  - Our group members must learn about different REST libraries and focus on its implementation
- Open Issues:
  - How to handle conflicts with the requests and responses?
## Name: Create user account
- Actor: User
- Stakeholders and Interests:
  - User: Wants to register an account with HuskSheets
  - System: Needs to ensure the user account exists after registration and that all sheets associated with the user are consistent.
- Preconditions: The user has not created an account with the system but has opened the system. 
- Postconditions: The user account is saved with their corresponding data
- Basic Flow:
  - Register: The system provides the user with a register dialog box that allows the user to input their user-specific information.
  - Register Error Handling: The system checks for invalid user information (account already exists, email address invalid, etc.) when the user asks to register their account. If no invalid information is provided, the account can be registered and saved with the system. 
  - Login: Users can log in using the credentials they previously provided to register their account. 
  - User Profile: Once logged in, users can continue to interact with the sheets they have created. 
- Extensions (Alternative Flows):
  - Error Handling:
    - If a user has not registered their account with the system, an error dialog box will appear preventing the user from logging into their account. 
    - If a user has provided invalid information while registering for their account, an error message will appear preventing the user from registering an account. 
- Special Requirements:
  - The system should not allow duplicate user accounts. 
- Open Issues:
  - What is the identifier for a user account that associates a user to their sheets? 
## Name: Create new sheet - Front end
- Actor: User
- Stakeholders and Interests:
  - User: Wants to create a new sheet
  - System: displays a grid of cells and other UI components that allow the user to interact with the sheet.
- Preconditions: Once logged in, the user chooses to create a new sheet. 
- Postconditions: The user can interact with the sheet. 
- Basic Flow:
  - Create New Sheet: Once logged in, the user clicks the button that allows them to create a new sheet.
  - Sheet Size: First a dialog is opened to allow the user to set the size of the sheet (# of rows vs # of columns).
  - Sheet Display: The click listener for this “New Sheet” button displays a new pop-up panel that contains the set number of cells by cells to form a grid. The UI also contains a menu located at the top that allows the user to customize the cells, share the sheet, sort the cells, save the sheet, etc. 
- Extensions (Alternative Flows):
  - Error Handling:
    - If a user chooses to create a sheet that has 0 rows or columns, or an excessive number of rows and columns (> 1,000,000,000)
- Special Requirements:
  - The user must be logged into their account
- Open Issues:
  - Will the size of the sheet be constant once initially set by the user?
## Name: Create new sheet
- Actor: System
- Stakeholders and Interests:
  - User: Wants to create a new sheet
  - System: Stores the sheet to the user’s associated list of sheets. 
- Preconditions: The user must already be logged into the system. 
- Postconditions: The user account is saved with their corresponding data
- Basic Flow:
  - Login: The user has effectively logged into the system, at which point the system has access to their corresponding files. 
  - Create new sheet: The user selects to create a new sheet, which ultimately opens a window to display the sheet to the user. 
  - Saving the sheet: At the top of the panel, users can select to save the sheet. The system stores the data present in each cell of the sheet in a backend database, where the sheet is inserted to the user’s specific table of sheets accessible to them. 
  - Updates to the sheet: Updating this sheet and pressing save will overwrite the previous cell values in the database and update the table values. 
- Extensions (Alternative Flows):
  - Error Handling:
    - If the user attempts to save a file sheet with a title that already exists in the database. 
- Special Requirements:
  - The system should not allow duplicate files.
## Name: Open new sheet 
- Actor: User
- Stakeholders and Interests:
  - User: Wants to open an existing sheet
  - System: displays a grid of cells with the corresponding content that has been stored in the database and other UI components that allow the user to interact with the sheet.
- Preconditions: The sheet must exist in the user’s list of files. 
- Postconditions: The user can save and update the file’s contents. 
- Basic Flow:
  - Login: Once logged in, the user clicks the sheet that they would like to open.
  - Sheet Display: The click listener for selecting a sheet displays a new pop-up panel that contains the set number of cells by cells to form a grid. The UI also contains a menu located at the top that allows the user to customize the cells, share the sheet, sort the cells, save the sheet, etc. 
  - Saving the sheet: At the top of the panel, users can select to save the sheet. The system stores the data present in each cell of the sheet in a backend database, where the sheet is inserted to the user’s specific table of sheets accessible to them. 
  - Updates to the sheet: Updating this sheet and pressing save will overwrite the previous cell values in the database and update the table values. 
- Extensions (Alternative Flows):
  - Error Handling:
    - If a user chooses to open a sheet that has been deleted by its owner (that is not them). 
    - If a user chooses to open a sheet that they have already deleted. 
- Special Requirements:
  - The user must be logged into their account
- Open Issues:
  - If the user does not own the sheet, how can changes to the file be transferred to other users. 
## Name: View other user’s sheets
- Actor: User
- Stakeholders and Interests:
  - User: Wants to easily access other user’s sheets in the system. 
  - System: Needs to ensure data integrity and provide accurate data back to the user.
- Preconditions: The user is logged into the application and has opened a sheet that has been shared with them. 
- Postconditions: The sheet has been displayed to the current user, but remained unchanged. 
- Basic Flow:
  - Start View Process: Open up the application and click on a sheet that has been shared with the current user. 
  - Display sheet: Displays the current sheet without the ability to change any data.
  - Display changes: If a user who has editing access changes and saves a change. The current user can view that change. 
- Extensions (Alternative Flows):
  - Error Handling:
    - If viewing fails due to an error, the system alerts the user and returns to the sheet to allow the user to re-try. 
    - If the owner shared, then unshared with the user, the user no longer has access through their server and does not see it in their system. 
- Special Requirements:
  - The application should handle large sheets.
  - Viewing should not significantly impact application performance.
- Open Issues:
  - What if the owner deletes a sheet?
  - What if someone else that has access deletes the sheet?
## Name: Editing other user’s sheets
- Actor: User
- Stakeholders and Interests:
  - User: Wants to easily access other user’s sheets in the system and edit a sheet that is shared with them. 
  - System: Needs to ensure data integrity and provide accurate data back to the user. Have to deal with merge conflicts. 
- Preconditions: The user is logged into the application and has opened a sheet that has been shared with them. Assume that one editor is allowed on a sheet at a time.
- Postconditions: The sheet has been displayed to the current user, but has changed based on what an editor has changed. 
- Basic Flow:
  - Start View Process: Open up the application and click on a sheet that has been shared with the current user. 
  - Display sheet: Displays the current sheet with the ability to change any data. Ensure that there is only one editor accessing the current sheet. 
  - Display changes: If the owner changes the sheet, everyone else can view changes, else if a shared user has changed the sheet, then the owner can choose to accept or deny those changes. The other users view will change based on whether the owner accepts the changes. 
- Extensions (Alternative Flows):
  - Error Handling:
    - If viewing fails due to an error, the system alerts the user and returns to the sheet to allow the user to re-try. 
    - If the owner shared, then unshared with the user, the user no longer has access through their server and does not see it in their system. 
- Special Requirements:
  - The application should handle large sheets.
  - User access has to be specified. 
- Open Issues:
  - What if the owner deletes a sheet?
  - What if someone else that has access deletes the sheet?
  - What happens if the owner accepts two conflicting changes, creating a merge issue?
## Name: Delete sheet 
- Actor: User
- Stakeholders and Interests:
  - User: Wants to delete an existing sheet
  - System: remove the sheet from the database and its tables containing user file data. 
- Preconditions: The sheet must exist in the user’s list of files. 
- Postconditions: The user cannot continue to interact with the file or revive it file. 
- Basic Flow:
  - Login: Once logged in, the user clicks the sheet that they would like to delete.
  - Delete Button: Once a sheet is selected, a delete button appears at the top of the user’s account that allows the user to delete the file.
  - Deleting the file: If the user presses this button, the file is effectively removed from the database, specifically as a foreign key to the user and the possible files they have access to. 
  - Updated list of files: The user’s list of files should be updated to exclude the file they just deleted. If they are the owners of the file, all collaborators should consequently not be able to access the file. If they are just collaborators to the file, the file will just not be accessible to them anymore. 
- Extensions (Alternative Flows):
  - Error Handling:
    - If a user chooses to delete a sheet that has been deleted by its owner (that is not them). 
    - If a user chooses to delete a sheet that they have already deleted. 
  - If a user tries to update a sheet that has already been deleted. 
- Special Requirements:
  - The user must be logged into their account
- Open Issues:
  - If the user does not own the sheet, how can changes to the file be transferred to other users. 
## Name: Functions for Simple Calculations
- Actor: User
- Stakeholders and Interests:
  - User: Wants to do simple calculations through the use of predefined functions
  - System: Needs to provide timely feedback to the user.
- Preconditions: The user is logged into the application and has opened or created a sheet with a given name. The user has selected and is working on a specific cell.
- Postconditions: The cell is showing the output of the function, but has the actual function inside
- Basic Flow:
  - User edits the cell: The user double-clicks the cell to start editing the cell. (There will be an edit state and a show state for each cell).
  - User uses a function: User uses one of IF, SUM, MIN, MAX, AVG, CONCAT, and DEBUG functions.
Finish editing and show output: The user clicks away or presses enter, then the output of the function will be shown on the cell.
- Extensions (Alternative Flows):
  - Error Handling:
    - If the function does not work, the cell shows the error message.
- Special Requirements:
  - The application should handle large values.
  - Function operations should not significantly impact application performance.
- Open Issues:
  - What if the user tries to use a function that doesn’t exist?
  - What if there are undefined math behaviors?
  - What if the syntax of the function is wrong?
## Name: Sort sheet
- Actor: User
- Stakeholders and Interests:
  - User: Wants to easily sort columns or rows based on a certain criteria 
  - System: Needs to ensure data integrity and provide accurate sorted data back to the user.
- Preconditions: The user is logged into the application and has opened or created a sheet with a given name. The sheet has columns and rows filled out. 
- Postconditions: The sheet has sorted columns/rows defined by the user.
- Basic Flow:
  - Start Sort Process: The system saves the project with the cells as inputted. 
  - Provide Sort Options: If the user wants to sort, provide different options such as alphabetically, increasing numbers, etc.
  - System Validates and Sorts: The system checks for errors (e.g., sorting numbers alphabetically, a mix of different data types ); Assuming no errors, the system saves the sheet.
  - Confirm Sort to User: The system provides visual feedback that the sorting process has started; Upon successful sort, the system displays the sorted data
- Extensions (Alternative Flows):
  - Error Handling:
    - If saving fails due to an error, the system alerts the user and returns to the sheet to allow the user to re-try. 
- Special Requirements:
  - The application should handle large sheets.
  - Sort operations should not significantly impact application performance.
- Open Issues:
  - What if we cannot provide a certain sorting algorithm?
## Name: Add columns or rows to a sheet
- Actor: User
- Stakeholders and Interests:
  - User: Wants to add more rows or columns to the provided sheet
  - System: Needs to expand the sheet view for the user.
- Preconditions: The user must have opened a sheet with a non-zero cell count.
- Postconditions: The sheet now has the added number of rows and columns and whatever input the user provides in that extension of the sheet is subsequently stored. 
- Basic Flow:
  - Click “Insert Row”/ “Insert Column”: The user selects whether they would like to insert rows or insert columns. This displays a dialog which allows the user to provide the number of rows and columns they would like to insert. 
  - Press “Insert”: Once the user has pressed “Insert”, the sheet they are currently working on should now display empty cells that populate the number of new rows or columns that they wished to add.
  - Store information: Any input that the user provides to the cells that have been added to the sheet should also be effectively stored to the database.  
- Extensions (Alternative Flows):
  - Error Handling:
    - If a user adds 0 rows/columns or an excessive number of rows/columns (>1,000,000,000) 
- Special Requirements:
  - The sheet exists and has been opened.
- Open Issues:
  - What is the limit to number of rows/columns that can be added.
## Name: Cell Selection for Copy/Paste & Delete
- Actor: User
- Stakeholders and Interests:
  - User: Wants to interact with the cells via copy/paste or delete keys
  - System: Needs to display changes to the sheet that the user dictates via key strokes.
- Preconditions: The user must have opened a sheet with a non-zero cell count, and cells that are selected are not empty.
- Postconditions: The sheet displays the changes that the user has used the keyboard to enact. 
- Basic Flow:
  - Select cells: The user selects the cells they are interested in changing, and their values are stored in the backend.
  - Key Strokes (Copy): Once the user has pressed “ctrl” + “c” on the keyboard, the values of the selected cells are stored in a temporary variable in the backend.
  - Key Strokes (Paste): Once the user has pressed “ctrl” + “v” on the keyboard, the value of the cells contained in the temporary variable overwrite the values in the currently selected cells. Should the number of cells selected be greater than the number of values contained in the temporary variable, the cells will be updated with all the temporary values, and the remaining cells will be unchanged. Should the number of cells selected be less than the number of values contained in the temporary variable, the cells will be populated only to the extent of cells that have been selected. These new values will then send an update call to the database that changes the initial contents of this file for all associated users. 
  - Key Strokes (Delete): Once the user has pressed “delete” on their keyboard, the values of the cells selected will be deleted. This means the cells will appear as empty to the user, and their contents will also subsequently be deleted from the database and specifically the user’s list of sheets. 
- Extensions (Alternative Flows):
  - Error Handling:
    - If a user tries to copy or delete a set of cells that are empty. 
- Special Requirements:
  - The sheet exists and has been opened.
## Name: Send file changes to the owner
- Actor: User
- Stakeholders and Interests:
  - User: Wants to update a file that has been shared with them
  - System: Needs to accept the changes and display them to the owner.
- Preconditions: The user must have the file shared with them.
- Postconditions: The owner of the file can see the changes and accept or reject them. 
- Basic Flow:
  - User updates shared file: The owner of a file has shared it with another user in the system. The user has made their respective changes to this file. 
  - Press “Send changes”: To prevent merge conflicts with file changes between various users, the top menu of the sheet will have a button that allows the user to send their changes to the owner of the file. 
  - Notification of changes: Pressing this button will display a notification dialog box to the original owner of the file once they have logged into the system. This notification will alert the user that the shared file has been changed. It will also instruct the user to accept the changes or reject them before continuing on to update the file themselves. 
  - Accept changes: If the user accepts the changes, the changes will be added to the sheet and the database will be updated to include cell values that the collaborator added.
  - Reject changes: If the user rejects the changes, the file will remain unchanged to what the owner had originally saved, which included the contents included in the database. 
  - Notify collaborator: In accepting or rejecting the changes that the collaborator made, when the collaborator next logs into their account, they will be notified that the owner has accepted or rejected their changes. 
- Extensions (Alternative Flows):
  - Error Handling:
    - If a user tries to change a document they do not have access to.
- Special Requirements:
  - The sheet exists and has been opened.
- Open Issues:
  - Can a user always have permission to edit or just view? 
## Name: Customizing cells
- Actor: User
- Stakeholders and Interests:
  - User: Wants to easily change the font style and/or font size of the text within the cells
  - System: Needs to ensure that the data is persisted in the font customizations its changed to
- Preconditions: The user is logged into the application and has opened or created a sheet. (and there is text already in the cell?)
- Postconditions: The text in cells is a different font style from the default.
- Basic Flow:
  - Highlight the cells in which the font styles should be changed
  - As soon as the user chooses a new font style or size, the text should be automatically changed
- Extensions (Alternative Flows):
  - Error Handling:
    - There should be no edge cases in this scenario
- Special Requirements:
  - Can change the font styles of multiple cells at the same time
- Open Issues:
  - How many options will be available to users to choose from?
## Name: Plot graphs
- Actor: User
- Stakeholders and Interests:
  - User: Wants to plot graphs given cell information
  - System: Needs to accommodate graphing coordinates.
- Preconditions: There needs to be valid input that can be considered an (x,y) coordinate
- Postconditions: The graph can be visualized directly on the sheet or saved as a png. 
- Basic Flow:
  - Coordinate input: The user must provide valid integers in at least one cell of two separate columns (forming at least a single x-y coordinate).
  - Register Error Handling: The system checks for invalid user input (user has provided a letter input, user has selected empty column, etc) when the user asks to plot the graph. If no invalid information is provided, the graph can be plotted.
  - Graph: User can drag their cursor across the cells contained in two columns, which are parsed as separate lists of x and y coordinates. Pressing the “Plot Graph” button allows the graph to be plotted. 
  - Final Plot: System displays a dialog box with the plotted graph and provides the option to save the graph as a png. 
- Extensions (Alternative Flows):
  - Error Handling:
    - If a user has provided invalid or no information for plotting, an error message will appear preventing the user from plotting the graph. 
- Special Requirements:
  - The system allows graphing functionality. 
- Open Issues:
  - Will a user be able to plot multiple kinds of graphs or just a simple plot?
## Name: Freezing a column/row
- Actor: User
- Stakeholders and Interests:
  - User: Wants to be able to freeze certain rows or columns so that the data in those columns/rows will still be seen despite scrolling past the items (where it would normally be out of view)
    - For example: a user freezes column A. If a user scrolls and can see columns U-Z, they should still be able to see column A, because it is frozen on their screen
  - System: Needs to ensure that the column/row will still be visible regardless of where the user’s immediate view is
- Preconditions: A sheet needs to be created beforehand
- Postconditions: The frozen column/row will always be visible to the user
- Basic Flow:
  - A user left-clicks a row/column and an options bar appears
  - In the bar, there is an option to freeze that row/column. Clicking it once will freeze the unfrozen column
  - If the column/row is already frozen, clicking the freeze button will unfreeze the column/row
- Extensions (Alternative Flows):
  - No edge cases for this task
- Special Requirements:
  - No special requirements for this task
- Open Issues:
  - No open issues for this task 
## Name: Format as currency button
- Actor: User
- Stakeholders and Interests:
  - User: Wants to easily reformat numbers in cells to be formatted as currency, without having to manually format it as such with each cell
  - System: Needs to ensure that the cell formats numbers such as $00.00
- Preconditions: A cell must have only numbers as the text beforehand
- Postconditions: The cell will have all numbers reformatted as US currency
- Basic Flow:
  - A user left-clicks a cell and an options bar appears
  - In the bar, there is an option to format the text in the cell as currency (USD). Clicking it once will reformat the numbers as currency
    - Ex: 90 → $90.00
  - If the cell is already formatted as currency, clicking the currency button will unformat the cell
- Extensions (Alternative Flows):
  - Error handling:
    - If a cell does not have only numbers, nothing will change
  - Numbers that exceed 2 decimal points will be rounded
- Special Requirements:
  - Only numbers can be in the cells for this function to work
- Open Issues:
  - No open issues for this task 
## Name: Rounding decimal numbers
- Actor: User
- Stakeholders and Interests:
  - User: Wants to round each number in a cell to the closest whole number
  - System: Needs to ensure that all numbers are shown as only whole numbers
- Preconditions: A cell must have only numbers as the text beforehand
- Postconditions: Only whole numbers will be in the cell
- Basic Flow:
  - A user left-clicks a cell and an options bar appears
  - In the bar, there is an option to round to the nearest whole number. Clicking that will round the numbers. This rounding cannot be undone by clicking the button again
- Extensions (Alternative Flows):
  - Error handling:
    - If a cell does not have only numbers, nothing will change
- Special Requirements:
  - Only numbers can be in the cells for this function to work
- Open Issues:
  - No open issues for this task 
