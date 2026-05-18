from collections import deque

def bfs_nearest_cab(graph, cab_locations, request_node):

    visited = set()
    queue = deque()

    queue.append((request_node, 0))
    visited.add(request_node)

    while queue:
        current, distance = queue.popleft()

        if current in cab_locations:
            return current, distance

        for neighbor in graph[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, distance + 1))

    return None, -1