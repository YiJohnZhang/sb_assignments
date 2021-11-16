def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    listCounter = 0;
    for element in lst:
        if isinstance(element, list):
            listCounter += 1;
    
    return listCounter == len(lst);