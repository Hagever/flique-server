var vis = require('vis/dist/vis');
var io = require('socket.io-client');
var network = null;
var facebookImage = user => `https://graph.facebook.com/${user}/picture?width=100&height=100`;

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

// create a network
var container = document.getElementById('main-app');
var data = {
  nodes: nodes,
  edges: edges
};
var options = {
  nodes: {
    borderWidth:4,
    size:30,
  color: {
      border: '#222222',
      background: '#666666'
    },
    font:{color:'#eeeeee'}
  },
  physics: {
    repulsion: {
      nodeDistance: 200
    }
  },
  edges: {
    color: 'lightgray'
  }
};
network = new vis.Network(container, data, options);
window.network = network;


var socket = io();
socket.on('node', (data) => {
  nodes.add(data);
});
socket.on('edge', (data) => {
  edges.add(data);
});
