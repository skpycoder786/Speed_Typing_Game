let time_list=[60,120,300]

let para_list = [
  "Closed captions were created for deaf or hard of hearing individuals to assist in comprehension. They can also be used as a tool by those learning to read, learning to speak a non-native language, or in an environment where the audio is difficult to hear or is intentionally muted.",
  'One study examining 30 subjects, of varying different styles and expertise, has found minimal difference in typing speed between touch typists and self-taught hybrid typists. According to the study, "The number of fingers does not determine typing speed... People using self-taught typing strategies were found to be as fast as trained typists... instead of the number of fingers, there are other factors that predict typing speed... fast typists... keep their hands fixed on one position, instead of moving them over the keyboard, and more consistently use the same finger to type a certain letter." To quote doctoral candidate Anna Feit: "We were surprised to observe that people who took a typing course, performed at similar average speed and accur, as those that taught typing to themselves and only used 6 fingers on average"',
  "Trying to make a wise, good choice when thinking about what kinds of careers might be best for you is a hard thing to do. Your future may very well depend on the ways you go about finding the best job openings for you in the world of work. Some people will feel that there is one and only one job in the world for them. Hard thinking and a lot of hard work will help them find the one job that is best for them. Jobs are there for those with skills and a good work ethic. Many new young artists in the upper New England states are famous around the world as leaders in new American art. These fine artists are very good in their chosen fields and are willing to share their many talents by teaching others. The students have had the chance to learn and use skills in oil painting, sketching with chalk, sculpting, and weaving. Learning to typewrite is a skill that will help all of us in our work today. The development of the computer will open doors for people with the keyboarding skills and will make typing a necessity. Managers, as well as secretaries, will need skill at the keyboard to input data and process words. Therefore, good keyboarding skills may be important to you.",
];

let time_set=document.querySelector('#time');
let curr_time = document.getElementById("time_value");
let curr_acc = document.getElementById("accu_value");
let curr_err = document.getElementById("err_value");
let curr_wpm = document.getElementById("wpm_value");
let para_text = document.querySelector(".para");
let game_area = document.querySelector(".input_area");
let wpm = document.querySelector(".wpm_div");

let timeTaken = 0;
let overall_err = 0;
let err = 0;
let accur = 0;
let input = 0;
let para = "";
let timer = null;
var TIME;
function setTime(){
  console.log("VT"+TIME)
  TIME = time_list[time_set.value];
  console.log(TIME);
  curr_time.innerHTML = TIME + "s";
}

let timeLeft=TIME;

function startTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTaken++;
    curr_time.innerHTML = timeLeft + "s";
  }
  else {
    end();
  }
}

function paraMODE() {
  para_text.textContent = null;
  mode =document.querySelector('#mode').value;
  console.log(mode);
  para = para_list[mode];
  para.split('').forEach(letter => {
    const charSpan = document.createElement('span')
    charSpan.innerText = letter
    para_text.appendChild(charSpan)
  })

}

function status() {
  typed_ip = game_area.value;
  typed_ip_array = typed_ip.split('');
  input++;
  err = 0;
  letterArray = para_text.querySelectorAll('span');
  letterArray.forEach((letter, index) => {
    let ip_letter = typed_ip_array[index]
    if (ip_letter == null) {
      letter.classList.remove('corr');
      letter.classList.remove('incorr');
    } 
    else if (ip_letter === letter.innerText) {
      letter.classList.add('corr');
      letter.classList.remove('incorr');
    } 
    else {
      letter.classList.add('incorr');
      letter.classList.remove('corr');
      err++;
    }
  });
  curr_err.innerHTML = overall_err + err;
  let correctCharacters = (input - (overall_err + err));
  let accurVal = ((correctCharacters / input) * 100);
  curr_acc.innerHTML = Math.round(accurVal)+"%";

  if (typed_ip.length == para.length) {
    end()
    overall_err += err;
    game_area.value = "";
  }
}

function start() {
  reset();
  paraMODE();
  clearInterval(timer);
  timer = setInterval(startTimer, 1000);
}

function reset() {
  timeLeft = TIME;
  curr_time.innerHTML = timeLeft + 's';
  game_area.disabled = false;
  wpm.style.display = "none";
  timeTaken = 0;
  curr_acc.innerHTML = 100+"%";
  curr_err.innerHTML = 0;
  err = 0;
  overall_err = 0;
  accur = 0;
  input = 0;
  clearInterval(timer);
  game_area.value = "";
}

function end() {
  clearInterval(timer);
  wpm.style.display = "block";
  game_area.disabled = true;
  var wpm_value = Math.round((((input / 5) / timeTaken) * 60));
  curr_wpm.innerHTML = wpm_value;
}
