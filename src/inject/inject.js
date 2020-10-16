chrome.runtime.sendMessage({greeting: "hello"}, r => r.farewell)

const query =
	selector => Array.from(document.querySelectorAll(selector))

const buttons = 
	()=> query(".normM1 img")

const prune =
	()=> query(".batch").forEach(ele => ele.remove())

const fetchTrainingButtons = 
	()=> _.partition(buttons(), btn => btn.alt.toLowerCase().match(/^(train|get)\s/))

// we cannot directly call upskill/downskill because it does not
// exist within this closure, so we must fake a user gesture
const fakeClick = (ele, n) => {
	console.log("fakeClick:%s -> %o",n, ele)
	var evt = document.createEvent("Event")
	evt.initEvent("click", true, false)
	// fire the event
	ele.dispatchEvent(evt)
}

const createBatchButton = (base, n) => {
	const batch_button = document.createElement("span")
	const abs_n = Math.abs(n)
	batch_button.classList.add("batch")
	batch_button.classList.add((n > 0 ? "up" : "down") + "-" + abs_n)
	base.insertAdjacentElement(n < 0 ? "beforebegin" : "afterend", 
		batch_button)
	batch_button.onclick = 
		()=> _.times(abs_n, (n)=> { setTimeout(fakeClick, 0, base, n) })
}

const [train_buttons, recover_buttons] = fetchTrainingButtons()

console.assert(train_buttons.length == recover_buttons.length,
	`could not find balance between training & untraining actions
	 please report this error`)

buttons().forEach(btn => {
	btn.parentElement.classList.add("button-container")
})

train_buttons.forEach(btn => {
	createBatchButton(btn, 100)
	createBatchButton(btn, 10)
})

recover_buttons.forEach(btn => {
	createBatchButton(btn, -100)
	createBatchButton(btn, -10)
})