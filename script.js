const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;
let gameOver = false;

function handleKeyUp(event){
	//case space bar pressed
	if(event.keyCode === 32){
		if(! isJumping){
			jump();
		}
	}
}

function jump(){
	isJumping = true;

	let upInterval = setInterval(() => {
		//case maximum high - start down movement
		if(position >= 150){
			clearInterval(upInterval);

			let downInterval = setInterval(() => {
				//stop down movement when hit the floor
				if(position <= 0){
					clearInterval(downInterval);
					isJumping = false;
				}
				//changes the dino position
				else{
					position -= 10;
					dino.style.bottom = position + 'px';
				}
			}, 15);

		}
		//start up movement
		else{

			position += 10;
			dino.style.bottom = position + 'px';
		}
	
	}, 15);
}

function createCactus(){
	if(!gameOver){
		const cactus = document.createElement('div');
		let cactusPosition = 1000;


		//choose a random time to spawn a new cactus
		let randomTime = Math.random() * 6000;

		cactus.classList.add('cactus');
		cactus.style.left = 1000 + 'px';
		background.appendChild(cactus);

		//control cactus movement
		let leftInterval = setInterval(() => {

			//if cactus is out of screen delete him
			if(cactusPosition < -60){
				clearInterval(leftInterval);
				background.removeChild(cactus);
			}
			//colision case
			else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
				//game over
				clearInterval(leftInterval);
				gameOver= true;
				// document.body.innerHTML = '<h1 class="game-over"> FIM DE JOGO </h1>';

			}
			//else keep moving him
			else{
				cactusPosition -= 10;
				cactus.style.left = cactusPosition + 'px';			
			}

		}, 20);

		//generate a new cactus
		setTimeout(createCactus, randomTime);
	}

	else{
		//stops the background animation
		background.classList.remove('background');
		background.classList.add('noAnimation');

		//adds a restart button
		const restartButton = document.createElement('BUTTON');
		restartButton.classList.add('restartButton');
		background.appendChild(restartButton);

		//changes the dino sprite
		dino.classList.remove('dino');
		dino.classList.add('dead-dino');

	}
}

createCactus();
document.addEventListener('keyup', handleKeyUp)
