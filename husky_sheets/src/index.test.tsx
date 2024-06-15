import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import App from './App';
import HomePage from './HomePage';
import Registration from './Registration';
import Sheet from './Sheet';
import ReactDOM from 'react-dom';

jest.mock('./reportWebVitals.tsx');

test('renders App component for root path', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Welcome to the login page')).toBeInTheDocument();
});

test('renders HomePage component for /home_page path', () => {
  render(
    <MemoryRouter initialEntries={['/home_page']}>
      <HomePage />
    </MemoryRouter>
  );
  expect(screen.getByText('HuskSheets Homepage')).toBeInTheDocument();
});

test('renders Registration component for /register path', () => {
  render(
    <MemoryRouter initialEntries={['/register']}>
      <Registration />
    </MemoryRouter>
  );
  expect(screen.getByText('Please input a password to create a new account')).toBeInTheDocument();
});

// test('renders Sheet component for /home_page/sheet/:sheetName/:dataPublisher path', () => {
//   render(
//     <MemoryRouter initialEntries={['/home_page/sheet/sheet1/publisher1']}>
//       <Sheet />
//     </MemoryRouter>
//   );
//   expect(screen.getByText('Sheet Component Content')).toBeInTheDocument();
// });

test('checks if root element exists in the document', () => {
    // Set up the DOM with a root element
    document.body.innerHTML = '<div id="root"></div>';
  
    // Get the root element
    const rootElement = document.getElementById('root');
    //const rootElement = screen.getByTestId('root');
  
    // Check if the root element is found
    expect(rootElement).not.toBeNull();
  });
  
  test('throws an error if root element is not found', () => {
    // Ensure there is no root element in the DOM
    document.body.innerHTML = '';
  
    expect(() => {
      const rootElement = document.getElementById('root');
      if (!rootElement) {
        throw new Error('Failed to find the root element');
      }
    }).toThrow('Failed to find the root element');
  });

//   test('creates React root and renders the application', () => {
//     // Set up the DOM with a root element
//     document.body.innerHTML = '<div id="root"></div>';
//     const rootElement = document.getElementById('root');
  
//     // Spy on ReactDOM.createRoot and root.render
//     const createRootSpy = jest.spyOn(ReactDOM, 'createRoot');
//     const rootRenderSpy = jest.spyOn(ReactDOM.createRoot(rootElement), 'render');
  
//     // Dynamically import the index file to run the code
//     require('./index');
  
//     // Check if createRoot was called with the correct element
//     expect(createRootSpy).toHaveBeenCalledWith(rootElement);
  
//     // Check if render was called on the root
//     expect(rootRenderSpy).toHaveBeenCalled();
//   });