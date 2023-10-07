/* Your Code Here */
/* Your Code Here */

function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date).hour;
    const timeOut = employee.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Integration of the provided allWagesFor function
  function allWagesFor(employee) {
    const eligibleDates = employee.timeInEvents.map(function (e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate(employee, d);
    }, 0);
  
    return payable;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employeeArray) {
    return employeeArray.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  
  // Example Usage:
  const employeeRecords = createEmployeeRecords([
    ["John", "Doe", "Engineer", 25],
    ["Jane", "Doe", "Designer", 22]
  ]);
  
  createTimeInEvent(employeeRecords[0], "2023-01-01 0900");
  createTimeOutEvent(employeeRecords[0], "2023-01-01 1700");
  console.log(wagesEarnedOnDate(employeeRecords[0], "2023-01-01")); // Output: 800
  
  console.log(findEmployeeByFirstName(employeeRecords, "John")); // Output: Object representing John's employee record
  
  console.log(calculatePayroll(employeeRecords)); // Output: Total payroll for all employees
  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

