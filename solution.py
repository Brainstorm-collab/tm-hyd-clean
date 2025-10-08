
def solve():
    """
    Optimized solution using better strategy.
    
    Key insight: We want to maximize the number of positions i where A[P_i] <= A[i].
    Since we need a derangement (no fixed points), we need to be careful about assignments.
    
    Strategy:
    1. For each position i, we want to assign P_i such that A[P_i] <= A[i] and P_i != i
    2. We should prioritize positions with larger A[i] values first, as they have more options
    3. For each position, choose the smallest available element that satisfies the constraint
    """
    import sys
    input = sys.stdin.read
    data = input().split()
    
    idx = 0
    T = int(data[idx])
    idx += 1
    
    for _ in range(T):
        N = int(data[idx])
        idx += 1
        A = list(map(int, data[idx:idx+N]))
        idx += N
        
        # Try multiple strategies and pick the best one
        best_score = -1
        best_result = None
        
        # Try different strategies and pick the best one
        strategies = ["desc", "asc", "original"]
        for strategy in strategies:
            score, result = solve_with_strategy(A, N, strategy)
            if score > best_score:
                best_score = score
                best_result = result
        
        print(best_score)
        print(' '.join(map(str, best_result)))

def solve_with_strategy(A, N, strategy="desc"):
    """Solve using a specific strategy"""
    if strategy == "desc":
        positions = [(A[i], i) for i in range(N)]
        positions.sort(reverse=True)
    elif strategy == "asc":
        positions = [(A[i], i) for i in range(N)]
        positions.sort()
    else:  # original
        positions = [(A[i], i) for i in range(N)]
    
    result = [-1] * N
    used = [False] * N
    score = 0
    
    # Process positions according to strategy
    for _, pos in positions:
        # Try to find the best element for this position
        best_element = -1
        best_value = float('inf')
        
        # Look for the smallest available element that satisfies A[j] <= A[pos] and j != pos
        for j in range(N):
            if not used[j] and j != pos and A[j] <= A[pos]:
                if A[j] < best_value:
                    best_value = A[j]
                    best_element = j
        
        if best_element != -1:
            result[pos] = best_element + 1  # Convert to 1-indexed
            used[best_element] = True
            score += 1
    
    # Handle any remaining unassigned positions
    remaining_elements = [i for i in range(N) if not used[i]]
    remaining_positions = [i for i in range(N) if result[i] == -1]
    
    for i, pos in enumerate(remaining_positions):
        if i < len(remaining_elements):
            result[pos] = remaining_elements[i] + 1
    
    return score, result

if __name__ == "__main__":
    solve()