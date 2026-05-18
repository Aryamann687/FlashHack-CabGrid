graph = {
    1: [2, 3],
    2: [1, 4, 5],
    3: [1, 6, 7],
    4: [2],
    5: [2, 8],
    6: [3],
    7: [3],
    8: [5]
}
from dfs_routes import dfs_route
from bruteforce import brute_force_dispatch

cab_locations = [4, 7]

request_node = 8

route = dfs_route(graph, 1)

print("DFS Traversal:")
print(route)

cab, dist = brute_force_dispatch(
    graph,
    cab_locations,
    request_node
)

print("\nBrute Force Result")
print("Nearest Cab:", cab)
print("Distance:", dist)