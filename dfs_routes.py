def dfs_route(graph, start, visited=None, traversal=None):

    if visited is None:
        visited = set()

    if traversal is None:
        traversal = []

    visited.add(start)
    traversal.append(start)

    for neighbor in graph[start]:

        if neighbor not in visited:
            dfs_route(graph, neighbor, visited, traversal)

    return traversal