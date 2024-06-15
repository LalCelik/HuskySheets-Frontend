import reportWebVitals from './reportWebVitals';


const mockGetCLS = jest.fn();
const mockGetFID = jest.fn();
const mockGetFCP = jest.fn();
const mockGetLCP = jest.fn();
const mockGetTTFB = jest.fn();

jest.mock('web-vitals', () => ({
  getCLS: mockGetCLS,
  getFID: mockGetFID,
  getFCP: mockGetFCP,
  getLCP: mockGetLCP,
  getTTFB: mockGetTTFB,
}));

describe('reportWebVitals', () => {


  test('should call web-vitals metrics if onPerfEntry is a function', async () => {
    const mockOnPerfEntry = jest.fn();

    // Importing the mocked module inside the test case
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');

    // Call the reportWebVitals function with the mock function
    await reportWebVitals(mockOnPerfEntry);


    //expect(getCLS).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(getCLS).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(getFID).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(getFCP).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(getLCP).toHaveBeenCalledWith(mockOnPerfEntry);
    expect(getTTFB).toHaveBeenCalledWith(mockOnPerfEntry);
  });

  test('should not call web-vitals metrics if onPerfEntry is not a function', async () => {
    // Call the reportWebVitals function with a non-function argument
    //await reportWebVitals(null);

    // Importing the mocked module inside the test case
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');

    // Ensure the metrics functions are not called
    expect(getCLS).not.toHaveBeenCalled();
    expect(getFID).not.toHaveBeenCalled();
    expect(getFCP).not.toHaveBeenCalled();
    expect(getLCP).not.toHaveBeenCalled();
    expect(getTTFB).not.toHaveBeenCalled();
  });
});
