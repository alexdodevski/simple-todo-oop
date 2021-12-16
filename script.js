'use strict'
class App {
    constructor(todo) {
        this.todoBlock = todo.querySelector('.todo_block')
        this.todoInput = todo.querySelector('.todo_input')
        this.todoBtn = todo.querySelector('.todo_btn')
        this.todoClassName = 'todo_item'
        this.todoIconClassName = 'fa fa-check-circle'

        this.todoBtn.addEventListener('click', this.addTodo.bind(this))

    }

    createTodo(text) {
        let div = document.createElement('div')
        let textTodo = document.createElement('p')
        textTodo.textContent = `${text}`
        div.append(textTodo)
        div.append(this.createBtnTodo())
        div.classList.add(this.todoClassName)
        return div
    }

    addTodo() {
        const value = this.todoInput.value
        if (value !== "" && value.trim().length > 0) {
            let elem = this.createTodo(this.todoInput.value.trim())
            let date = Date.now()
            localStorage.setItem(date, JSON.stringify(elem.textContent))
            elem.setAttribute('data-id', date)
            this.todoBlock.append(elem)
            this.todoInput.value = ''
            console.log(localStorage)
        }
    }
    render() {
        for (let i = 0; i <= localStorage.length - 1; i++) {
            let keys = Object.keys(localStorage).sort((a, b) => a - b)
            console.log(keys)
            let div = this.createTodo(JSON.parse(localStorage.getItem(keys[i])))
            div.setAttribute('data-id', keys[i])
            this.todoBlock.append(div)
        }
    }

    createBtnTodo() {
        let btnTodo = document.createElement('div')
        let btnIcon = document.createElement('i')
        btnTodo.classList.add('btn_done')
        btnIcon.className += this.todoIconClassName
        btnTodo.append(btnIcon)
        btnTodo.addEventListener('click', (e) => this.todoDone(e))
        return btnTodo
    }
    todoDone(e) {
        let target = e.target
        let todoItem = target.closest('.todo_item')
        localStorage.removeItem(todoItem.getAttribute('data-id'))
        todoItem.remove()
        console.log(localStorage)
    }
}

const app = new App(document.querySelector('#app'))

app.render()
console.log(localStorage)
console.log(typeof localStorage.key(0))
console.log()



function id() {
    return Math.floor(Math.random() * 100)
}