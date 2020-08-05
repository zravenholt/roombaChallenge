# roombaChallenge


## GOAL: Write a program that navigates an imaginary roomba through an equally imaginary room and cleans up imaginary dirt.

###### TO RUN PROGRAM:
- Download repository
- Open Terminal
- CD to root of repository
- Execute the command `node roombaChallenge.js` (This requires you to have Node installed.)
- Outcome of the challenge is logged in Terminal

###### THINGS TO KNOW:
1. The program relies on a source input file

2. The default source file is `./input.txt` and that file will be used on default execution

3. If you would like to execute the challenge with a different source, an alternative file is provided (`./input2.txt`), or you can make your own.
   - To change source input, **edit line 4 in roombaChallenge.js** to point to the newly desired file
   
4. The program ***DOES MAKE ASSUMPTIONS*** when dealing with source data, as stated below in the Challenge Briefing

5. If you provide your own input files, make sure they are formatted correctly or else the program may not work properly.
   - Only provide 2 numbers per row, with a space between them and nothing before/after them
   - The first row is always the room dimensions
   - The second row is always the starting position of the roomba
   - Every row following that (except the last row) is a location of dirt
   - The last row should be `NSEW` cardinal directions; there should be no row (even empty rows) below that one.

###### CHALLENGE BRIEFING:
* Data is provided via a text file (`./input.txt` in this case).
* The room, roomba, and dirt are visualized through `(X,Y)` coordinates in the source file.
* The first row of data is the `(X,Y)` dimensions of the room. `(0,0)` is the bottom left corner of the room, the first row of data is the rop right `(X,Y)` of the room.
* The second row of data is the starting `(X,Y)` location of the roomba within the room.
* Every following row of data EXCEPT the final row is the `(X,Y)` coordinate of a piece of dirt in the room.
* The final row of data is a string of letters representing cardinal directions: `North`, `South`, `East`, `West`.
* Each letter also represents a single command for the roomba to move to a new coordinate (if allowed by confines of the room, it does have walls).
* A direction to the North equates to a single positive increment on the Y axis, vice versa for South.
* A direction to the East equates to a single positive increment on the X axis, vice versa for West.
* Final output should print the roomba's ending location, as well as the number of dirty tiles that it cleaned by completing the full list of commands.
