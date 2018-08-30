document.addEventListener("DOMContentLoaded", function (event) {


    let container = document.getElementById("container");
    let divCon = container.getElementsByClassName("material-icons");
    let icons = document.getElementsByClassName('card');
    let submit = document.getElementById('erase');
    let resetBtn = document.getElementById('reset');
    let stars = document.getElementById('stars');
    let boxEnd = document.getElementById('modal');
    let boxEndContent = document.getElementById('matchbox');
    let resetBox = document.getElementsByClassName('resetBox')[0];
    let flag = false;
    let flagOne = false;
    let setClicks;
    let endGameCount = 0;
    let clickCount = 0;
    let eventOne;
    let eventTwo;
    let currentStarCount = 3
    let innerText = '';

    //for timer setup
    let timer = document.getElementsByClassName('timer')[0];
    let minute = 0;
    let second = 0;
    let countTimer;



//array list of icons names
    const arrayIcons = ["phone", "face", "cloud", "watch", "brush", "details", "local_taxi", "timer", "timer", "local_taxi", "details", "brush", "watch", "cloud", "face", "phone"];
    //const count = arrayIcons.length;
    //let copyArray = arrayIcons.slice();
    let counter = 0;
    let counterTwo = 0;


    container.addEventListener('click', click);
    resetBtn.addEventListener('click', reset);




    function box(){ // modal box content
    clearTimeout(run());

         boxEndContent.innerText = ("CONGRATS - ALL CARDS HAVE BEEN MATCHED!!\nTIME: " + timer.innerText + "\nStar Count: " + currentStarCount
          + "\n LET'S PLAY AGAIN?");
         clearTime(run);
        boxEnd.style.display = 'block';
        setTimeout(newGame, 5500); //game auto restarts
    }


    function newGame(){ //make make mode box disapper and reset all variable to initial settings
        boxEnd.style.display = 'none';
        reset();
    }

    function reset() { // reset the board and all variables to initial settings
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        boxEnd.style.display = 'none';
        endGameCount = 0;
        //reset timer
        clearTime(run);
        minute = 0;
        second = 0;
        boxEndContent.innerHTML="";
        innerText = null;
        //reset clickCount
        clickCount = 0;
        //reset stars
        stars.innerText = 'star star star';

        //reset boardj,
        initCard();

    }

    function initCard() { //reshuffles the arrayList of cards
        let array = shuffle(arrayIcons);
        array.forEach(function (word) {
            let div = document.createElement('div');
            div.classList.add('card');
            let icon = document.createElement('i');
            icon.classList.add('material-icons');
            //let word = document.createTextNode('phone');
            icon.append(word);
            div.appendChild(icon);
            container.appendChild(div);

        })
    }




    function click(evt) { // holds to click events and assigns variables

        let currentIcon = evt.target.getElementsByClassName('material-icons')[0];
            if (!currentIcon.classList.contains('show')) { //disable click of card already matched
                currentIcon.classList.add('show'); //hightlights card and makes if visible
                    if (eventOne == null) { //if statement set up the two clicks to later be evaluated
                        eventOne = currentIcon;

                        if(endGameCount == 0 && second == 0){ //starts game timer
                            run();
                        }
                    } else {
                        eventTwo = currentIcon;
                        container.removeEventListener('click', click); //disables clicks on screen
                        clickCount ++;
                        console.log(clickCount);
                        startCount(clickCount);
                        flagOne = true;
                    }
                flagOut(flagOne);

            }
        }

   function flagOut(value){ //compare cards and responds accordingly
    if(value) {
        setTimeout(function () {
         let matchStat = (eventOne.innerText == eventTwo.innerText);
         if(matchStat){
            match()
         } else {
             noMatch();
         }

         }, 1500);

    }
       }

    function  match(){ //if card matches - also searches for end of game parameters

       eventOne.classList.add('match');
       eventTwo.classList.add('match');
       eventOne.style.pointerEvents = 'none';
       eventTwo.style.pointerEvents = 'none';
       endGameCount++;
        if(endGameCount == 8){ // needs to be 8 - one for testing purposed only
            box();
            //reset(); testing purposes only
        }
        eventOne = null;
        eventTwo = null;
        container.addEventListener('click', click);

    }

    function noMatch(){

        eventOne.classList.remove('show');
        eventTwo.classList.remove('show');
        eventOne = null; //reset eventOne & two to null. will thow an error in console but its okay
        eventTwo = null;
        container.addEventListener('click', click);

    }

    //function to add the seconds as time goes by
    function run(){
        second++;
        if(second >= 60){
            minute++;
            second = 0;
        }
        let minutes  = minute;
        let seconds = second;
        minutes = minute > 9 ? minute : ('0' + minute);
        seconds = (second > 9 ? second : ('0' + second));
        timer.innerText = (minutes + ":" + seconds);

        go();


    }

    //function that reiterates every 1 second/1000ms
    function go(){
        countTimer = setTimeout(run, 1000);
    }

    //function to reset the timver
    function clearTime(){
        clearTimeout(countTimer);
        timer.innerText = "00:00";
    }

    //star display
    function startCount(clicks){
        console.log(clicks);
        switch (clicks) {

            case clicks < 8:
                stars.innerText = 'star star star';
                currentStarCount = 3
                break;
            case clicks = 12:
                stars.innerText = 'star star star_border';
                currentStarCount =  2
                break;
            case clicks = 16:
                stars.innerText = 'star star_border star_border';
                currentStarCount = 1
                break;
            case clicks = 20:
                stars.innerText = 'star_border star_border star_border';
                currentStarCount = 'None Sorry!';

            // default:
            //     stars.innerText = 'star star star';

        }

    }


    //testing code
    // function endGame(count){
    //     console.log(count);
    //     if(count == 1){
    //         reset();
    //         console.log('shuffle and restart');
    //         endGameCount = 0;
    //     }
    //}


   /* container.addEventListener('click', function list(evt) {

        evt.preventDefault();
        evt.target.style.textIndent = '0px';
        evt.target.classList.add('show-icon');
        if(eventOne === 'empty'){
            eventOne = evt.target;
        } else {
            evt.target.style.textIndent = '0px';
            eventTwo = evt.target;
            container.removeEventListener('click', list);

        }
        setClicks = [eventOne, eventTwo];

        });
*/

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }



//create shuffle for array and return shuffled array
/*
    function shuffle() {
        let copyArray = [...arrayIcons];
        console.log(copyArray.length);
        while (counter < 16) {
            let randomIndex = Math.floor(Math.random() * copyArray.length);
            let word = copyArray[randomIndex];
            let div = document.createElement('div');
            div.classList.add('card');
            let icon = document.createElement('i');
            icon.classList.add('material-icons');
            //let word = document.createTextNode('phone');
            icon.append(word);
            div.appendChild(icon);
            container.appendChild(div);
            copyArray.splice(randomIndex, 1);
            counter++;
        }
        //reset the shuffle functions

    }


    shuffle();*/

    initCard();


});