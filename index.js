/*GAME CLASS*/
class GeniusGame {
    constructor() {
      this.order = []
      this.playerOrder = []
      this.flash = 0
      this.count = 0
      this.correct = true
      this.geniusTurn = false
      this.intervalId = null
      this.strict = false
      this.led = false
      this.soundEffect = true
      this.on = false
      this.off = true
      this.win = false
      this.initDOM()
      this.addEventListeners()
    }
  
    initDOM() {
      this.counter = document.querySelector(".led-count")
      this.topLeft = document.querySelector("#top-left")
      this.topRight = document.querySelector("#top-right")
      this.bottomLeft = document.querySelector("#bottom-left")
      this.bottomRight = document.querySelector("#bottom-right")
      this.strictButton = document.querySelector("#strict-btn")
      this.ledPin = document.querySelector("#led")
      this.playButton = document.querySelector("#start-btn")
      this.toggleContainer = document.querySelector(".toggle-btn-background")
      this.onButton = document.querySelector("#toggle-btn-on")
      this.offButton = document.querySelector("#toggle-btn-off")
      this.sound1 = document.querySelector("#sound1")
      this.sound2 = document.querySelector("#sound2")
      this.sound3 = document.querySelector("#sound3")
      this.sound4 = document.querySelector("#sound4")
      this.gameOverSound = document.querySelector("#gameover")
    }

    /*EVENTLISTENERS */
  
    addEventListeners() {
      this.strictButton.addEventListener("pointerdown", () => {
        this.strict = !this.strict
        this.ledPin.classList.toggle("led-on", this.strict)
      });
  

      this.toggleContainer.addEventListener("pointerdown", (e) => {
        if (e.target === this.onButton) {
          this.on = true
          this.off = false

          console.log('on')
          this.onButton.classList.add("toggle-active")
          this.offButton.classList.remove("toggle-active")

          this.counter.innerHTML = "--"

        } else if (e.target === this.offButton) {
          this.on = false
          this.off = true

          this.onButton.classList.remove("toggle-active")
          this.offButton.classList.add("toggle-active")

          this.counter.innerHTML = ""


          this.clearColour()
          clearInterval(this.intervalId)
        }
      });
  
      this.playButton.addEventListener("pointerdown", () => {
        if (this.on) {
          this.play()
        } else {
          console.log("Game is OFF. Can't start.")
        }
      });

      this.topLeft.addEventListener('pointerdown', () => {
        if(this.on && !this.geniusTurn) {
            this.playerOrder.push(1)
            this.checkRound()
            this.one()
            if(!this.win) {
                setTimeout(() =>{
                    this.clearColour()
                }, 400)
            }
        }
      })

      this.topRight.addEventListener('pointerdown', () => {
        if(this.on && !this.geniusTurn) {
            this.playerOrder.push(2)
            this.checkRound()
            this.two()
            if(!this.win) {
                setTimeout(() =>{
                    this.clearColour()
                }, 400)
            }
        }
      })
      this.bottomLeft.addEventListener('pointerdown', () => {
        if(this.on && !this.geniusTurn) {
            this.playerOrder.push(3)
            this.checkRound()
            this.three()
            if(!this.win) {
                setTimeout(() =>{
                    this.clearColour()
                }, 400)
            }
        }
      })
      this.bottomRight.addEventListener('pointerdown', () => {
        if(this.on && !this.geniusTurn) {
            this.playerOrder.push(4)
            this.checkRound()
            this.four()
            if(!this.win) {
                setTimeout(() =>{
                    this.clearColour()
                }, 400)
            }
        }
      })

    }
    
    /*FUNCTIONS*/

    play() {
      this.win = false
      clearInterval(this.intervalId)
      this.order = Array.from({ length: 20 }, () => Math.floor(Math.random() * 4) + 1)
      this.playerOrder = []
      this.flash = 0
      this.count = 1
      this.counter.innerHTML = "1"
      this.correct = true
      this.geniusTurn = true
      this.intervalId = setInterval(() => this.gameTurn(), 700)
    }
  
    gameTurn() {
      this.on = false
  
      if (this.flash === this.count) {
        clearInterval(this.intervalId)
        this.geniusTurn = false
        this.clearColour()
        this.on = true
       return
       
      } 

      this.clearColour()

      const colour = this.order[this.flash]
      this.soundEffect = true 

      if(colour === 1) this.one()
        else if(colour === 2) this.two()
            else if(colour === 3) this.three()
                else if(colour === 4) this.four()

                    this.flash++

                    setTimeout(() => {
                        this.clearColour()
                    }, 400)
    }

    one() {
        if (this.soundEffect) {
            this.sound1.currentTime = 0
            this.sound1.play()
        }
        this.soundEffect = true
    
        this.topLeft.style.background = `radial-gradient(circle at 40% 40%, 
            rgb(160, 255, 160), 
            rgb(100, 200, 100), 
            rgb(60, 140, 60))`
    }
    
    two() {
        if (this.soundEffect) { 
            this.sound2.currentTime = 0
            this.sound2.play()
        }
        this.soundEffect = true
    
        this.topRight.style.background = `radial-gradient(circle at 60% 60%, 
            rgb(255, 160, 160), 
            rgb(220, 120, 120), 
            rgb(140, 60, 60))`
    }
    
    three() {
        if (this.soundEffect) {
            this.soundEffect = true
            this.sound3.play()
        }
        this.soundEffect = true
    
        this.bottomLeft.style.background = `radial-gradient(circle at 40% 60%, 
            rgb(255, 255, 160), 
            rgb(220, 220, 80), 
            rgb(140, 140, 50))`
    }
    
    four() {
        if (this.soundEffect){
            this.soundEffect = true
             this.sound4.play()
        }
        this.soundEffect = true
    
        this.bottomRight.style.background = `radial-gradient(circle at 60% 40%, 
            rgb(140, 140, 255), 
            rgb(80, 80, 200), 
            rgb(50, 50, 140))`
    }
    

      clearColour() {
        this.topLeft.style.background = `radial-gradient(circle at 40% 40%, 
            rgb(32, 140, 32), 
            rgb(12, 72, 12), 
            rgb(6, 40, 6))`
      
        this.topRight.style.background = `radial-gradient(circle at 60% 40%, 
            rgb(180, 30, 30), 
            rgb(106, 11, 11), 
            rgb(55, 5, 5))`
      
        this.bottomLeft.style.background = `radial-gradient(circle at 40% 60%, 
            rgb(240, 200, 30), 
            rgb(172, 143, 18), 
            rgb(90, 70, 4))`
      
        this.bottomRight.style.background = `radial-gradient(circle at 60% 60%, 
            rgb(60, 90, 180), 
            rgb(19, 42, 117), 
            rgb(10, 20, 60))`
      }

      flashColour() {
        this.topLeft.style.background = `radial-gradient(circle at 40% 40%, 
            rgb(160, 255, 160), 
            rgb(100, 200, 100), 
            rgb(60, 140, 60))`
        this.topRight.style.background = `radial-gradient(circle at 60% 60%, 
            rgb(255, 160, 160), 
            rgb(220, 120, 120), 
            rgb(140, 60, 60))`
        this.bottomLeft.style.background = `radial-gradient(circle at 40% 60%, 
            rgb(255, 255, 160), 
            rgb(220, 220, 80), 
            rgb(140, 140, 50))`
        this.bottomRight.style.background = `radial-gradient(circle at 60% 40%, 
            rgb(140, 140, 255), 
            rgb(80, 80, 200), 
            rgb(50, 50, 140))`
      }

      checkRound() {
        const currentIndex = this.playerOrder.length -1 

        if (this.playerOrder[currentIndex] !== this.order[currentIndex]) {
            this.correct = false 
            this.gameOverSound.play()
            this.flashColour()
            this.counter.innerHTML = "NO"

            setTimeout(() => {
                this.soundEffect = true
                this.counter.innerHTML = this.count
                this.clearColour()

                if(this.strict) {
                    this.play()
                } else {
                    this.geniusTurn = true
                    this.flash = 0
                    this.playerOrder = [] 
                    this.correct = true
                    this.intervalId && clearInterval(this.intervalId)
                    this.intervalId = setInterval(() => this.gameTurn(), 800)
                }
            }, 800)

            this.soundEffect = false 
            this.flashColour()
        }

        if (this.playerOrder.length === 20 && this.correct) {
            this.winGame()
            return
        }

        if(this.playerOrder.length === this.count && this.correct && !this.win) {
            this.count++
            this.playerOrder = [] 
            this.geniusTurn = true 
            this.flash = 0
            this.counter.innerHTML = this.count
            this.intervalId = setInterval(() => this.gameTurn(), 800)
        }
      }

      winGame() {
        this.flashColour()
        this.counter.innerHTML = "WINNER"
        this.on = false 
        this.win = true 
      }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const game = new GeniusGame(); 
})
  