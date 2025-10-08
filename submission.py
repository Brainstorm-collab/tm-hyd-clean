MOD = 998244353

def solve():
    import sys
    from functools import lru_cache
    
    input = sys.stdin.read
    data = input().split()
    
    T = int(data[0])
    test_cases = [int(data[i]) for i in range(1, T + 1)]
    
    for N in test_cases:
        result = []
        
        # Memoize the MEX calculation for subsequences
        @lru_cache(maxsize=None)
        def get_mex_values(arr_tuple, M):
            """Get distinct MEX values for M-length subsequences of arr"""
            arr = list(arr_tuple)
            mex_values = set()
            
            def generate_subsequences(start, current):
                if len(current) == M:
                    # Calculate MEX
                    mex = 0
                    while mex in current:
                        mex += 1
                    mex_values.add(mex)
                    return
                
                for i in range(start, len(arr)):
                    current.append(arr[i])
                    generate_subsequences(i + 1, current)
                    current.pop()
            
            generate_subsequences(0, [])
            return len(mex_values)
        
        # For each M from 1 to N
        for M in range(1, N + 1):
            total = 0
            
            # Generate all non-decreasing arrays efficiently
            def generate_arrays(length, max_val, current, arrays):
                if length == 0:
                    arrays.append(tuple(current))  # Use tuple for memoization
                    return
                
                start = current[-1] if current else 0
                for val in range(start, max_val):
                    current.append(val)
                    generate_arrays(length - 1, max_val, current, arrays)
                    current.pop()
            
            arrays = []
            generate_arrays(N, N, [], arrays)
            
            # For each array, calculate f(A, M) using memoization
            for arr in arrays:
                total = (total + get_mex_values(arr, M)) % MOD
            
            result.append(total)
        
        print(' '.join(map(str, result)))

if __name__ == "__main__":
    solve()