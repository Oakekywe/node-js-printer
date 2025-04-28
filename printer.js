const escpos = require("escpos");

// Setup network adapter
escpos.Network = require("escpos-network"); // if Network
escpos.USB = require('escpos-usb'); // if USB printer

function printOrder(order, printerIp) {
//   const device = new escpos.USB();
  const device = new escpos.Network(printerIp, 9100);
  const printer = new escpos.Printer(device);

  console.log('===============run print=====================');

  setTimeout(() => {
    console.log('✅ Still alive after 10 seconds');
  }, 10000);

  setTimeout(() => {
    console.log('✅ Still alive after 20 seconds');
  }, 20000);

  setTimeout(() => {
    console.log('✅ Still alive after 40 seconds');
  }, 40000);

  setTimeout(() => {
    console.log('✅ Still alive after 60 seconds');
  }, 60000);

  device.open(function (error) {
    if (error) {
      console.error('❌ Printer connection failed:', error.message || error);
      return;
    }

    console.log('✅ Printer connected successfully, printing order...');

    printer
      .align('CT')
      .style('B')
      .size(2, 2)
      .text('🧾 New Order')
      .size(1, 1)
      .text('-----------------------------')
      .align('LT');

    printer.text(`Table: ${order.dining_table_name || '-'}`);
    printer.text(`Order No: ${order.order_number || '-'}`);
    printer.text(`Waiter: ${order.waiter_name || '-'}`);
    printer.text(`Time: ${order.order_time || '-'}`);

    printer
      .text('-----------------------------')
      .align('CT')
      .text('Thank you!')
      .cut()
      .close();
  });
}

module.exports = { printOrder };
