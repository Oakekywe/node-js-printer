require('dotenv').config();

const express = require('express');
const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(express.json());
// app.use(fileUpload());
// app.use(bodyParser.json());

const port = process.env.PORT || 3000;


// // routes
// require("./routes")(app);

app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
})


const { io } = require("socket.io-client");
const escpos = require("escpos");
const { printOrder } = require('./printer');

// Setup escpos for network printer
escpos.Network = require("escpos-network");

// ==== CONFIG START ====

// printer IP
const PRINTER_IP = '192.168.1.100'; // CHANGE THIS to printer IP

// cloud socket server URL
const SOCKET_SERVER_URL = process.env.SOCKET_API_URL;

// The socket event name you use for new orders
const SOCKET_EVENT_NOTIFY_ORDER = 'notify_order';

// ==== CONFIG END ====

// Connect to the printer
const device = new escpos.Network(PRINTER_IP);
const printer = new escpos.Printer(device);

// Connect to socket server
const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log(`✅ Connected to socket server! ID: ${socket.id}`);
});

// Listen for new order events
socket.on(SOCKET_EVENT_NOTIFY_ORDER, (orderData) => {
    console.log('🧾 New order received!', orderData);

    // Call the print function
    printOrder(orderData, PRINTER_IP);
});

