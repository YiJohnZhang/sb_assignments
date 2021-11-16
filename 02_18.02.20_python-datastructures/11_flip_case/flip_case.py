def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """

    # caps case has lower ASCII no.
    # if previousCondition && ASCII(element) > ASCII(to_swap) => some lowercase to be upper
    # if previousConditino && ord(element) < ord(to_swap) => some uppercase to lower
    # python lst comprehension allows if-else(if-else) but no elif
    #    phrase = [element.lower() if (element.lower() == to_swap.lower() and ord(element) > ord(to_swap))]
    # if element.lower() != to_swap.lower()
        # element
    # else:
        # if ASCII(ele) < ASCII(swap.lower()):
            # ele is caps, must be lowered
        # else (if ASCII(ele) >= ASCII(swap.lower)):
            # ele is lowercase, must be capped
    return ''.join([element if(element.lower() != to_swap.lower()) else element.lower() if(ord(element) < ord(to_swap.lower())) else element.upper() for element in phrase]);
