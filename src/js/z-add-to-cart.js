if (products) {
    let buyBtns = document.querySelectorAll(".add-to-cart-js"),
        productsTable = document.querySelector(".table-products-basket"),
        cart = {}, // Об'єкт для відстеження товарів у кошику
        busketIco = document.querySelector(".busket-ico-counter"),
        productAdded = document.querySelector(".product-added-popup-mini")

    buyBtns.forEach(function (btn) {
        btn.addEventListener("click", (e) => {
            productAdded.classList.add("product-added")
            setTimeout(() => {
                productAdded.classList.remove("product-added")
            }, 1000)

            busketIco.innerHTML = //тут має бути вся кількість замовлених одиниць товарів
                e.preventDefault()
            let dataValue = btn.dataset.value
            let product = products[dataValue]

            // Перевірка чи товар вже є у кошику
            if (cart[dataValue]) {
                // Якщо товар вже є у кошику збільшуємо кількість на 1 та підраховуємо загальну ціну
                cart[dataValue].quantity++
                cart[dataValue].totalPrice += product.price
            } else {
                // Якщо товару немає у кошику - додаємо його з початковими значеннями
                cart[dataValue] = {
                    quantity: 1,
                    totalPrice: product.price,
                    product: product
                }

                // Додаємо кнопки "+" та "-" для зміни кількості товару
                let rowIndex = productsTable.rows.length
                let newRow = productsTable.insertRow()
                newRow.innerHTML = `
                    <td><img src="${product.img}"></td>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                    <td>${cart[dataValue].quantity}</td>
                    <td>${cart[dataValue].totalPrice}</td>
                `

                // Додаємо кнопки "+" та "-" для зміни кількості товару
                let quantityCell = newRow.cells[3]
                let plusButton = document.createElement("button")
                plusButton.textContent = "+"
                plusButton.addEventListener("click", () => {
                    cart[dataValue].quantity++
                    cart[dataValue].totalPrice += product.price
                    quantityCell.textContent = cart[dataValue].quantity
                    updateCartTable()
                })
                quantityCell.appendChild(plusButton)

                let minusButton = document.createElement("button")
                minusButton.textContent = "-"
                minusButton.addEventListener("click", () => {
                    cart[dataValue].quantity--
                    cart[dataValue].totalPrice -= product.price
                    quantityCell.textContent = cart[dataValue].quantity

                    // Видаляємо рядок, якщо кількість стає рівною нулю
                    if (cart[dataValue].quantity === 0) {
                        productsTable.deleteRow(rowIndex)
                        delete cart[dataValue]
                    }

                    updateCartTable()
                })
                quantityCell.appendChild(minusButton)
            }

            // Оновлення вмісту таблиці кошика та загальної ціни кошика
            updateCartTable()
        })
    })

    // Функція для обчислення загальної ціни товарів
    function calculateTotalCartPrice() {
        let totalCartPrice = 0
        for (let key in cart) {
            totalCartPrice += cart[key].totalPrice
        }
        return totalCartPrice
    }

    // Функція для оновлення таблиці кошика
    function updateCartTable() {
        // Очищення таблиці
        productsTable.innerHTML = ""

        // Додавання заголовків
        let headerRow = productsTable.insertRow()
        headerRow.innerHTML = `
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
        `

        // Додавання товарів у таблицю
        for (let key in cart) {
            let product = cart[key].product
            let quantity = cart[key].quantity
            let totalPrice = cart[key].totalPrice

            let newRow = productsTable.insertRow()
            newRow.innerHTML = `
                <td><img src="${product.img}"></td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${quantity}</td>
                <td>${totalPrice}</td>
            `

            // Додаємо кнопки "+" та "-" для зміни кількості товару
            let quantityCell = newRow.cells[3]
            let plusButton = document.createElement("button")
            plusButton.textContent = "+"
            plusButton.addEventListener("click", () => {
                cart[key].quantity++
                cart[key].totalPrice += product.price
                quantityCell.textContent = cart[key].quantity
                updateCartTable()
            })
            quantityCell.appendChild(plusButton)

            let minusButton = document.createElement("button")
            minusButton.textContent = "-"
            minusButton.addEventListener("click", () => {
                cart[key].quantity--
                cart[key].totalPrice -= product.price
                quantityCell.textContent = cart[key].quantity

                // Видаляємо tr якщо кількість стає рівною нулю
                if (cart[key].quantity === 0) {
                    productsTable.deleteRow(newRow.rowIndex)
                    delete cart[key]
                }

                updateCartTable()
            })
            quantityCell.appendChild(minusButton)
        }

        // Оновлення загальної ціни кошика
        let totalRow = productsTable.insertRow()
        totalRow.innerHTML = `
            <td colspan="4">Total</td>
            <td>${calculateTotalCartPrice()}</td>
        `
        busketIco.innerHTML = calculateTotalQuantity(cart)
    }

    function calculateTotalQuantity(cart) {
        let totalQuantity = 0
        for (let key in cart) {
            totalQuantity += cart[key].quantity
        }
        return totalQuantity
    }

    // Виклик функції оновлення таблиці кошика
    updateCartTable()
    const busketBtn = document.querySelector(".busket-ico"),
        busketOut = document.querySelector(".popup-basket-outline")
    busketBtn.addEventListener("click", () => {
        busketOut.classList.toggle("d-block")
    })
    busketOut.onclick = function (e) {
        if (e.target === busketOut) {
            busketOut.classList.toggle("d-block")
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        let svg = document.querySelector(".busket-ico svg")

        if (svg) {
            window.addEventListener("scroll", () => {
                console.log(svg)
                if (window.scrollY < document.querySelector("header").getBoundingClientRect().height) {
                    svg.style.fill = "#fff"
                } else {
                    svg.style.fill = "#000"
                }
            })
        } else {
            console.log(12)
        }
    })


}