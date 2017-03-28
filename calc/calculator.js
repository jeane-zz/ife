// 封装实验
var calculator = {
	this.submitBtn = document.querySelector('#submit')
	this.inputArea = document.querySelector('#dataInput')
	this.outputArea = document.querySelector('#dataOutput')
	this.btnGroup = document.querySelector('#btns')
	this.deleteBtn = document.querySelector('#del')
	this.clearBtn = document.querySelector('#clear')
	this.errArea	= document.querySelector('#errMess')
	// 操作符 数组
	this.opArr = ['+','-','*','/','^','%','!']
	// 函数数组
	this.funArr = ['sin','cos','tan','abs','log','sqrt','square', 'ln']

	// 默认常量
	this.defaultConstant = {'e': Math.E, 'pi':Math.PI}

	this.btnGroup.addEventListener('click',function (event) {
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
					inputArea.value += event.target.innerHTML + '('
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
				if(isFun(event.target.innerHTML)){
					inputArea.value += event.target.innerHTML + "("
				}else {
					inputArea.value += event.target.innerHTML
				}
				submitBtn.disabled = false
			}
			
		}
	})

}