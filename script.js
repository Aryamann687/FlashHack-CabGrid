// GRAPH STRUCTURE
const graph = {
A: ["B", "F"],
B: ["A", "C", "G"],
C: ["B", "D", "H"],
D: ["C", "E", "I"],
E: ["D", "J"],
F: ["A", "G", "K"],
G: ["B", "F", "H", "L"],
H: ["C", "G", "I", "M"],
I: ["D", "H", "J", "N"],
J: ["E", "I", "O"],
K: ["F", "L"],
L: ["G", "K", "M"],
M: ["H", "L", "N"],
N: ["I", "M", "O"],
O: ["J", "N"]
};
// NODE POSITIONS
const positions = {
A:[100,100], B:[250,100], C:[400,100], D:[550,100], E:[700,100],
F:[100,250], G:[250,250], H:[400,250], I:[550,250], J:[700,250],
K:[100,400], L:[250,400], M:[400,400], N:[550,400], O:[700,400]
};
// CAB PROCESS STATES
let cabStates = {
Cab1: "IDLE",
Cab2: "IDLE",
Cab3: "IDLE",
Cab4: "IDLE",
Cab5: "IDLE"
};
// CAB LOCATIONS
let cabs = {
Cab1: "A",
Cab2: "G",
Cab3: "M",
Cab4: "O",
Cab5: "D"
};
// CANVAS
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");
// DRAW GRAPH
function drawGraph(highlightNode=null) {
ctx.clearRect(0,0,canvas.width,canvas.height);
// Draw edges
for (let node in graph) {
for (let neighbor of graph[node]) {
const [x1,y1] = positions[node];
const [x2,y2] = positions[neighbor];
ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
ctx.strokeStyle = "#334155";
ctx.lineWidth = 2;
ctx.stroke();
}
}
// Draw nodes
for (let node in positions) {
const [x,y] = positions[node];
let color = "#a855f7";
if (Object.values(cabs).includes(node)) {
color = "#22c55e";
}
if (node === highlightNode) {
color = "#ef4444";
}
ctx.beginPath();
ctx.arc(x,y,20,0,Math.PI*2);
ctx.fillStyle = color;
ctx.fill();
ctx.fillStyle = "white";
ctx.font = "16px Arial";
ctx.fillText(node,x-5,y+5);
}
}
// BFS SEARCH
function bfsNearestCab(requestNode) {
let visited = new Set();
let queue = [[requestNode,0]];
visited.add(requestNode);
while(queue.length > 0) {
const [current,distance] = queue.shift();
if (Object.values(cabs).includes(current)) {
return [current,distance];
}
for (let neighbor of graph[current]) {
if (!visited.has(neighbor)) {
visited.add(neighbor);
queue.push([neighbor,distance+1]);
}
}
}
return [null,-1];
}
// UPDATE PROCESS STATE PANEL
function updateCabStatePanel() {
const panel = document.getElementById("cabStatesPanel");
panel.innerHTML = "";
for (let cab in cabStates) {
const stateBox = document.createElement("div");
let color = "#22c55e";
if (cabStates[cab] === "DISPATCHED") {
color = "#eab308";
}
else if (cabStates[cab] === "WAITING") {
color = "#f97316";
}
else if (cabStates[cab] === "EN_ROUTE") {
color = "#3b82f6";
}
else if (cabStates[cab] === "COMPLETED") {
color = "#a855f7";
}
stateBox.style.background = "#334155";
stateBox.style.padding = "10px";
stateBox.style.marginBottom = "10px";
stateBox.style.borderRadius = "8px";
stateBox.style.borderLeft = `5px solid ${color}`;
stateBox.innerHTML = `
 <strong>${cab}</strong><br>
 State: <span style="color:${color}">${cabStates[cab]}</span>
 `;
panel.appendChild(stateBox);
}
}
// DISPATCH
function dispatchCab() {
const requestNode = document
.getElementById("requestNode")
.value
.toUpperCase();
if (!graph[requestNode]) {
alert("Invalid Node");
return;
}
drawGraph(requestNode);
const [cabNode,distance] = bfsNearestCab(requestNode);
if (cabNode === null) {
alert("No cab available");
return;
}
8
// Find cab ID
let selectedCab = null;
for (let cab in cabs) {
if (cabs[cab] === cabNode) {
selectedCab = cab;
}
}
// PROCESS STATE TRANSITIONS
cabStates[selectedCab] = "DISPATCHED";
updateCabStatePanel();
setTimeout(() => {
cabStates[selectedCab] = "WAITING";
updateCabStatePanel();
}, 1000);
setTimeout(() => {
cabStates[selectedCab] = "EN_ROUTE";
updateCabStatePanel();
}, 2000);
setTimeout(() => {
cabStates[selectedCab] = "COMPLETED";
updateCabStatePanel();
}, 4000);
setTimeout(() => {
cabStates[selectedCab] = "IDLE";
cabs[selectedCab] = requestNode;
updateCabStatePanel();
drawGraph();
}, 5000);
// Update dashboard
9
document.getElementById("busyCabs").innerText = 1;
document.getElementById("idleCabs").innerText = 4;
// Ride history
const li = document.createElement("li");
li.innerHTML = `
${selectedCab} dispatched from ${cabNode}
 to ${requestNode}
 (${distance} hops)
 `;
document
.getElementById("rideHistory")
.appendChild(li);
// Surge pricing
const busy = 1;
const total = 5;
if ((busy/total) >= 0.6) {
document.getElementById("surge").innerText = "ACTIVE";
document.getElementById("surge").style.color = "red";
}
alert(
`${selectedCab} dispatched\n\n` +
`Nearest Node: ${cabNode}\n` +
`Distance: ${distance} hops`
);
}
// INITIAL DRAW
drawGraph();
updateCabStatePanel();