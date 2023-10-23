//Код оновлює висоту <header> на основі висоти вікна браузера та встановлює обробники подій для оновлення висоти при зміні розміру вікна.

//При розмірі вікна менше або рівному 760 пікселів, код додає клас "menu-navigation" до елементу з id "navH". В іншому випадку, цей клас видаляється.

//Код створює бургер-меню, яке відкривається при кліку на кнопку "burger". При кліку на пункт меню бургер-меню, меню закривається.

//Є функція для створення паралаксу при русі мишки на сторінці.

//Є можливість "хаку" сторінки шляхом подвійного кліку на зображення "hacksite", що змінює текст заголовків сторінки.

//Код додає можливість відкривати та закривати блок "blogPop" при кліку на "read-more" і "closeBlog".

//Є анімація для елементів з класами "animate-left-to-right" та "animate-right-to-left", які стають видимими при прокрутці сторінки.

//Код створює слайдер для відгуків користувачів, який автоматично перемикається через певний інтервал.

//Є фільтрація галереї за категоріями за допомогою кнопок "filter-button".

//Код обробляє відправку даних з форми зв'язку, зберігає їх у сесії та виводить підтвердження у вікні "confirmation-popup".

//Є можливість авторизації шляхом перетягування блоків в правильній послідовності та введення коду.

//Є слайдер "partners-slider" з автоматичним перемиканням слайдів.






const header = document.querySelector("header"),
  headerLine = document.querySelector(".header-line")


// Функція для оновлення висоти заголовку відповідно до внутрішньої висоти вікна.
function updateHeaderHeight() {
  const windowInnerHeight = window.innerHeight
  header.style.height = `${windowInnerHeight}px`
}

updateHeaderHeight()

// Додавання слухача подій "resize" для оновлення висоти заголовку при зміні розміру вікна.
window.addEventListener("resize", updateHeaderHeight)


var headerNavigation = document.querySelector('#navH')

// Функція для перевірки ширини вікна та додавання/видалення класу для меню навігації.
function checkScreenWidth() {

  if (window.innerWidth <= 760) {
    headerNavigation.classList.add('menu-navigation')
  } else {
    headerNavigation.classList.remove('menu-navigation')
  }
}

const burgerBtn = document.querySelector(".burger")

// Обробник події для відкриття/закриття бургер-меню.
burgerBtn.onclick = function () {
  headerNavigation.classList.toggle("burger-active")
  burgerBtn.classList.toggle("burger-btn-active")
}

const burgerMenuActiveLi = document.querySelectorAll(".menu-nav li"),
  headerNavAct = document.querySelector(".burger-active")

// Функція для закриття бургер-меню при кліку на пункт навігації.
function removeBurgerAct() {
  burgerBtn.click()
}

// Додавання слухача подій для закриття бургер-меню при кліку на пункт навігації.
burgerMenuActiveLi.forEach((menuItem) => {
  menuItem.addEventListener("click", removeBurgerAct)
})



checkScreenWidth()

window.addEventListener('resize', checkScreenWidth)

const parallaxHeaders = document.querySelectorAll('.parallax-header'),
  maxShiftX = 30,
  maxShiftY = 30

function paralaxOnMouseMove(event) {
  const mouseX = event.clientX,
    mouseY = event.clientY,
    windowWidth = window.innerWidth,
    monitorHeight = window.innerHeight

  parallaxHeaders.forEach(parallaxHeader => {
    const backgroundPositionX = (mouseX / windowWidth) * maxShiftX,
      backgroundPositionY = (mouseY / monitorHeight) * maxShiftY

    parallaxHeader.style.backgroundPositionX = `${80 - backgroundPositionX}%`
    parallaxHeader.style.backgroundPositionY = `${50 - backgroundPositionY}%`
  })
}




// Додавання слухача події "mousemove" для реалізації паралакс-ефекту на деяких елементах.
document.addEventListener('mousemove', paralaxOnMouseMove)

let menuItems = [...document.querySelectorAll(".menu-nav a")]
menuItems.forEach(item => {
  item.addEventListener("click", evt => {
    evt.preventDefault()
    let id = evt.target.href.slice(22)
    let targetLocation = document.querySelector(id)
    console.log(targetLocation)
    window.scrollTo(0, targetLocation.offsetTop)
  })
})

// Обробник події для зміни тексту та кольору заголовків при потрійному кліку на зображення.
let hacksite = document.querySelector("#hacksite img"),
  hacktitles = [...document.querySelectorAll("h3.title-block")]

hacksite.addEventListener("click", function (evt) {
  if (evt.detail === 3) {
    hacktitles.forEach(item => {
      item.innerText = "You Hacked This Site"
      item.style.color = "#c0301c"
    })
  }
})


let closeBlog = document.querySelector("#blogClose"),
  blogPop = document.querySelector(".fixed-100"),
  openBlog = document.querySelector("#read-more"),
  popupBlog = document.querySelector(".popup-blog")



// Обробник події для закриття вспливаючого вікна блогу при кліку на сіру область.
blogPop.addEventListener("click", (e) => {
  if (e.target === blogPop) {
    closeBlog.click()
  }
})



openBlog.onclick = function () {
  blogPop.style.display = "flex"
}

closeBlog.addEventListener("click", function () {
  blogPop.style.display = "none"
})

// Функція для запуску анімації елементів, коли вони стають видимими.
document.addEventListener('DOMContentLoaded', function () {
  const animatedElements = document.querySelectorAll('.animated-element')

  function checkVisib() {
    animatedElements.forEach(function (element) {
      const position = element.getBoundingClientRect().top,
        monitorHeight = window.innerHeight

      if (position < monitorHeight - 300) {
        element.classList.add('animate')
      }
    })
  }


  checkVisib()
  window.addEventListener('scroll', checkVisib)
})



document.addEventListener('DOMContentLoaded', function () {
  const leftToRightElements = document.querySelectorAll('.animate-left-to-right'),
    rightToLeftElements = document.querySelectorAll('.animate-right-to-left')

  function checkVisib(elements) {
    elements.forEach(function (element) {
      const position = element.getBoundingClientRect().top,
        monitorHeight = window.innerHeight

      if (position < monitorHeight - 100) {
        element.classList.add('animate')
      }
    })
  }

  checkVisib(leftToRightElements)
  checkVisib(rightToLeftElements)

  window.addEventListener('scroll', function () {
    checkVisib(leftToRightElements)
    checkVisib(rightToLeftElements)
  })
})


const reviews = document.querySelectorAll('.review'),
  sliderDots = document.querySelectorAll('.slider-dot'),
  intervalDuration = 2000
let currentIndex = 0

function showReview(index) {
  reviews.forEach((review, i) => {
    review.classList.remove('active')
    sliderDots[i].classList.remove('active')
  })
  reviews[index].classList.add('active')
  sliderDots[index].classList.add('active')
}

function showNextReview() {
  currentIndex = (currentIndex + 1) % reviews.length
  showReview(currentIndex)
}

sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index
    showReview(currentIndex)
  })
})

reviews.forEach((review, index) => {
  review.addEventListener('mouseenter', () => {
    clearInterval(interval)
  })
  review.addEventListener('mouseleave', () => {
    interval = setInterval(showNextReview, intervalDuration)
  })
})

let interval = setInterval(showNextReview, intervalDuration)
document.addEventListener("DOMContentLoaded", function () {
  clearInterval(interval)
  interval = setInterval(showNextReview, intervalDuration)
  const filterButtons = document.querySelectorAll(".filter-button")
  const galleryCards = document.querySelectorAll(".gallery .col-lg-4")
  const filterKey = "selectedFilter"

  function applyFilter(filterValue) {
    galleryCards.forEach((item) => {
      item.style.display = "none"
      if (filterValue === "all" || item.getAttribute("data-filter").includes(filterValue)) {
        item.style.display = "block"
      }
    })
    localStorage.setItem(filterKey, filterValue)

    // Видалення класу 'btn-red' з усіх кнопок
    filterButtons.forEach((button) => {
      button.classList.remove("btn-red")
    })

    // Додавання класу 'btn-red' до вибраної кнопки
    const selectedButton = document.querySelector(`[data-filter="${filterValue}"]`)
    if (selectedButton) {
      selectedButton.classList.add("btn-red")
    }
  }

  const savedFilter = localStorage.getItem(filterKey)

  if (savedFilter) {
    applyFilter(savedFilter)
  }
  // Додавання слухача подій "click" для фільтрації елементів галереї при виборі фільтра.
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter")
      applyFilter(filterValue)
    })
  })
})


document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form")

  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const subjectInput = document.getElementById("subject")
  const companyInput = document.getElementById("company")
  const messageInput = document.getElementById("message")

  const confirmationPopup = document.getElementById("confirmation-popup")
  const popupName = document.getElementById("popup-name")
  const popupEmail = document.getElementById("popup-email")
  const popupSubject = document.getElementById("popup-subject")
  const popupCompany = document.getElementById("popup-company")
  const popupMessage = document.getElementById("popup-message")

  const acceptButton = document.getElementById("accept-button")
  const rejectButton = document.getElementById("reject-button")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const name = nameInput.value
    const email = emailInput.value
    const subject = subjectInput.value
    const company = companyInput.value
    const message = messageInput.value


    popupName.textContent = name
    popupEmail.textContent = email
    popupSubject.textContent = subject
    popupCompany.textContent = company
    popupMessage.textContent = message


    confirmationPopup.style.display = "block"


    acceptButton.addEventListener("click", function () {

      localStorage.setItem("name", name)
      localStorage.setItem("email", email)
      localStorage.setItem("subject", subject)
      localStorage.setItem("company", company)
      localStorage.setItem("message", message)

      confirmationPopup.style.display = "none"
    })


    rejectButton.addEventListener("click", function () {

      confirmationPopup.style.display = "none"
    })
    document.querySelector(".popup-menu-user-data").addEventListener("click", (e) => {
      if (e.target === document.querySelector(".popup-menu-user-data")) {
        rejectButton.click()
      }
    })
  })

  nameInput.value = localStorage.getItem("name") || ""
  emailInput.value = localStorage.getItem("email") || ""
  subjectInput.value = localStorage.getItem("subject") || ""
  companyInput.value = localStorage.getItem("company") || ""
  messageInput.value = localStorage.getItem("message") || ""

  const closePopup = document.getElementById("close-popup")
  closePopup.addEventListener("click", function () {
    confirmationPopup.style.display = "none"
  })

})








let popup = document.querySelector("#login-popup"),
  title = document.querySelector("#title"),
  logBtn = document.querySelector("#logBtn")

function saveLoginToSession(login) {
  sessionStorage.setItem("loggedInUser", login)
}

function getLoginFromSession() {
  return sessionStorage.getItem("loggedInUser")
}


logBtn.onclick = function () {
  document.querySelector("#login-popup").style.display = "block"
}

popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.style.display = "none"
  }
})

// Функція для оновлення розташування блоків на сторінці та керування слайдером
function updateLayout() {
  // Вибираємо всі блоки з класом "content-slider-infinity"
  let blocks = document.querySelectorAll('.content-slider-infinity')
  // Знаходимо розмір контейнера "blocks-infinity-slider"
  const blockSlider = document.querySelector('.blocks-infinity-slider').offsetWidth
  let leftPosition = 0,
    space = 0

  // Розглядаємо різні варіанти ширини вікна
  if (window.innerWidth < 768 && window.innerWidth >= 576) {
    leftPosition = (blockSlider - 263) / 2
  }

  blocks.forEach((block) => {
    block.style.position = 'absolute'
    block.style.left = `${leftPosition}px`

    if (window.innerWidth >= 1200) {
      space = (blockSlider - (263 * 4)) / 3
      leftPosition += 263 + space // 
    } else if (window.innerWidth >= 992) {
      space = (blockSlider - (263 * 3)) / 2
      leftPosition += 263 + space
    } else if (window.innerWidth >= 768) {
      space = (blockSlider - (263 * 2))
      leftPosition += 263 + space
    } else if (window.innerWidth < 768) {
      space = (blockSlider - 263)
      leftPosition += blockSlider
    }
  })

  // Вибираємо кнопки для перемикання слайдів
  const leftButton = document.querySelector('.control-slide-left'),
    rightButton = document.querySelector('.control-slide-right')
  let canClick = true

  let touchStartX = 0,
    touchEndX = 0


  // Додаємо обробник події для початку свайпу на сенсорних пристроях
  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX
  })
  // Додаємо обробник події для завершення свайпу
  document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].clientX

    // визначити рух пальця 
    let swipeX = touchEndX - touchStartX

    // довжина свайпу
    const minSwipeLength = 25

    if (swipeX > minSwipeLength) {
      // свайп вправо
      if (canClick) {
        canClick = false
        leftButton.click()
        setTimeout(() => {
          canClick = true
        }, 1000)
      }
    } else if (swipeX < -minSwipeLength) {
      // свайп вліво
      if (canClick) {
        canClick = false
        rightButton.click()
        setTimeout(() => {
          canClick = true
        }, 1000)
      }
    }
  })

  // Додаємо обробник події для кліку на кнопці "Вліво"
  leftButton.addEventListener('click', () => {
    // Копіюємо останній блок
    const FirstlastBlock = blocks[4],
      newFirstCopy = FirstlastBlock.cloneNode(true)
    newFirstCopy.style.transition = "1s"
    newFirstCopy.style.left = -(263 + space) + "px"
    setTimeout(() => {
      if (window.innerWidth > 768) {
        newFirstCopy.style.left = 0
      } else if (window.innerWidth > 575) {
        console.log(1)
        newFirstCopy.style.left = (blockSlider - 263) / 2 + "px"
        // newFirstCopy.style.left = 0
      } else {
        console.log(1)
        // newFirstCopy.style.left = (blockSlider - 263) / 2 + "px"
        newFirstCopy.style.left = 0
      }
    }, 0)
    if (canClick) {
      canClick = false

      // Зсуваємо всі блоки вліво
      blocks.forEach((block) => {
        const currentLeft = parseInt(block.style.left, 10)

        const newLeft = currentLeft + (263 + space)
        block.style.left = `${newLeft}px`


      })

      // Зсуваємо всі блоки вліво
      document.querySelector('.blocks-infinity-slider').insertBefore(newFirstCopy, blocks[0])
      setTimeout(() => {
        // Видаляємо останній блок
        FirstlastBlock.remove()
        blocks = document.querySelectorAll('.content-slider-infinity')
        canClick = true
      }, 1000)
    }
  })

  // Додаємо обробник події для кліку на кнопці "Вправо"
  rightButton.addEventListener('click', () => {
    if (canClick) {
      canClick = false

      // Копіюємо перший блок
      const firstBlockToDeleteCopy = blocks[0].cloneNode(true)
      firstBlockToDeleteCopy.classList.add("ss")
      // Зсуваємо всі блоки вправо
      blocks.forEach((block) => {
        const currentLeft = parseInt(block.style.left, 10)
        firstBlockToDeleteCopy.style.left = currentLeft + "px"
        const newLeft = currentLeft - (263 + space)
        block.style.left = `${newLeft}px`
      })

      // Додаємо копію першого блоку в кінець
      document.querySelector('.blocks-infinity-slider').appendChild(firstBlockToDeleteCopy)

      setTimeout(() => {
        // Видаляємо перший блок
        blocks[0].remove()
        blocks = document.querySelectorAll('.content-slider-infinity')
        canClick = true
      }, 1000)
    }
  })

  // Визначаємо затримку для обробки ресайзу
  let resizeTimeout

  function onResize() {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(function () {
      updateLayout()
    }, 1000)
  }
  // Додаємо обробник події на ресайз вікна
  window.addEventListener('resize', onResize)

}

// Додаємо обробник події для виклику функції updateLayout при завантаженні сторінки
document.addEventListener('DOMContentLoaded', updateLayout)




function updateLayout1() {

  let blocks1 = document.querySelectorAll('.partner')
  const blockSlider1 = document.querySelector('.partners-slider').offsetWidth

  let leftPosition1 = 0,
    space1 = 0

  if (window.innerWidth < 768 && window.innerWidth >= 576) {
    leftPosition1 = 0
  }

  blocks1.forEach((block) => {
    block.style.position = 'absolute'
    block.style.left = `${leftPosition1}px`
    if (window.innerWidth > 768) {
      space1 = (blockSlider1 - (blocks1[0].getBoundingClientRect().width * 4)) / 3
      leftPosition1 += blocks1[0].getBoundingClientRect().width + space1
    } else {
      space1 = (blockSlider1 - (blocks1[0].getBoundingClientRect().width * 2)) / 1
      leftPosition1 += blocks1[0].getBoundingClientRect().width + space1
    }
  })

  const leftButton1 = document.querySelector(".btn1"),
    rightButton1 = document.querySelector(".btn2")
  let canClick1 = true

  rightButton1.addEventListener('click', () => {
    if (canClick1) {
      canClick1 = false

      const firstBlockToDeleteCopy1 = blocks1[0].cloneNode(true)
      firstBlockToDeleteCopy1.classList.add("ss")
      blocks1.forEach((block) => {
        const currentLeft1 = parseInt(block.style.left, 10)
        firstBlockToDeleteCopy1.style.left = currentLeft1 + "px"
        const newLeft1 = currentLeft1 - (blocks1[0].getBoundingClientRect().width + space1)
        block.style.left = `${newLeft1}px`
      })
      document.querySelector('.partners-slider').appendChild(firstBlockToDeleteCopy1)

      setTimeout(() => {
        blocks1[0].remove()
        blocks1 = document.querySelectorAll('.partner')
        canClick1 = true
      }, 1000)
    }
  })

  function autoChangeSlide() {
    rightButton1.click()
  }

  let autoSlideInterval = setInterval(autoChangeSlide, 2000)
  let resizeTimer // Змінна для збереження таймеру

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(updateLayout1, 1000)
  })

  document.querySelector('.partners-slider').addEventListener("mouseover", () => {
    clearInterval(autoSlideInterval)
  })
  document.querySelector('.partners-slider').addEventListener('mouseout', () => {
    autoSlideInterval = setInterval(autoChangeSlide, 2000)
  })
}
document.addEventListener('DOMContentLoaded', updateLayout1)

let resizeTimeout

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout) 
  resizeTimeout = setTimeout(() => {
    clearInterval(autoSlideInterval)
    clearInterval(interval)
  }, 1000) 
})



document.addEventListener('DOMContentLoaded', function () {
  let draggedItem = null

  document.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('block')) {
      draggedItem = e.target
    }
  })

  document.addEventListener('mousemove', function (e) {
    if (draggedItem) {
      draggedItem.style.position = 'absolute'
      draggedItem.style.left = e.clientX - draggedItem.offsetWidth / 2 + 'px'
      draggedItem.style.top = e.clientY - draggedItem.offsetHeight / 2 + 'px'
    }
  })

  document.addEventListener('mouseup', function (e) {
    if (draggedItem) {
      const dropzone = document.elementFromPoint(e.clientX, e.clientY)

      if (dropzone && dropzone.classList.contains('dropzone')) {
        // Перевірка чи контейнер порожній
        if (dropzone.children.length === 0) {
          dropzone.appendChild(draggedItem)
          draggedItem.style.position = 'static'
        } else {
          // Якщо контейнер не порожній, не дозволяти вставку
          draggedItem.style.position = 'static'
        }
      } else {
        draggedItem.style.position = 'static'
      }

      draggedItem = null
    }
  })

  document.querySelector('#check').addEventListener('click', function () {
    console.log(1)
    const containers = document.querySelectorAll('.dropzone')
    let sequence = ''

    containers.forEach((container) => {
      const block = container.querySelector('.block')
      if (block) {
        sequence += block.getAttribute('data-value')
      }
    })

    if (sequence === '1234') {
      title.innerText = "Admin, Welcome To Startup again"
      popup.style.display = "none"
      logBtn.remove()
    } else {
      alert(sequence)
    }
  })

})