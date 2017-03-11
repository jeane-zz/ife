		var submitBtn = document.querySelector('#submit')
		var inputArea = document.querySelector('#dataInput')
		var outputArea = document.querySelector('#dataOutput')
		var btnGroup = document.querySelector('#btns')
		var deleteBtn = document.querySelector('#del')
		var clearBtn = document.querySelector('#clear')
		var errArea	= document.querySelector('#errMess')
		// 操作符 数组
		var opArr = ['+','-','*','/','^','%','!']
		// 函数数组
		var funArr = ['sin','cos','tan','abs','log','sqrt','square', 'ln']
		
		btnGroup.addEventListener('click',function (event) {
			if(event.target.className == 'btn'){
				// 连续多次点击不同的运算按钮，取最后一个
				if(judge(event.target.innerHTML) == 2){
					// 如果同是运算符，则撤销前一次输入
					if(judge(inputArea.value[inputArea.value.length - 1]) == 2) {
						inputArea.value = inputArea.value.slice(0, inputArea.value.length - 1)
						inputArea.value += event.target.innerHTML
						submitBtn.disabled = false
					}else if(judge(inputArea.value[inputArea.value.length - 1]) == 1) {
						alert('你的输入有问题')
						submitBtn.disabled = true
					}else{
						inputArea.value += event.target.innerHTML
						submitBtn.disabled = false
					}

				}
				else if(judge(event.target.innerHTML) == 1){
					// 如果同是运算符，则撤销前一次输入
					if(judge(inputArea.value[inputArea.value.length - 1]) == 1 || judge(inputArea.value[inputArea.value.length - 1]) == 3) {
						alert('你的输入有问题')
						submitBtn.disabled = true
					}else{
						inputArea.value += event.target.innerHTML
						submitBtn.disabled = false
					}
				// 连续输入小数点	
				}else if(judge(event.target.innerHTML) == 3){
					// 如果同是运算符，则撤销前一次输入
					if(judge(inputArea.value[inputArea.value.length - 1]) == 3) {
						submitBtn.disabled = false
					}
					else if(judge(inputArea.value[inputArea.value.length - 1]) == 2) {
						inputArea.value += event.target.innerHTML
						submitBtn.disabled = false
					}else if(judge(inputArea.value[inputArea.value.length - 1]) != 0) {
						alert('你的输入有问题')
						submitBtn.disabled = true
					}else{
						inputArea.value += event.target.innerHTML
						submitBtn.disabled = false
					}
				}else{
					inputArea.value += event.target.innerHTML
					submitBtn.disabled = false
				}
				
			}
		})

		// 退格键
		deleteBtn.addEventListener('click',function () {
			inputArea.value = inputArea.value.slice(0, inputArea.value.length - 1)
		})
		// 清零
		clearBtn.addEventListener('click',function () {
			inputArea.value = ''
		})
		// 计算
		submitBtn.addEventListener('click', function(){
			var res = calcu(inputArea.value)
			if(res){
				outputArea.innerHTML = res
			}
		})

		// 利用后缀表达式进行运算
		function calcu(str) {
			var arr = toRPN(str)
			if(arr.length == 0 || !arr) {
				return false
			}
			var stack = []
			arr.forEach(value => {
				if(Number.isNaN(Number(value)) == false){
					stack.push(value)
				}
				else if(isOperator(value)){
					// 阶乘情况特殊处理
					if(value == '!'){
						var operater4 = stack.pop()
						var faArr = Array(Number(operater4)).fill(0).map((it,index) => index + 1)
						var result = faArr.reduce((b,a) =>{
							return b*a
						})
						stack.push(result)
					}
					else {
						var operater2 = stack.pop()
						var operater1 = stack.pop()
						switch(value){
							case '+': stack.push(Number(operater1) + Number(operater2));break
							case '-': stack.push(Number(operater1) - Number(operater2));break
							case '*': stack.push(Number(operater1) * Number(operater2));break
							case '/': stack.push(Number(operater1) / Number(operater2));break
							case '%': stack.push(Number(operater1) % Number(operater2));break
							case '^': stack.push(Math.pow(Number(operater1), Number(operater2)));break
							default: return false
							
						}
					}
				}else if(isFun(value)){
					var operater3 = stack.pop()
					switch(value){
						case 'sin': stack.push(Math.sin(Number(operater3)));break
						case 'cos': stack.push(Math.cos(Number(operater3)));break
						case 'tan': stack.push(Math.tan(Number(operater3)));break
						case 'abs': stack.push(Math.abs(Number(operater3)));break
						case 'log': stack.push(Math.log10(Number(operater3)));break
						case 'ln': stack.push(Math.log(Number(operater3)));break
						case 'sqrt': stack.push(Math.sqrt(Number(operater3)));break
						case 'square': stack.push(Number(operater3) * Number(operater3));break
					}
				}
			})
			if(stack.length == 1){
				return stack[0]
			}else{
				return `<span style='color:red'>请输入规范的表达式</span>`
			}
		}
		
		// 中缀表达式转后缀表达式
		function toRPN (str) {
			var inputStr = str.replace(/\./g,'_')
						  .replace(/（/g,'(')
						  .replace(/）/g,')')
						  .replace(/(\W)/g, ' $& ')
						  .replace(/_/g,'.')
						  .toLowerCase()
						  .split(' ')
						  .filter(it => it != '')

			var outputStr = []
			var stack = []

			// 正负号出现在第一位置的情况
			if(inputStr[0] == '-' || inputStr[0] == '+'){
				inputStr.unshift(0)
			} 

			for(value of inputStr){
				// 操作数 直接进 输出队列
				if(value.charCodeAt(0) >= 48 && value.charCodeAt(0) <= 75 || value.charCodeAt(0) == 46){
					if(Number.isNaN(Number(value)) == false) {
						outputStr.push(value)
					} else{
						warn(value)
						// index = inputStr.length
						return false
					}
				}
				// 左括号直接进栈
				else if(value == '(') {
					stack.push(value)
				}
				// 右括号将左括号前面的操作符都 添加到输出队列
				else if(value == ')') {
					while(stack[stack.length - 1] != '('){
						outputStr.push(stack.pop())
					}
					if(stack[stack.length - 1] == '('){
						stack.pop()
					}
				}
				// 函数名 直接进栈
				else if(isFun(value)){
					stack.push(value)
				}
				// 操作符判断后进栈
				else{
					while(stack.length > 0 
						&& 
						stack[stack.length - 1] != '(' 
						&& 
						property(value) <= property(stack[stack.length - 1])){
						outputStr.push(stack.pop())
					}
					stack.push(value)
				}
			}
			
			while(stack.length > 0) {
				outputStr.push(stack.pop())
			}

			return outputStr
		}

		function warn (str) {
			errArea.innerHTML = str + ' is invaild !'
		}

		// 判断是否操作数
		function isOperator(v) {
			return opArr.indexOf(v) > -1 ? true : false
		}
		// 判断是否函数
		function isFun(v) {
			return funArr.indexOf(v) > -1 ? true : false
		}

		// 判断操作符优先级
		function property(v) {
			if(isFun(v)){
				return 5
			}
			else {
				switch(v){
					case '+':
					case '-': return 1
					case '*':
					case '/':
					case '%': return 2
					case '^':  
					case '!': return 3
					default: return 0		
				}
			}
		}
		

		// 判断相连的输入是否冲突
		function judge(value) {
			switch(value) {
				case '.': return 3
				case '+': 
				case "-": 
				case '*': 
				case "/":
				case '%': 
				case "^": return 2
				case 'sin': 
				case 'cos': 
				case 'tan': 
				case 'cot':
				case 'sqrt': 
				case 'abs':
				case 'log': 
				case 'ln': 
				case 's': 
				case 'i': 
				case 'n':
				case 'c':
				case 'o': 
				case 't': 
				case 'a':
				case 'q':
				case 'r': 
				case 'b': 
				case 'l':
				case 'g': return 1
				default: return 0
			}
		}
