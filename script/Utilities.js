export class Utilities {
  constructor(header, btnReset, btnSwitchPlayer) {
    this.header()
    this.buttons(btnReset, btnSwitchPlayer)
  }

  header() {
    const h1 = document.createElement("h1")
    h1.innerText = "Chess-Board Game!"
    document.body.appendChild(h1)
    h1.classList.add("header")
  }

  buttons() {
    const btnReset = document.createElement("button")
    btnReset.innerText = "Reset"
    btnReset.classList.add("btnReset")

    const btnSwitchPlayer = document.createElement("button")
    btnSwitchPlayer.innerText = "Switch Players"
    btnSwitchPlayer.classList.add("btnSwitchPlayer")
  }
}
