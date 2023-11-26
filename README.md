# Requirements
Node JS - any version more than 16.x should be fine.
I've devloped on `v20.9.0` - use this if code is not working.

# How to use
1. Pull the repository

2. Have a CSV file like this:
```
5,3,4
5,3,6
2,2,3
2,4,1
```

3. Put it the root directory - an example file is already there (tst.csv)
4. Initiate the program
```
node index.js
```
5. Provide file path when promted
```
Please enter the path to the CSV file: tst.csv
```

6. Should result in output

```
Inputs: A = 5, B = 3, C = 4
0 0
5 0
2 3
2 0
0 2
5 2
4 3
4 0
==========================


Inputs: A = 5, B = 3, C = 6
0 0
0 3
3 0
3 3
==========================


Inputs: A = 2, B = 2, C = 3
Impossible
==========================


Inputs: A = 2, B = 4, C = 1
Impossible
==========================
```
