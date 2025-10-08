MOD = 998244353

def solve():
    import sys
    input = sys.stdin.read
    data = input().split()
    
    T = int(data[0])
    test_cases = [int(data[i]) for i in range(1, T + 1)]
    
    for N in test_cases:
        result = []
        
        # For each M from 1 to N
        for M in range(1, N + 1):
            total = 0
            
            # Generate all non-decreasing arrays efficiently
            def generate_arrays(length, max_val, current, arrays):
                if length == 0:
                    arrays.append(current[:])
                    return
                
                start = current[-1] if current else 0
                for val in range(start, max_val):
                    current.append(val)
                    generate_arrays(length - 1, max_val, current, arrays)
                    current.pop()
            
            arrays = []
            generate_arrays(N, N, [], arrays)
            
            # For each array, calculate f(A, M)
            for arr in arrays:
                # Get all M-length subsequences and their MEX values
                mex_values = set()
                
                # Generate all M-length subsequences
                def generate_subsequences(arr, M, start, current, mex_values):
                    if len(current) == M:
                        # Calculate MEX of current subsequence
                        mex_val = 0
                        while mex_val in current:
                            mex_val += 1
                        mex_values.add(mex_val)
                        return
                    
                    for i in range(start, len(arr)):
                        current.append(arr[i])
                        generate_subsequences(arr, M, i + 1, current, mex_values)
                        current.pop()
                
                generate_subsequences(arr, M, 0, [], mex_values)
                total += len(mex_values)
            
            result.append(total % MOD)
        
        print(' '.join(map(str, result)))

if __name__ == "__main__":
    solve()