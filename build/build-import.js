//=============//
// Main Header //
//=============//
const Habitat = {}

//=========//
// Console //
//=========//
{
	const print = console.log.bind(console)
	const dir = (value) => console.dir(Object(value))
	
	let print9Counter = 0
	const print9 = (message) => {
		if (print9Counter >= 9) return
		print9Counter++
		console.log(message)
	}
	
	const install = (global) => {
		global.print = print
		global.dir = dir
		global.print9 = print9
		
		Reflect.defineProperty(Object.prototype, "d", {
			get() {
				const value = this.valueOf()
				console.log(value)
				return value
			},
			set(value) {
				Reflect.defineProperty(this, "d", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true})
		
		Reflect.defineProperty(Object.prototype, "dir", {
			get() {
				console.dir(this)
				return this.valueOf()
			},
			set(value) {
				Reflect.defineProperty(this, "dir", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true})
		
		let d9Counter = 0
		Reflect.defineProperty(Object.prototype, "d9", {
			get() {
				const value = this.valueOf()
				if (d9Counter < 9) {
					console.log(value)
					d9Counter++
				}
				return value
			},
			set(value) {
				Reflect.defineProperty(this, "d9", {value, configurable: true, writable: true, enumerable: true})
			}
		}, {configurable: true})
		
	}
	
	Habitat.Console = {install, print, dir, print9}
}

//======//
// Main //
//======//
Habitat.install = (global) => {
	Habitat.Console.install(global)
}

//================//
// Console Footer //
//================//
export const {install, print, print9} = Habitat.Console

//====================//
// Main Module Footer //
//====================//
export {Habitat}
export default Habitat
export const {install} = Habitat