def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    num1Set = set(str(num1));
    num2Set = set(str(num2));

    if num1Set != num2Set:
        return False;
    
    num1Dict = {int(element):0 for element in num1Set};
    num2Dict = num1Dict.copy();

    for number in str(num1):
        num1Dict[int(number)] += 1;
    
    for number in str(num2):
        num2Dict[int(number)] += 1;
    
    return num1Dict == num2Dict;