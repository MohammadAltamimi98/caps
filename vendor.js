'use strict';
require('dotenv').config();

// note: here i wanted to use the faker.js 
const faker = require('faker');
require('./driver');
const events = require('./events');


// ----------------simulate a new customer order every 5 sec ---------

setTimeout(() => {

  let fakeOrder = {
    orderId: faker.datatype.uuid(),
    storeName: process.env.STORENAME,
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };

  // emit the pickup event, and attach the info as a payload
  events.emit('capPickup', fakeOrder)

}, 5000);


// when the events of delivering occurs log (thank you!)
events.on('vendorDelivered', payload => {
  console.log(`VENDOR:Thank You for delivering ${payload.orderId}`);
  events.emit('capDelivered', payload)
});