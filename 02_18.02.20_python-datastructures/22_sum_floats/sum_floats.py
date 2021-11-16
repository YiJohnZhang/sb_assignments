def sum_floats(nums):
    """Return sum of floating point numbers in nums.
    
        >>> sum_floats([1.5, 2.4, 'awesome', [], 1])
        3.9
        
        >>> sum_floats([1, 2, 3])
        0
    """
    floatList = [element for element in nums if isinstance(element, float)];
    # for some reason I get 'float' is not defined [10, 69]

    sum = 0;
    for floatVar in floatList:
        sum = sum + floatVar;
    return sum;