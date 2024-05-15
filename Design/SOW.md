# Statement of Work:
Victoria Chin, Lal Celikbilek, Ira Hysi, Amani Scarborough, Sunkwan Kim
## Description of project:
The team aims to create a version of Google Spreadsheets called HuskSheets using Java with SQL for backend operations and Typescript/React for frontend operations. We’ll be using VSCode as an IDE and JUnit testing. The frontend operations mostly consist of handling the clients actions and managing the GUI while the backend operations will focus on performing operations within the server. We are aiming to use a REST library to communicate between the server and client. It will mainly handle requests and responses. HuskSheets will include features like authentication, creating new sheets, editing existing sheets, seeing changes made by other clients/users, etc. Users will be able to create/sign into accounts and make changes to these spreadsheets.
## MVP:
### Basis:
  1. Server
  2. UI
  3. API
### Creation:
  4. User accounts should be defined
    a. Program will allow the user to choose to register a new account or login into their existing account. (front end - UI)
    b. Choosing to register a new account will display a dialog box that allows the user to enter their information. (front end                interaction from user that calls click listener in back end)
    c. Pressing enter on this dialog box will call a corresponding query that inserts the user’s information to the database (front end       interaction from user that calls click listener in the back end, also database management)
    d. Logging into the system with their information will display a list of their corresponding sheets by calling a query that pulls          the user’s sheets from the database (front end interaction from user that calls click listener in the back end, also database           management)
    e. Should a user provide incorrect information while logging in that does not correspond to a valid user account, an error message         should be displayed warning the user its account could not be found (user query to cross-reference possible account combinations        and whether the user’s information exists: front end - UI, also database management).

  6. Users can make a new sheet
    a. User can click a button that opens a new panel to represent the new sheet they wish to make (front end interaction from the user        that calls click listener in the back end).
    b. The new panel should instantiate with a large grid of cells which can contain numeric or character values the user has provided.
    c. The panel should also contain a button to save the sheet, set its title, along with the option to share a sheet with other users        in the system. (front end UI)
    d. Once the user presses the exit button to close the panel, the previous list of sheets should be displayed. (the backend will            store each cell’s input locally and then a call to the database inserts this sheet to the user’s specific account of sheets.
    e. If the user selects to open an existing sheet, the sheet with its grid of cells and corresponding input will be displayed.              (front end managed by database call to that sheet’s specific contents).
  8. Users can share sheets with other users
    a. On the sheet panel, if the user selects to share the system, whoever they decide to share the panel with should be added as             collaborators to the sheet. (front end UI, database call to insert the sheet to the collaborator’s repertoire of sheets). 
    b. Users should be able to see and open the sheets created by other users. Users should be able to see changes other users make.           Updates made to the sheet by any user that it has been shared with should be seen by all other collaborators. (editing the cells        will require constant updating of the original cell’s information in the database, which then updates the sheet’s information as        a foreign key for each collaborator).
  9. Should be able safely to delete a sheet
    a. In the panel containing the list of sheets accessible to the user, the user should be able to select at least one sheet, at             which point a delete button will appear to provide the user with the option to delete the sheets. (front end managed by click           listener in the backend).
    b. Should the user select to delete the selected sheets, the sheets will be removed from the user’s account. Should the owner              delete the sheet, the sheet will be delete from all user’s accounts. Should the sheets be deleted by a collaborator and be              accessible to other collaborators as well, the sheet will still be accessible to these collaborators who have not deleted the           sheets. (database management, delete from the user’s table in the database, but not the overall database).

## Desirable Features
- The users should be able to type in functions to perform simple calculations on the sheet
- The users should be able to sort their data according to certain criteria (like alphabetical, time, etc)
- Being able to add more columns or rows to the initial sheet
- Cells Selection - Copy, Paste, Delete

## Additional Features (Bonus)
- Being able to color cells and change fonts
- Being able to create a graph from selecting two columns/rows
- Freezing a column
- Format as currency button
- Rounding decimal numbers (rounding up to a certain digit)

### Hidden bonus:
- Predictive text

# User stories and use cases:
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

## Name: Functions for Simple Calculations
- Actor: User
- Stakeholders and Interests:
  - User: Wants to do simple calculations through the use of pre-defined functions
  - System: Needs to provide timely feedback to the user.
- Preconditions: The user is logged into the application and has opened or created a sheet with a given name. The user has selected and is working on a specific cell.
- Postconditions: The cell is showing the output of the function, but has the actual function inside
- Basic Flow:
  - User edits the cell: The user double-clicks the cell to start editing the cell. (There will be an edit state and a show state for each cell).
  - User uses a function: User uses one of IF, SUM, MIN, MAX, AVG, CONCAT, and DEBUG functions.
  - Finish editing and show output: The user clicks away or presses enter, then the output of the function will be shown on the cell.
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

## Name: View Sheet Changes
- Actor: User
- Stakeholders and Interests:
  - User: Wants to be able to see changes made by other users to a shared sheet.
  - System: Must ensure collaboration and provide updates on the sheets when one of the users decides to save their changes. The changes won’t be viewed in real-time, but updated consistently.
- Preconditions: The user is logged into the application and has opened a shared sheet.
- Postconditions: The user can view the latest changes made by other users to the sheet.
- Basic Flow:
  - Change Saving: The system tracks changes made by other users.
  - View Changes: The user should be able to view the changes made by another user when they are committed.
  - Accept or Reject Changes: Depending on the settings, the user may have the option to accept or reject the changes made by other users.
- Extensions (Alternative Flows):
  - Error Handling:
    - If there are any issues with retrieving or displaying changes, the system notifies the user.
- Special Requirements:
  - The application should support concurrent editing by multiple users without conflicts.
  - Changes should be synced across all devices in real-time.
- Open Issues:
  - How to handle conflicts when multiple users attempt to edit the same cell simultaneously?

## Name: Save sheet
- Actor: User
- Stakeholders and Interests:
  - User: Wants to easily save changes to a sheet
  - System: Needs to ensure data integrity and provide timely feedback to the user.
- Preconditions: The user is logged into the application and has opened or created a sheet with a given name.
- Postconditions: The sheet is saved with the latest changes.
- Basic Flow:
  - Start Save Process: The system periodically saves the document according to the set frequency without user initiation.
  - Provide Save Options: If this is the first save for this document, the system prompts whether to save it locally or on the server; The user selects the option.
  - System Validates and Saves: The system checks for errors (e.g., insufficient storage, permission issues); Assuming no errors, the system saves the sheet.
  - Confirm Save to User: The system provides visual feedback that the saving process has started; Upon successful save, the system displays a success message.
- Extensions (Alternative Flows):
  - Error Handling:
    - If saving fails due to an error (e.g., no space, no permission), the system alerts the user and suggests possible fixes.
    - The system does not overwrite any previously saved state until the issue is resolved.
- Special Requirements:
  - The application should handle large sheets.
  - Save operations should not significantly impact application performance.
- Open Issues:
  - What backup solutions are in place in case of system failure during a save?
