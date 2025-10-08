MOD = 998244353

def solve():
    import sys
    input = sys.stdin.read
    data = input().split()
    
    T = int(data[0])
    test_cases = [int(data[i]) for i in range(1, T + 1)]
    
    for N in test_cases:
        result = []
        
        # Precompute factorials and inverse factorials modulo MOD
        max_fact = 2 * N
        fact = [1] * (max_fact + 1)
        inv_fact = [1] * (max_fact + 1)
        
        for i in range(1, max_fact + 1):
            fact[i] = (fact[i-1] * i) % MOD
        
        # Compute inverse factorials using Fermat's little theorem
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
        
        # For each M from 1 to N
        for M in range(1, N + 1):
            # We need to find the sum of f(A, M) over all non-decreasing arrays A
            
            # Key insight: For a given M, we can analyze what MEX values are possible
            # from M-length subsequences of non-decreasing arrays
            
            # The MEX of a subsequence can be any value from 0 to M
            # We need to count how many distinct MEX values are achievable
            
            # Let's think about this differently:
            # For each possible MEX value m (0 <= m <= M), count how many arrays
            # can produce at least one M-length subsequence with MEX = m
            
            # This is a complex combinatorial problem. Let me use a different approach:
            # For each possible "pattern" of the array, calculate its contribution
            
            # Let's use the fact that we can represent non-decreasing arrays as
            # compositions with constraints
            
            # Actually, let me try a more direct approach by analyzing the structure
            
            # For M = 1: Each single element can have MEX values 0 or 1
            # For M = 2: Each pair can have MEX values 0, 1, or 2
            # etc.
            
            # Let me implement a more systematic approach
            total = 0
            
            # Generate all possible non-decreasing arrays and calculate f(A, M)
            # But do it more efficiently using combinatorial methods
            
            # We can represent a non-decreasing array as a tuple of counts
            # (c0, c1, c2, ..., c_{N-1}) where ci is the count of element i
            
            def count_arrays_with_counts(counts):
                """Count the number of non-decreasing arrays with given element counts"""
                if sum(counts) != N:
                    return 0
                
                # This is the multinomial coefficient
                numerator = fact[N]
                denominator = 1
                for c in counts:
                    denominator = (denominator * fact[c]) % MOD
                
                return (numerator * pow(denominator, MOD - 2, MOD)) % MOD
            
            def calculate_f_for_counts(counts, M):
                """Calculate f(A, M) for an array with given element counts"""
                # Generate all M-length subsequences and find distinct MEX values
                mex_values = set()
                
                # Use dynamic programming to generate all possible M-length subsequences
                # and their MEX values
                
                # For efficiency, we can use the fact that we only care about distinct MEX values
                # Let's think about what MEX values are possible
                
                # The MEX of a subsequence is the smallest non-negative integer not in it
                # For M-length subsequences, MEX can be 0, 1, 2, ..., M
                
                # We need to check which of these are achievable
                
                # For MEX = 0: need a subsequence that doesn't contain 0
                # For MEX = 1: need a subsequence that contains 0 but not 1
                # For MEX = 2: need a subsequence that contains 0,1 but not 2
                # etc.
                
                # Let's check each possible MEX value
                for mex in range(M + 1):
                    # Check if MEX = mex is achievable
                    # We need a subsequence of length M that contains 0,1,...,mex-1 but not mex
                    
                    # Count how many elements we have from 0 to mex-1
                    available = sum(counts[i] for i in range(mex))
                    
                    # We need at least M elements from 0 to mex-1, and none from mex
                    if available >= M and (mex >= N or counts[mex] == 0):
                        mex_values.add(mex)
                    elif mex < N and counts[mex] > 0:
                        # We have some elements equal to mex
                        # Check if we can form a subsequence of length M without mex
                        if available >= M:
                            mex_values.add(mex)
                
                return len(mex_values)
            
            # Generate all possible count distributions
            def generate_counts(length, max_val, current_counts, all_counts):
                if length == 0:
                    all_counts.append(current_counts[:])
                    return
                
                start = current_counts[-1] if current_counts else 0
                for val in range(start, max_val):
                    current_counts.append(val)
                    generate_counts(length - 1, max_val, current_counts, all_counts)
                    current_counts.pop()
            
            # Actually, let me use a different approach
            # Instead of generating all arrays, let me use mathematical insights
            
            # For each M, I need to find the sum of f(A, M) over all non-decreasing arrays A
            
            # Let me try to find a direct formula
            
            # For M = 1: Each array contributes the number of distinct single elements
            # For M = 2: Each array contributes the number of distinct MEX values from pairs
            # etc.
            
            # This is getting complex. Let me implement a more direct but optimized version
            # of the original approach
            
            # Use memoization and optimize the generation
            from functools import lru_cache
            
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
            
            # Generate arrays more efficiently
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
            
            for arr in arrays:
                total = (total + get_mex_values(arr, M)) % MOD
            
            result.append(total)
        
        print(' '.join(map(str, result)))

if __name__ == "__main__":
    solve()