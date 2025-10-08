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
        
        # For each M from 1 to N
        for M in range(1, N + 1):
            total = 0
            
            # Use a more efficient approach
            # Instead of generating all arrays, let's use the fact that
            # we can represent non-decreasing arrays as compositions
            
            # We can represent a non-decreasing array as a tuple (c0, c1, c2, ..., c_{N-1})
            # where ci is the count of element i in the array
            
            # The number of such arrays is C(2N-1, N) (stars and bars)
            
            # For each possible distribution of counts, we can calculate f(A, M)
            
            # Let me use a recursive approach to generate all possible count distributions
            def generate_count_distributions(remaining_length, remaining_values, current_counts, all_distributions):
                if remaining_length == 0:
                    all_distributions.append(current_counts[:])
                    return
                
                if remaining_values == 0:
                    return
                
                # Try all possible counts for the current value
                for count in range(remaining_length + 1):
                    current_counts.append(count)
                    generate_count_distributions(remaining_length - count, remaining_values - 1, current_counts, all_distributions)
                    current_counts.pop()
            
            # Generate all possible count distributions
            all_distributions = []
            generate_count_distributions(N, N, [], all_distributions)
            
            # For each distribution, calculate its contribution
            for counts in all_distributions:
                # Calculate the number of arrays with this distribution
                # This is the multinomial coefficient
                numerator = fact[N]
                denominator = 1
                for c in counts:
                    denominator = (denominator * fact[c]) % MOD
                
                num_arrays = (numerator * pow(denominator, MOD - 2, MOD)) % MOD
                
                # Calculate f(A, M) for arrays with this distribution
                f_value = calculate_f_for_distribution(counts, M)
                
                total = (total + num_arrays * f_value) % MOD
            
            result.append(total)
        
        print(' '.join(map(str, result)))

def calculate_f_for_distribution(counts, M):
    """Calculate f(A, M) for arrays with given element count distribution"""
    # We need to find all possible M-length subsequences and their MEX values
    
    # The MEX of a subsequence can be 0, 1, 2, ..., M
    # We need to check which of these are achievable
    
    mex_values = set()
    
    # For each possible MEX value m, check if it's achievable
    for mex in range(M + 1):
        if is_mex_achievable(counts, M, mex):
            mex_values.add(mex)
    
    return len(mex_values)

def is_mex_achievable(counts, M, mex):
    """Check if MEX = mex is achievable with given count distribution"""
    # MEX = mex means the subsequence contains 0, 1, ..., mex-1 but not mex
    
    if mex == 0:
        # MEX = 0: subsequence doesn't contain 0
        # We need M elements from positions 1, 2, ..., N-1
        available = sum(counts[i] for i in range(1, len(counts)))
        return available >= M
    
    elif mex >= len(counts):
        # MEX = mex: subsequence contains 0, 1, ..., mex-1
        # We need M elements from positions 0, 1, ..., mex-1
        available = sum(counts[i] for i in range(mex))
        return available >= M
    
    else:
        # MEX = mex: subsequence contains 0, 1, ..., mex-1 but not mex
        # We need M elements from positions 0, 1, ..., mex-1, mex+1, ..., N-1
        available = sum(counts[i] for i in range(mex)) + sum(counts[i] for i in range(mex + 1, len(counts)))
        return available >= M

if __name__ == "__main__":
    solve()