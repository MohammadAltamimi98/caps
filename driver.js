'use strict';

const events = require('./events');


// after two one (1000 timeout)
// 1. log to inform that  the driver picked the order
// 2. emit a message a log for in transit to inform the company

events.on('driverPickup', payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up order ${payload.orderId}`);
    events.emit('capInTransit', payload);

  }, 1000);
})


// after 3 seconds 
// 1. log "delivered"
// 2. emit delivered with the same payload

events.on('driverInTransit', payload => {
  setTimeout(() => {
    console.log(`DRIVER: Just Delivered ${payload.orderId}`);
    events.emit('vendorDelivered', payload);

  }, 3000);
});