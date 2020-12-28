"use strict"

var x = 0;

function setup() {
  background(100);  
}

function draw() {
  ellipse(x, 30/2, 20, 20);
  var x = x + 1;
}