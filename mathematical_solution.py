MOD = 998244353

def solve():
    import sys
    input = sys.stdin.read
    data = input().split()
    
    T = int(data[0])
    test_cases = [int(data[i]) for i in range(1, T + 1)]
    
    for N in test_cases:
        result = []
        
        # Precompute factorials and inverse factorials
        max_fact = 2 * N
        fact = [1] * (max_fact + 1)
        inv_fact = [1] * (max_fact + 1)
        
        for i in range(1, max_fact + 1):
            fact[i] = (fact[i-1] * i) % MOD
        
        inv_fact[max_fact] = pow(fact[max_fact], MOD - 2, MOD)
        for i in range(max_fact - 1, -1, -1):
            inv_fact[i] = (inv_fact[i + 1] * (i + 1)) % MOD
        
        def comb(n, k):
            if k < 0 or k > n:
                return 0
            return (fact[n] * inv_fact[k] % MOD) * inv_fact[n - k] % MOD
        
        # The number of non-decreasing arrays of length N with elements 0 to N-1
        # is C(2N-1, N) using stars and bars
        total_arrays = comb(2 * N - 1, N)
        
        # Let me analyze the mathematical pattern more carefully
        # Looking at the sample outputs, I notice some patterns:
        
        # For N=2: [4, 3]
        # For N=3: [15, 15, 10] 
        # For N=4: [54, 60, 54, 35]
        # For N=5: [195, 225, 225, 195, 126]
        
        # Let me try to find a direct formula
        
        # For each M from 1 to N
        for M in range(1, N + 1):
            # I need to find the sum of f(A, M) over all non-decreasing arrays A
            
            # Let me think about this step by step:
            # 1. For a given array A, f(A, M) is the number of distinct MEX values
            #    from all M-length subsequences of A
            
            # 2. The MEX of a subsequence can be any value from 0 to M
            
            # 3. For each possible MEX value m, I need to count how many arrays A
            #    can produce at least one M-length subsequence with MEX = m
            
            # Let me try a different approach:
            # Instead of generating all arrays, let me use the fact that
            # the answer for M is related to combinatorial properties
            
            # Looking at the pattern, let me try to find a direct formula
            
            # For M = 1: The answer seems to be related to the total number of arrays
            # For M = N: The answer seems to follow a specific pattern
            
            # Let me implement a formula based on the observed patterns
            
            if M == 1:
                # For M = 1, each array contributes the number of distinct elements
                # This is more complex than just total_arrays
                # Let me calculate this directly
                total = 0
                
                # For each possible number of distinct elements k (1 <= k <= N)
                for k in range(1, N + 1):
                    # Number of non-decreasing arrays with exactly k distinct elements
                    # This is C(N-1, k-1) * C(N, k) using stars and bars
                    count_arrays = (comb(N - 1, k - 1) * comb(N, k)) % MOD
                    total = (total + k * count_arrays) % MOD
                
                result.append(total)
                
            elif M == N:
                # For M = N, we have only one subsequence (the entire array)
                # The MEX of the entire array can be 0, 1, 2, ..., N
                # We need to count how many arrays have MEX = 0, 1, 2, ..., N
                
                total = 0
                for mex in range(N + 1):
                    # Count arrays with MEX = mex
                    # An array has MEX = mex if it contains 0, 1, ..., mex-1 but not mex
                    
                    if mex == 0:
                        # MEX = 0 means the array doesn't contain 0
                        # All elements are >= 1
                        # This is C(N + N - 2, N) = C(2N - 2, N)
                        count = comb(2 * N - 2, N)
                    elif mex == N:
                        # MEX = N means the array contains 0, 1, ..., N-1
                        # This is C(N-1, N-1) = 1
                        count = 1
                    else:
                        # MEX = mex means the array contains 0, 1, ..., mex-1 but not mex
                        # Elements can be 0, 1, ..., mex-1, mex+1, ..., N-1
                        # This is C(N + N - 2, N) = C(2N - 2, N) for mex > 0
                        count = comb(2 * N - 2, N)
                    
                    total = (total + count) % MOD
                
                result.append(total)
                
            else:
                # For other values of M, this is more complex
                # Let me use the optimized approach for now
                total = 0
                
                def generate_arrays_optimized(length, max_val, current, arrays):
                    if length == 0:
                        arrays.append(tuple(current))
                        return
                    
                    start = current[-1] if current else 0
                    for val in range(start, max_val):
                        current.append(val)
                        generate_arrays_optimized(length - 1, max_val, current, arrays)
                        current.pop()
                
                arrays = []
                generate_arrays_optimized(N, N, [], arrays)
                
                from functools import lru_cache
                
                @lru_cache(maxsize=None)
                def get_mex_values(arr_tuple, M):
                    arr = list(arr_tuple)
                    mex_values = set()
                    
                    def generate_subsequences(start, current):
                        if len(current) == M:
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
                
                for arr in arrays:
                    total = (total + get_mex_values(arr, M)) % MOD
                
                result.append(total)
        
        print(' '.join(map(str, result)))

if __name__ == "__main__":
    solve()