class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        
        
    }

    

    preload() {
        //load images
        this.load.image('slotContainer', 'assets/slotContainer.png');
        this.load.image('potion1', 'assets/potion1.png');
        this.load.image('potion2', 'assets/potion2.png');
        this.load.image('potion3', 'assets/potion3.png');
        this.load.image('potion4', 'assets/potion4.png');
        this.load.image('doubleReel', 'assets/doubleReel.png');

        //load buttons
        this.load.image('spinButton', 'assets/button_spin.png');
        this.load.image('stopButton', 'assets/button_stop.png');

        //load audio
        this.load.audio('backgroundMusic', ['assets/BG_Music.wav']);
        this.load.audio('spinMusic', ['assets/Spin.wav']);
       
    }


  
    create() {
        
        //add container to display
        this.slotContainer = this.add.image(500,100, 'slotContainer').setOrigin(0,0);
        this.slotContainer.setScale(1.2);
        
        
        //add title text 
        this.text= this.add.text(890, 173, "Slots House", {
                                            font: "40px Arial",
                                            color: "red",
                                            align: "center"
                                            });
        this.text.setAngle(-2);

        //add and play background music
        this.backgroundMusic = this.sound.add("backgroundMusic", { loop: "true" });
        this.backgroundMusic.play();



        //add the potions to display in the slot container (using mask)
        this.potions = [];   
        
        for(let j=0 ; j<5 ; j++){ 
            
                var sprite= this.add.sprite(675+165*j, 225, "doubleReel");
                sprite.setScale(1.2);
               
                //limit the potions to show only inside the slot container
                //and apply the mask on every potion
                sprite.setMask(this.add.graphics()
                                .setVisible(false)
                                .fillStyle(0xFFFFFF)             //white
                                .fillRect(590, 225, 830, 499)   //(pos.x, pos.y, width, height)
                                .createGeometryMask());

                    
                this.potions.push(sprite);
        
        }

        //add the spin button
        this.spinButton = this.add.image(980,800, 'spinButton');
        this.spinButton.setScale(1.7);

        //allow pressing the button
        this.spinButton.setInteractive();

        //when the button is pressed- go to onSpinClicked function
        this.spinButton.on('spinButtonClicked', this.onSpinClicked, this);

        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('spinButtonClicked', gameObject);
        }, this);


        //add the stop button
        this.stopButton = this.add.image(980,800, 'stopButton');
        this.stopButton.setScale(1.7);

        //when the game starts the button is not available
        this.stopButton.setVisible(false);
        this.stopButton.setInteractive(false);
    }  


    onSpinClicked() {
        //play spinning music
        this.spinMusic = this.sound.add("spinMusic", {loop: "false"}); 
        this.spinMusic.play();

        //show stop button while spinning
        this.spinButton.setAlpha(0);  
        this.stopButton.setVisible(true);

        this.stopButton.setInteractive();

        this.stopButton.on('stopButtonClicked', this.onStopClicked, this);

        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('stopButtonClicked', gameObject);
        }, this);



        //enable the spin button again after the reels stop to spin
        window.setTimeout(() => { 
            this.stopButton.setVisible(false); 
            this.spinButton.setAlpha(1);
        }, 4500);
        


       //add the spinning animation
        for(let i=0; i<this.potions.length; i ++){
            this.tween= this.tweens.add({
                targets: this.potions[i],
                y: 560,
                x: 675 + (165 * i)  ,
                duration: 20 +(20* i),
                yoyo: true,
                loop: 20,
            });

   
        }
    }


    //function is not implenented yet

    onStopClicked(){
        console.log("in stop");
    }
 
  
}
