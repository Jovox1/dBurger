// base obj

const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'img/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        },
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'img/burger-2.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        },
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'img/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        },
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'img/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        },
    },
}

///////////////////////////////////////////////////////////////////////////////////////////////

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.wrapper__navbar-count'),
    btnCard = document.querySelector('.wrapper__navbar-bottom'),
    abs = document.querySelector('.abs'),
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer'),
    print__close = document.querySelector('.print__close')


productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)

    })
});


function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id');
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            parentIndecator.classList.add('active')
            parentIndecator.innerHTML = po.amount
            basketBtnCount.classList.add('active')
            totalCount += po.amount

        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    allCount ? basketBtnCount.classList.add('active') : basketBtnCount.classList.remove('active')
    basketBtnCount.innerHTML = allCount.toLocaleString()
    totalPriceBasket.innerHTML = totalSummProduct()
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSumm
    }
    return total.toLocaleString()
}
function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}


function cardItemBurger(productData) {
    const { name, totalSumm: price, amount, img } = productData
    return `
    <div class="wrapper__navbar-product">
    <div class="wrapper__navbar-info">
        <img src="${img}" alt="" class="wrapper__navbar-productImage">
        <div class="wrapper__navbar-infoSub">
            <p class="wrapper__navbar-infoName">${name}</p>
            <p class="wrapper__navbar-infoPrice"><span>${price.toLocaleString()}</span> сум</p>
        </div>
    </div>
    <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
        <button class="wrapper__navbar-symbol fa-minus" data-symbol = "-">-</button>
        <output class="wrapper__navbar_count">${amount}</output>
        <button class="wrapper__navbar-symbol fa-plus" data-symbol = "+">+</button>
    </div>
</div> 
    
    `
}
window.addEventListener('click', e => {
    const btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            if (attr == '-') product[idProduct].amount--
            else if (attr == '+') product[idProduct].amount++
            basket()
        }
    }
})
basketBtn.addEventListener('click', function () {
    basketModal.classList.toggle('active')
})
closeBasketModal.addEventListener('click', function () {
    basketModal.classList.remove('active')
})



btnCard.addEventListener('click', function () {
    print__body.innerHTML = ''
    abs.classList.add('active')
    for (const key in product) {
        const { name, totalSumm, amount } = product[key]
        if (amount) {
            print__body.innerHTML +=
                `
            <div class="print__body-item">
            <p class="print__body-item_name">
                <span class="name">${name}</span>
                <span class="count">${amount}</span>
            </p>
            <p class="print__body-item_summ">${totalSumm}</p>
            </div>
            `
        }
    }
    print__footer.innerHTML = totalSummProduct()
    // window.print()
})

print__close.addEventListener('click', function () {
    location.reload();
})