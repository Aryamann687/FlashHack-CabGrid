import tkinter as tk
from tkinter import ttk
import time

from graph import CityGraph
from bfs_dispatch import bfs_nearest_cab
from dfs_routes import dfs_route
from brute_force import brute_force_dispatch

from cab_states import (
    Cab,
    display_ride_history
)


# =========================================================
# GRAPH SETUP
# =========================================================

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


# =========================================================
# CAB SETUP
# =========================================================

cab1 = Cab(1, 5)
cab2 = Cab(2, 11)
cab3 = Cab(3, 18)
cab4 = Cab(4, 7)
cab5 = Cab(5, 14)

cabs = [cab1, cab2, cab3, cab4, cab5]

cab_locations = {
    5: cab1,
    11: cab2,
    18: cab3,
    7: cab4,
    14: cab5
}


# =========================================================
# MAIN WINDOW
# =========================================================

root = tk.Tk()

root.title("CabGrid Dispatch Optimizer")

root.geometry("1200x700")

root.configure(bg="#0f172a")


# =========================================================
# TITLE
# =========================================================

title = tk.Label(
    root,
    text="CABGRID DISPATCH OPTIMIZER",
    font=("Arial", 24, "bold"),
    bg="#0f172a",
    fg="white"
)

title.pack(pady=20)


# =========================================================
# FRAME
# =========================================================

main_frame = tk.Frame(root, bg="#0f172a")

main_frame.pack(fill="both", expand=True, padx=20)


# =========================================================
# CAB STATUS TABLE
# =========================================================

table_frame = tk.Frame(main_frame, bg="#1e293b")

table_frame.pack(side="left", fill="both", expand=True, padx=10)


table_title = tk.Label(
    table_frame,
    text="Cab Status Dashboard",
    font=("Arial", 18, "bold"),
    bg="#1e293b",
    fg="white"
)

table_title.pack(pady=10)


columns = ("Cab ID", "Location", "State")

tree = ttk.Treeview(
    table_frame,
    columns=columns,
    show="headings",
    height=10
)

for col in columns:
    tree.heading(col, text=col)
    tree.column(col, width=120)

tree.pack(pady=10)


def refresh_table():

    for item in tree.get_children():
        tree.delete(item)

    for cab in cabs:

        tree.insert(
            "",
            "end",
            values=(
                cab.cab_id,
                cab.location,
                cab.state
            )
        )


refresh_table()


# =========================================================
# RIGHT PANEL
# =========================================================

right_panel = tk.Frame(main_frame, bg="#1e293b")

right_panel.pack(side="right", fill="both", expand=True, padx=10)


# =========================================================
# RIDE REQUEST
# =========================================================

request_title = tk.Label(
    right_panel,
    text="Ride Request",
    font=("Arial", 18, "bold"),
    bg="#1e293b",
    fg="white"
)

request_title.pack(pady=10)


request_entry = tk.Entry(
    right_panel,
    font=("Arial", 14)
)

request_entry.pack(pady=10)


result_label = tk.Label(
    right_panel,
    text="",
    bg="#1e293b",
    fg="white",
    font=("Arial", 12)
)

result_label.pack(pady=10)


# =========================================================
# DFS OUTPUT
# =========================================================

dfs_label = tk.Label(
    right_panel,
    text="DFS Traversal",
    bg="#1e293b",
    fg="white",
    font=("Arial", 16, "bold")
)

dfs_label.pack(pady=10)


dfs_output = tk.Text(
    right_panel,
    height=5,
    width=40,
    bg="#0f172a",
    fg="white"
)

dfs_output.pack(pady=10)


dfs_path = dfs_route(city.graph, 1)

dfs_output.insert(
    tk.END,
    str(dfs_path)
)


# =========================================================
# BENCHMARK LABEL
# =========================================================

benchmark_label = tk.Label(
    right_panel,
    text="",
    bg="#1e293b",
    fg="#22c55e",
    font=("Arial", 12, "bold")
)

benchmark_label.pack(pady=10)


# =========================================================
# DISPATCH FUNCTION
# =========================================================

def dispatch_cab():

    request_node = int(request_entry.get())

    start_bfs = time.perf_counter()

    nearest_location, bfs_distance = bfs_nearest_cab(
        city.graph,
        list(cab_locations.keys()),
        request_node
    )

    end_bfs = time.perf_counter()

    bfs_time = end_bfs - start_bfs

    assigned_cab = cab_locations[nearest_location]

    start_brute = time.perf_counter()

    brute_force_dispatch(
        city.graph,
        list(cab_locations.keys()),
        request_node
    )

    end_brute = time.perf_counter()

    brute_time = end_brute - start_brute

    speedup = brute_time / bfs_time

    assigned_cab.assign_ride(request_node)

    refresh_table()

    result_label.config(
        text=(
            f"Nearest Cab: Cab {assigned_cab.cab_id}\n"
            f"Distance: {bfs_distance} hops"
        )
    )

    benchmark_label.config(
        text=(
            f"BFS Time: {bfs_time:.8f} sec\n"
            f"Brute Force Time: {brute_time:.8f} sec\n"
            f"BFS is {speedup:.2f}x Faster"
        )
    )


# =========================================================
# BUTTON
# =========================================================

dispatch_button = tk.Button(
    right_panel,
    text="Dispatch Cab",
    font=("Arial", 14, "bold"),
    bg="#22c55e",
    fg="white",
    command=dispatch_cab
)

dispatch_button.pack(pady=20)


# =========================================================
# START GUI
# =========================================================

root.mainloop()