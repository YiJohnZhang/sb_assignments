def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """

    # 'if divisible by' 2 => will go to halfway point; max I need to iterate is up to 1/2 of the value.
    # 'if divislbe by' 3 => max I need to go is 1/3
    # '' 5 => 1/5, etc.
    # '' 11 => 1/11
    # if it is prime, then I don't need to check others.
    # all i really need to check is the prime numbers <some reasonable amount? iirc rel. # of primes is roughly prop. sqrt(n)?

        # 1 generate list of primes: check odd numbers after 3. check for ~sqrt(n)+1
        # 2 check for all divisors up to that number
    
    def listPrimes(num):

        listOfPrimes = [2];

        for testPrimeNumber in range(3,int(num**0.5)+1,2):
            
            isPrimeFlag = True;
            for primeNumber in listOfPrimes:
                
                if testPrimeNumber % primeNumber == 0:   #not prime
                    # print(f"don't add {testPrimeNumber}")
                    isPrimeFlag = False;
                    break;
                # print(f'append {testPrimeNumber}');
            if isPrimeFlag:
                listOfPrimes.append(testPrimeNumber);
            # print(f'verifiedPrime: {primeNumber}, testPrimeNumber: {testPrimeNumber}, truth: {isPrimeFlag}');
            
        # print(listOfPrimes);
        return listOfPrimes.pop();
        
    largestPrime = listPrimes(num);
    
    factorPairs = [];
    
    for testDivisor in range(1, largestPrime+1):
        if num % testDivisor == 0:
            factorPairs.append(int(testDivisor));
            factorPairs.append(int(num/testDivisor));
                
    # print(factorPairs); 
    factorPairs.sort(); #.sort() mutates the list, doesn't return a new one ...
    
    return factorPairs;