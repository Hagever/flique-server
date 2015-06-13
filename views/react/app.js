var vis = require('vis/dist/vis');
var Color = require('color');
var io = require('socket.io-client');
var network = null;
var facebookImage = user => `https://graph.facebook.com/${user}/picture?width=200&height=200`;

// create people.
// value corresponds with the age of the person
var nodes = window.nodes = new vis.DataSet([
  {id: 2,  shape: 'circularImage', image: facebookImage('galstar') },
  {id: 3,  shape: 'circularImage', image: facebookImage('golan.levi.56') },
  {id: 4,  shape: 'circularImage', image: facebookImage('kfirstri') },
]);

var edges = window.edges = new vis.DataSet([
  {from: 2, to: 3},
  {from: 2, to: 4},
  {from: 4, to: 3},
]);

const { color, backgroundColor } = window.getComputedStyle(document.body);
const fgColor = Color(color);

// create a network
var container = document.getElementById('main-app');
var data = {
  nodes: nodes,
  edges: edges
};
var options = {
  nodes: {
    borderWidth: 10,
    borderWidthSelected: 15,
    size:50,
    color: {
      border: fgColor.hexString(),
      background: fgColor.hexString(),
      highlight: {
        border: fgColor.lighten(0.1).hexString(),
        background: fgColor.lighten(0.1).hexString()
      }
    },
    font:{color:'#eeeeee'}
  },
  physics: {
    repulsion: {
      nodeDistance: 150
    },
    solver: 'repulsion'
  },
  edges: {
    color: color,
    width: 3
  }
};
network = new vis.Network(container, data, options);
window.network = network;


var socket = io();
socket.on('node', (data) => {
  nodes.add(data);
});
socket.on('edge', (data) => {
  if (!edges.get().filter(e => e.to === data.to && e.from === e.from)[0]) {
    edges.add(data);
  }
});
