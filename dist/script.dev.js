"use strict";

var container = document.querySelector('.container');
var count = document.getElementById('count');
var amount = document.getElementById('amount');
var select = document.getElementById('movie');
var seats = document.querySelectorAll('.seat:not(.reserved)');
getFromLocalStorage();
calculateTotal();
container.addEventListener('click', function (e) {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
    e.target.classList.toggle('selected');
    calculateTotal();
  }
});
select.addEventListener('change', function (e) {
  calculateTotal();
});

function calculateTotal() {
  var selectedSeats = container.querySelectorAll('.seat.selected');
  var selectedSeatsArr = [];
  var seatsArr = [];
  selectedSeats.forEach(function (seat) {
    selectedSeatsArr.push(seat);
  }); //spread

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });
  var selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });
  var selectedSeatCount = container.querySelectorAll('.seat.selected').length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;
  saveToLocalStorage(selectedSeatIndexs);
}

function saveToLocalStorage(index) {
  localStorage.setItem('selectedSeats', JSON.stringify(index));
  localStorage.setItem('selectedMovieIndex', JSON.stringify(select.selectedIndex));
}

function getFromLocalStorage() {
  var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  var selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}