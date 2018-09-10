# Memory-game

## Intro

* Click any square to start the game
* Upon start, the timer starts to record time
* Each move is defined as clicking two squares
* Goal is to match all square pairs in least number of moves
* 3-Star performance: <= 14 moves, 2-Star perf: <= 22 moves. rest = 1-Star
* When two nonmatching squares are being displayed, clicking on another square will have no effect
* The symbols behind each square is randomly and uniquely generated using HTML symbols, thus each game will most likely have a unique set of symbols

## Notes

* This project is built from scratch, without using Udacity's starter code provided
* An array of 16 elements is used to store square (card) ID's which are in the form of Number + Letter A or B, i.e. "2A" and "2B" forming a pair, there are total of 8 pairs
* The card's HTML symbol is randomly and uniquely generated and assigned later upon click. The range of HTML symbol is 9728 to 10001.
* The assigned HTML symbol is then mapped to the square ID's number part, e.g. card "3A" and "3B" having the same symbol. A "dictionary" container is used to store the card ID's number and their corresponding HTML symbol
* The game is designed responsively, the board shrinks in smaller viewport
