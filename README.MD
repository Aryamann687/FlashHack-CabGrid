# CabGrid: Real-Time Cab Dispatch Optimizer

## Problem Statement

CabGrid is a cab dispatch simulation system based on graph traversal algorithms and operating system process state concepts.

The city is represented as a graph where:

- Nodes represent intersections or locations
- Edges represent roads
- Cabs are placed at different nodes
- Ride requests are generated from customer locations

The system finds the nearest available cab, explores routes, compares dispatch strategies, and manages cab state transitions.

---

## Team Members

- Aryaman
- Ashish
- Bharat

---

## Concepts Used

### DAA Concepts

- Breadth First Search (BFS)
- Depth First Search (DFS)
- Brute Force Dispatching
- Graph Representation using Adjacency List

### OS Concepts

Each cab is treated like a process and moves through different states.

Cab states used:

```text
NEW → IDLE → DISPATCHED → WAITING → EN_ROUTE → COMPLETED → IDLE