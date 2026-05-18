// =========================
// GRAPH STRUCTURE
// =========================

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


// =========================
// NODE POSITIONS
// =========================

const positions = {

    A:[100,100],
    B:[250,100],
    C:[400,100],
    D:[550,100],
    E:[700,100],

    F:[100,250],
    G:[250,250],
    H:[400,250],
    I:[550,250],
    J:[700,250],

    K:[100,400],
    L:[250,400],
    M:[400,400],
    N:[550,400],
    O:[700,400]
};


// =========================
// CAB LOCATIONS
// =========================

let cabs = {

    Cab1: "A",
    Cab2: "G",
    Cab3: "M",
    Cab4: "O",
    Cab5: "D"
};


// =========================
// CAB STATES
// =========================

let cabStates = {

    Cab1: "IDLE",
    Cab2: "IDLE",
    Cab3: "IDLE",
    Cab4: "IDLE",
    Cab5: "IDLE"
};


// =========================
// ACTIVE RIDES
// =========================

let activeRides = 0;

let surgeInterval = null;


// =========================
// CANVAS
// =========================

const canvas = document.getElementById("graphCanvas");

const ctx = canvas.getContext("2d");


// =========================
// DRAW GRAPH
// =========================

function drawGraph(
    highlightNode=null,
    bfsNodes=[],
    movingCab=null,
    bfsEdges=[]
) {

    ctx.clearRect(0,0,canvas.width,canvas.height);


    // DRAW EDGES

    for (let node in graph) {

        for (let neighbor of graph[node]) {

            const [x1,y1] = positions[node];
            const [x2,y2] = positions[neighbor];

            ctx.beginPath();

            ctx.moveTo(x1,y1);

            ctx.lineTo(x2,y2);

            let edgeColor = "#334155";

            let edgeWidth = 2;


            for (let edge of bfsEdges) {

                const [a,b] = edge;

                if (
                    (a === node && b === neighbor) ||
                    (a === neighbor && b === node)
                ) {

                    edgeColor = "#06b6d4";

                    edgeWidth = 5;

                    ctx.shadowBlur = 15;

                    ctx.shadowColor = "#06b6d4";
                }
            }


            ctx.strokeStyle = edgeColor;

            ctx.lineWidth = edgeWidth;

            ctx.stroke();

            ctx.shadowBlur = 0;
        }
    }


    // DRAW NODES

    for (let node in positions) {

        const [x,y] = positions[node];

        let color = "#a855f7";


        // CAB NODES

        if (Object.values(cabs).includes(node)) {

            color = "#22c55e";
        }


        // REQUEST NODE

        if (node === highlightNode) {

            color = "#ef4444";
        }


        // BFS GLOW

        if (bfsNodes.includes(node)) {

            color = "#06b6d4";

            ctx.shadowBlur = 20;

            ctx.shadowColor = "#06b6d4";
        }


        // MOVING CAB

        if (node === movingCab) {

            color = "#facc15";

            ctx.shadowBlur = 30;

            ctx.shadowColor = "#facc15";
        }


        ctx.beginPath();

        ctx.arc(x,y,20,0,Math.PI*2);

        ctx.fillStyle = color;

        ctx.fill();

        ctx.shadowBlur = 0;


        ctx.fillStyle = "white";

        ctx.font = "16px Arial";

        ctx.fillText(node,x-5,y+5);
    }
}


// =========================
// BFS SEARCH
// =========================

function bfsNearestCab(requestNode) {

    let visited = new Set();

    let queue = [[requestNode,0]];

    let checkedNodes = 0;

    visited.add(requestNode);

    const startTime = performance.now();


    while(queue.length > 0) {

        const [current,distance] = queue.shift();

        checkedNodes++;


        // Artificial BFS delay

        for (let i = 0; i < 100000; i++) {}


        if (Object.values(cabs).includes(current)) {

            const endTime = performance.now();

            document.getElementById(
                "bfsNodes"
            ).innerText = checkedNodes;

            document.getElementById(
                "bfsTime"
            ).innerText =
                (endTime - startTime).toFixed(3)
                + " ms";

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


// =========================
// DFS TRAVERSAL
// =========================

function dfsTraversal(startNode) {

    let visited = new Set();

    let result = [];


    function dfs(node) {

        visited.add(node);

        result.push(node);


        for (let neighbor of graph[node]) {

            if (!visited.has(neighbor)) {

                dfs(neighbor);
            }
        }
    }


    dfs(startNode);


    document.getElementById(
        "dfsTraversal"
    ).innerText =
        result.join(" → ");
}


// =========================
// BRUTE FORCE
// =========================

function bruteForceSearch() {

    const cabNodes = Object.values(cabs);

    let checkedNodes = 0;

    const startTime = performance.now();


    for (let node of Object.keys(graph)) {

        checkedNodes++;

        if (cabNodes.includes(node)) {

            for (let i = 0; i < 500000; i++) {}
        }
    }


    const endTime = performance.now();


    document.getElementById(
        "bruteNodes"
    ).innerText = checkedNodes;

    document.getElementById(
        "bruteTime"
    ).innerText =
        (endTime - startTime).toFixed(3)
        + " ms";


    document.getElementById(
        "bruteTraversal"
    ).innerText =
        Object.keys(graph).join(" → ");
}


// =========================
// BFS ANIMATION
// =========================

function animateBFS(requestNode) {

    let visited = new Set();

    let queue = [requestNode];

    let bfsOrder = [];

    let bfsEdges = [];

    visited.add(requestNode);


    while(queue.length > 0) {

        const current = queue.shift();

        bfsOrder.push(current);


        for (let neighbor of graph[current]) {

            if (!visited.has(neighbor)) {

                visited.add(neighbor);

                queue.push(neighbor);

                bfsEdges.push([current,neighbor]);
            }
        }
    }


    document.getElementById(
        "bfsTraversal"
    ).innerText =
        bfsOrder.join(" → ");


    bfsOrder.forEach((node,index) => {

        setTimeout(() => {

            drawGraph(
                requestNode,
                bfsOrder.slice(0,index+1),
                null,
                bfsEdges.slice(0,index+1)
            );

        }, index * 500);

    });
}


// =========================
// CAB MOVEMENT
// =========================

function animateCabMovement(
    selectedCab,
    startNode,
    endNode
) {

    const path = [startNode,endNode];


    path.forEach((node,index) => {

        setTimeout(() => {

            drawGraph(endNode,[],node);

        }, index * 1200);
    });
}


// =========================
// UPDATE CAB PANEL
// =========================

function updateCabStatePanel() {

    const panel =
        document.getElementById("cabStatesPanel");

    panel.innerHTML = "";


    for (let cab in cabStates) {

        const box = document.createElement("div");

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


        box.style.background = "#334155";

        box.style.padding = "12px";

        box.style.marginBottom = "10px";

        box.style.borderRadius = "10px";

        box.style.borderLeft =
            `5px solid ${color}`;


        box.innerHTML = `
            <strong>${cab}</strong><br>
            State:
            <span style="color:${color}">
                ${cabStates[cab]}
            </span>
        `;

        panel.appendChild(box);
    }
}


// =========================
// UPDATE SURGE
// =========================

function updateSurgePricing() {

    const surgeText =
        document.getElementById("surge");


    if ((activeRides / 5) >= 0.6) {

        surgeText.innerText = "ACTIVE";

        surgeText.style.color = "red";


        if (!surgeInterval) {

            let visible = true;

            surgeInterval = setInterval(() => {

                surgeText.style.opacity =
                    visible ? "0.3" : "1";

                visible = !visible;

            },500);
        }

    } else {

        surgeText.innerText = "NORMAL";

        surgeText.style.color = "white";

        surgeText.style.opacity = "1";


        clearInterval(surgeInterval);

        surgeInterval = null;
    }
}


// =========================
// DISPATCH CAB
// =========================

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

    animateBFS(requestNode);

    dfsTraversal(requestNode);

    bruteForceSearch();


    const [cabNode,distance] =
        bfsNearestCab(requestNode);


    if (cabNode === null) {

        alert("No Cab Available");

        return;
    }


    // FIND CAB

    let selectedCab = null;


    for (let cab in cabs) {

        if (cabs[cab] === cabNode) {

            selectedCab = cab;
        }
    }


    // ACTIVE RIDES

    activeRides++;

    document.getElementById(
        "busyCabs"
    ).innerText = activeRides;

    document.getElementById(
        "idleCabs"
    ).innerText = 5 - activeRides;


    updateSurgePricing();


    // DISPATCHED

    cabStates[selectedCab] = "DISPATCHED";

    updateCabStatePanel();


    // WAITING

    setTimeout(() => {

        cabStates[selectedCab] = "WAITING";

        updateCabStatePanel();

    },3000);


    // EN_ROUTE

    setTimeout(() => {

        cabStates[selectedCab] = "EN_ROUTE";

        updateCabStatePanel();

    },7000);


    // COMPLETED

    setTimeout(() => {

        cabStates[selectedCab] = "COMPLETED";

        updateCabStatePanel();

    },15000);


    // BACK TO IDLE

    setTimeout(() => {

        cabStates[selectedCab] = "IDLE";

        cabs[selectedCab] = requestNode;

        activeRides--;


        document.getElementById(
            "busyCabs"
        ).innerText = activeRides;

        document.getElementById(
            "idleCabs"
        ).innerText = 5 - activeRides;


        updateSurgePricing();

        updateCabStatePanel();

        drawGraph();

    },18000);


    // RIDE HISTORY

    const li = document.createElement("li");


    li.innerHTML = `
        ${selectedCab}
        dispatched from
        ${cabNode}
        to
        ${requestNode}
        (${distance} hops)
    `;


    document
        .getElementById("rideHistory")
        .appendChild(li);


    // CAB MOVEMENT

    animateCabMovement(
        selectedCab,
        cabNode,
        requestNode
    );


    // ALERT

    setTimeout(() => {

        alert(
            `${selectedCab} dispatched\n\n` +
            `Nearest Node: ${cabNode}\n` +
            `Distance: ${distance} hops`
        );

    },500);
}


// =========================
// INITIAL DRAW
// =========================

drawGraph();

updateCabStatePanel();