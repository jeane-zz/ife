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

}