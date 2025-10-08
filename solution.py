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
            
            # Generate all non-decreasing arrays of length N with elements 0 to N-1
            # This is equivalent to choosing N elements with repetition from {0, 1, ..., N-1}
            # in non-decreasing order
            
            # We can use stars and bars to count the number of such arrays
            # For non-decreasing arrays with elements 0 to N-1, we need to count
            # the number of ways to place N elements such that 0 <= a1 <= a2 <= ... <= aN < N
            
            # This is equivalent to counting weak compositions of N into N parts
            # where each part is at most N-1
            
            # For each possible array, we need to calculate f(A, M)
            # f(A, M) is the number of distinct MEX values from M-length subsequences
            
            # Let's think about this differently:
            # For a given array A, what MEX values can we get from M-length subsequences?
            
            # The MEX of a sequence is the smallest non-negative integer not in the sequence
            # For M-length subsequences, the MEX can range from 0 to M
            
            # Let's use dynamic programming or combinatorial approach
            
            # For each possible "shape" of the array (how many 0s, 1s, 2s, etc.)
            # we can calculate the contribution to the sum
            
            # Let's use a more direct approach:
            # For each possible array, calculate f(A, M) and sum them up
            
            # We can represent a non-decreasing array as a tuple (c0, c1, c2, ..., c_{N-1})
            # where ci is the count of element i in the array
            
            # The total number of such arrays is C(2N-1, N) (stars and bars)
            
            # Let's implement a recursive approach to generate all possible arrays
            def generate_arrays(length, max_val, current_array, arrays):
                if length == 0:
                    arrays.append(current_array[:])
                    return
                
                start = current_array[-1] if current_array else 0
                for val in range(start, max_val):
                    current_array.append(val)
                    generate_arrays(length - 1, max_val, current_array, arrays)
                    current_array.pop()
            
            # Generate all non-decreasing arrays
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