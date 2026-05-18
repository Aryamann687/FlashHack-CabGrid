from collections import deque


def shortest_path_length(graph, start, target):

    queue = deque([(start, 0)])
    visited = set()

    while queue:

        node, dist = queue.popleft()

        if node == target:
            return dist

        visited.add(node)

        for neighbor in graph[node]:

            if neighbor not in visited:
                queue.append((neighbor, dist + 1))

    return float('inf')


def brute_force_dispatch(graph, cab_locations, request_node):

    nearest_cab = None
    minimum_distance = float('inf')

    for cab in cab_locations:

        distance = shortest_path_length(
            graph,
            cab,
            request_node
        )

        if distance < minimum_distance:

            minimum_distance = distance
            nearest_cab = cab

    return nearest_cab, minimum_distance