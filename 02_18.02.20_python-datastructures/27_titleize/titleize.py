def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """

    phrase = phrase.lower()
    phraseList = phrase.split(' ');
    phraseList = [phrase.title() for phrase in phraseList]

    return ' '.join(phraseList)