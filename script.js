import { categories } from "/categories.js"

const inputForm = document.getElementById('input-form')
const groceryItemsInner = document.getElementById('grocery-items-inner')
const filterBtn = document.getElementById('filter-btn')
const filter = document.getElementById('filter')
const filterCloseBtn = document.getElementById('filter-close-btn')
const filterCategories = document.getElementById('filter-categories')
const filterClearBtn = document.getElementById('filter-clear-btn')
const searchBtn = document.getElementById('search-btn')
let groceryList = []
let filteredGroceryList = []



inputForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const groceryInput = document.getElementById('grocery-input')
    const formatted = toTitleCase(groceryInput.value)
    groceryList.push(formatted)
    groceryInput.value = ''
    renderGroceryList(groceryList, "Items")
})

function renderGroceryList(list, heading) {
    document.getElementById('grocery-list-section-heading').textContent = `${heading}`

    groceryItemsInner.classList.add('fade-out')

    setTimeout(() => {
        let content = ``

        for (let item of list) {
            content += `
            <div class="grocery-item" id="${item}">
                <p>${item}</p>
                <a class="grocery-item-delete-btn" id="${item}-delete-btn">Delete</a>
            </div>`
        }

        groceryItemsInner.innerHTML = content
        addDeleteBtn()

        groceryItemsInner.classList.remove('fade-out')
    }, 300)
}


filterBtn.addEventListener('click', function() {
    filter.style.display = 'block'
    document.body.style.overflow = 'hidden'

    filterCloseBtn.addEventListener('click', function() {
        filter.style.display = 'none'
        document.body.style.overflow = 'auto'
    })

    filterClearBtn.addEventListener('click', function() {
        filter.style.display = 'none'
        document.body.style.overflow = 'auto'
        renderGroceryList(groceryList, "Items")
    })

    renderFilterCategories()
})

function renderFilterCategories() {
    let content = ``
    for (let item of categories) {
        content += `
        <div class="filter-category">
            <button class="filter-category-btn" id="${item.category}">${item.category}</button>
        </div>`
    }
    filterCategories.innerHTML = content
    filterByCategory()
}

function filterByCategory() {

    for (let item of categories) {
        const categoryFilter = document.getElementById(`${item.category}`)
        categoryFilter.addEventListener('click', function() {
            for (let grocery of groceryList) {
                if (item.items.includes(grocery)) {
                    filteredGroceryList.push(grocery)
                }
            }
            filter.style.display = 'none'
            document.body.style.overflow = 'auto'
            renderGroceryList(filteredGroceryList, `${item.category}`)
            filteredGroceryList = []
        })
    }
}

function addDeleteBtn() {
    for (let item of groceryList) {
        const deleteBtn = document.getElementById(`${item}-delete-btn`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function () {
                document.getElementById(`${item}`).remove()
                groceryList = groceryList.filter(g => g !== item);
            })
        }
    }
}

function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


const searchInput = document.getElementById('search-input')

searchBtn.addEventListener('click', function() {
    const search = document.getElementById('search-input')
    const formatted = toTitleCase(search.value)
    const searchResult = groceryList.filter(item => item.includes(formatted))

    renderGroceryList(searchResult, "Search")
})


searchInput.addEventListener('input', function() {
    
    const formatted = toTitleCase(searchInput.value)
    const searchResult = groceryList.filter(item => item.includes(formatted))
    
    renderGroceryList(searchResult, "Search")
})