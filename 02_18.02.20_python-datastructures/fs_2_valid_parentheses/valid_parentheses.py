def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """
    # let ')' = -1, '(' = 1; if at any time <0, automatic fail, if the end != 0, fail
    balanceState = 0;
    for character in parens:
        if character == '(':
            balanceState += 1;
        else:
            balanceState -= 1;

        if balanceState < 0:
            return False;

    return balanceState == 0;