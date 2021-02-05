const dino = document.querySelector('.dino');
const isJumping = false;

function handleKeyUp(event){
	if(event.keyCode === 32){
		if(! isJumping){
			jump();
		}
	}
}

function jump(){
	let position = 0;
	isJumping = true;

	let upInterval = setInterval(() => {
		//posição máxima - desce o dinossauro
		if(position >= 150){
			clearInterval(upInterval);

			let downInterval = setInterval(() => {
				if(position <= 0){
					clearInterval(downInterval);
					isJumping = false;
				}
				else{
					position -= 10;
					dino.style.bottom = position + 'px';
				}
			}, 15);

		}
		else{

			position += 10;
			dino.style.bottom = position + 'px';
		}
	
	}, 15);
}

document.addEventListener('keyup', handleKeyUp)