const brain = require('brain.js')
const dinousars = require('./names.js')
const fs = require('fs')

const lstm = new brain.recurrent.LSTM();

const forLoop = async _ => {
  const alph = "abcdefghijklmnopqrstuvwxyz" 
  
  for (var c = 0; c < 15; c++) {
  	let string = ''
  	let min = 2
  	let max = 4

  	for (var k = 0; k < Math.random() * (max - min) + min; k ++) {
  		string += alph[Math.floor(Math.random() * alph.length)]
  	}

  	// console.log(lstm.run('abc'))
  	let dino = lstm.run(string)
  	dino.length > 5 && console.log(dino)
  }
}

fs.readFile('data.json', 'utf-8', async (err, data) => {
  if (data) {
  	const dataJson = JSON.parse(data.toString())  	
  	if (dataJson) {
  	  lstm.fromJSON(dataJson)
  	}
  } else {
  	console.log('not exists')
	
	lstm.train(dinousars, {
      iterations: 1000,
      layers: [10],
  	  log: details => console.log(details),
  	  errorThresh: 0.011
  	});

	const json = lstm.toJSON()
  
    await fs.writeFileSync('data.json', JSON.stringify(json, null, 2), (err) => {
      if (err) {
      	return console.log(err)
      }
    })
  }

  forLoop()
})