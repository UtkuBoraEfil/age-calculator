function isLeapYear(y) {
  return y % 400 == 0 || (y % 100 != 0 && y % 4 == 0);
}

toastr.options = {
  progressBar: true,
  positionClass: "toast-top-right",
};

let currentDate = new Date();
currentYear = currentDate.getFullYear();
currentMonth = currentDate.getMonth();
currentDay = currentDate.getDate();

let months = {
  0: 31,
  1: (year) => {
    return isLeapYear(year) ? 29 : 28;
  },
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
};

let date = {
  day: 0,
  month: 0,
  year: 0,
};

function calculate(date) {
  let age = {};
  age.year = currentYear - date.year;
  age.month = currentMonth - date.month + 1;
  age.day = currentDay - date.day;

  console.log(typeof months[1]);
  if (age.day < 0) {
    age.month--;
    let daysInMonth =
      typeof months[currentMonth - 1] === "function"
        ? months[currentMonth - 1](currentYear)
        : months[currentMonth - 1];
    age.day += daysInMonth;
  }

  if (age.month < 0) {
    age.year--;
    age.month = 12 + age.month;
  }
  return age;
}

function sck(name, value) {
  if (name === "day") {
    date.day = value;
  }
  if (name === "month") {
    date.month = value;
  }
  if (name === "year") {
    date.year = value;
  }

  function reset() {
    date = {
      day: 0,
      month: 0,
      year: 0,
    };

    $(".years").text("- -");
    $(".months").text("- -");
    $(".days").text("- -");

    $(".inputt").val("");
  }
  //uyarilar
  let monthCheck = months[date.month - 1];
  if (date.day > monthCheck) {
    reset();
  }

  if (date.month > 12) {
    toastr.error("", "Invalid Input");
    reset();
  }

  if (date.year > currentYear) {
    toastr.error("", "Invalid Input");
    reset();
  }

  if (date.month > currentMonth && date.year === currentYear) {
    toastr.error("", "Invalid Input");
    reset();
  }

  if (date.day && date.month && date.year) {
    const result = calculate(date);

    $(".years").text(result.year + " ");
    $(".months").text(result.month + " ");
    $(".days").text(result.day + " ");
  } else {
    $(".years").text("- - ");
    $(".months").text("- - ");
    $(".days").text("- - ");
  }
}

$(".inputt").on("input", (event) => {
  const { name, value } = event.target;
  sck(name, Number(value));
});
