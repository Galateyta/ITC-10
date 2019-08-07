let div = document.getElementsByClassName('graph');
let vertex = document.getElementById('vertex');
let distance = document.getElementById('distance');

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
//drawing graph vertices
ctx.beginPath();
ctx.arc(70, 90, 20, 0,  Math.PI*2, false);
ctx.strokeStyle = "blue";
ctx.stroke();
ctx.fillStyle = "#00F";
ctx.font = "italic 20pt Arial";
ctx.fillText("Start", 40, 140);
ctx.closePath();

ctx.beginPath();
ctx.arc(160, 60, 20, 0,  Math.PI*2, false);
ctx.strokeStyle = "blue";
ctx.stroke();
ctx.fillStyle = "#00F";
ctx.font = "italic 20pt Arial";
ctx.fillText("A", 150, 65);
ctx.closePath();

ctx.beginPath();
ctx.arc(280, 180, 20, 0,  Math.PI*2, false);
ctx.strokeStyle = "blue";
ctx.fillStyle = "#00F";
ctx.font = "italic 20pt Arial";
ctx.fillText("B", 270, 185);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(180, 240, 20, 0, Math.PI*2, false);
ctx.strokeStyle = "blue";
ctx.fillStyle = "#00F";
ctx.font = "italic 20pt Arial";
ctx.fillText("C", 170, 245);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(440, 200, 20, 0,  Math.PI*2, false);
ctx.strokeStyle = "blue";
ctx.fillStyle = "#00F";
ctx.font = "italic 20pt Arial";
ctx.fillText("D", 430, 205);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(400, 70, 20, 0,  Math.PI*2, false);
ctx.strokeStyle = "blue";
ctx.fillStyle = "#00F";
ctx.font = "italic 20pt Arial";
ctx.fillText("E", 390, 75);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(380, 300, 20, 0,  Math.PI*2, false);
ctx.strokeStyle = "blue";
ctx.stroke();
ctx.fillStyle = "#00F";
ctx.font = "italic 20pt Arial";
ctx.fillText("Finish", 350, 350);
ctx.closePath();

const problem = {
  start: {A: 5, B: 2},
  A: {C: 14, D: 32, E: 1},
  B: {A: 8, D: 7},
  C: {D: 6, finish: 3},
  D: {finish: 1},
  E: {finish: 1, C: 2},
  finish: {}
};  
const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};
// function that returns the minimum cost and path to reach Finish
const dijkstra = (graph) => {
// track lowest cost to reach each node
  const costs = Object.assign({finish: Infinity}, graph.start); 
  // track paths
  const parents = {finish: null};
  for (let child in graph.start) {
    parents[child] = 'start';
  } 
  // track nodes that have already been processed
  const processed = [];
  let node = lowestCostNode(costs, processed); 
  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      let newCost = cost + children[n];
      if (!costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }
    let optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
      optimalPath.push(parent);
      parent = parents[parent];
    }
    optimalPath.reverse(); 
    const results = {
      distance: costs.finish,
      path: optimalPath
    }; 
    vertex.innerHTML = 'Optimal distance is: ' + results.distance ;
    distance.innerHTML = 'Vertices that give shortest path is: ' + results.path;
    return results;
  };


  