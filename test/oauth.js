const codeLen = 16
const source = [
	'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	'abcdefghijklmnopqrstuvwxyz',
	'0123456789',
	'!#$%&=~/*-+'
].join('')

let now = {}
const OAUTH = {
	create: async (groupID) => {
		const id = groupID.slice(0, codeLen/2)
		let result = id
		const max = source.length
		for(let i = 0; i < codeLen/2; i++){
			var j = Math.floor(Math.random() * max)
			result += source.charAt(j)
		}
		now[groupID.slice(0, codeLen/2)] = {
			time: (new Date()).getTime(),
			pass: result,
			group: groupID
		}
		setTimeout(()=>{
			console.log('delete')
			delete now[id]
		}, 20000)
		console.log('create',now)
		return now[id]
	},
	check: async (pass) => {
		const id = pass.slice(0, codeLen/2)
		const n = now[id]
		console.log('check',now)
		if(n){
			if(pass==n.pass){
				delete now[id]
				return true
			}else{
				delete now[id]
				return false
			}
		}else{
			return undefined
		}
	}
}

export { OAUTH }
