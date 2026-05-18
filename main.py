import time

from graph import CityGraph
from bfs_dispatch import bfs_nearest_cab
from dfs_routes import dfs_route
from bruteforce import brute_force_dispatch

from cab_states import (
    Cab,
    display_all_cabs,
    check_surge_pricing,
    display_dashboard,
    display_ride_history
)


# =========================================================
# UI FUNCTIONS
# =========================================================

def print_header():

    print("=" * 70)
    print("              CABGRID DISPATCH OPTIMIZER")
    print("=" * 70)


def section(title):

    print(f"\n{'=' * 25} {title} {'=' * 25}")


# =========================================================
# MAIN PROGRAM
# =========================================================

print_header()


# =========================================================
# CITY GRAPH CREATION
# =========================================================

section("CITY GRAPH")

city = CityGraph()

edges = [
    (1, 2), (1, 3),
    (2, 4), (2, 5),
    (3, 6), (3, 7),
    (4, 8), (5, 9),
    (6, 10), (7, 11),
    (8, 12), (9, 13),
    (10, 14), (11, 15),
    (12, 16), (13, 17),
    (14, 18), (15, 19),
    (16, 20)
]

for u, v in edges:
    city.add_edge(u, v)

city.display()


# =========================================================
# CAB INITIALIZATION
# =========================================================

section("CAB INITIALIZATION")

cab1 = Cab(1, 5)
cab2 = Cab(2, 11)
cab3 = Cab(3, 18)
cab4 = Cab(4, 7)
cab5 = Cab(5, 14)

cabs = [cab1, cab2, cab3, cab4, cab5]

display_all_cabs(cabs)


# =========================================================
# CAB LOCATION MAPPING
# =========================================================

cab_locations = {
    5: cab1,
    11: cab2,
    18: cab3,
    7: cab4,
    14: cab5
}


# =========================================================
# CUSTOMER REQUEST
# =========================================================

section("RIDE REQUEST")

request_node = 16

print(f"Customer requesting cab at node: {request_node}")


# =========================================================
# BFS DISPATCH
# =========================================================

section("BFS NEAREST CAB SEARCH")

start_bfs = time.perf_counter()

nearest_location, bfs_distance = bfs_nearest_cab(
    city.graph,
    list(cab_locations.keys()),
    request_node
)

end_bfs = time.perf_counter()

assigned_cab = cab_locations[nearest_location]

print(f"Nearest Cab Found : Cab {assigned_cab.cab_id}")
print(f"Cab Location      : {nearest_location}")
print(f"Distance          : {bfs_distance} hops")

bfs_time = end_bfs - start_bfs


# =========================================================
# DFS ROUTE EXPLORATION
# =========================================================

section("DFS ROUTE EXPLORATION")

dfs_traversal = dfs_route(city.graph, 1)

print("DFS Traversal Path:")
print(dfs_traversal)


# =========================================================
# BRUTE FORCE DISPATCH
# =========================================================

section("BRUTE FORCE COMPARISON")

start_brute = time.perf_counter()

bf_cab, bf_distance = brute_force_dispatch(
    city.graph,
    list(cab_locations.keys()),
    request_node
)

end_brute = time.perf_counter()

brute_time = end_brute - start_brute

print(f"Nearest Cab Found : {bf_cab}")
print(f"Distance          : {bf_distance} hops")


# =========================================================
# BENCHMARK RESULTS
# =========================================================

section("ALGORITHM BENCHMARK")

print("-" * 45)
print(f"{'Algorithm':<20}{'Execution Time'}")
print("-" * 45)

print(f"{'BFS':<20}{bfs_time:.8f} sec")
print(f"{'Brute Force':<20}{brute_time:.8f} sec")

print("-" * 45)


# =========================================================
# CAB STATE SIMULATION
# =========================================================

section("CAB PROCESS STATE SIMULATION")

assigned_cab.change_state("DISPATCHED")

check_surge_pricing(cabs)

display_dashboard(cabs)

assigned_cab.assign_ride(request_node)


# =========================================================
# FINAL STATUS
# =========================================================

section("FINAL CAB STATUS")

display_all_cabs(cabs)


# =========================================================
# RIDE HISTORY
# =========================================================

section("RIDE HISTORY")

display_ride_history()


# =========================================================
# END
# =========================================================

print("\n" + "=" * 70)
print("           CABGRID SIMULATION COMPLETED")
print("=" * 70)