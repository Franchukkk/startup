const header = document.querySelector("header")

function updateHeaderHeight() {
  const windowInnerHeight = window.innerHeight
  header.style.height = `${windowInnerHeight}px`
}

updateHeaderHeight()

window.addEventListener("resize", updateHeaderHeight)



var headerNavigation = document.querySelector('#navH')

function checkScreenWidth() {

  if (window.innerWidth <= 760) {
    headerNavigation.classList.add('menu-navigation')
  } else {
    headerNavigation.classList.remove('menu-navigation')
  }
}

const burgerBtn = document.querySelector(".burger")
burgerBtn.onclick = function () {
  headerNavigation.classList.toggle("burger-active")
  burgerBtn.classList.toggle("burger-btn-active")
}

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
  openBlog = document.querySelector("#read-more")
openBlog.onclick = function () {
  blogPop.style.display = "flex"
}

closeBlog.addEventListener("click", function () {
  blogPop.style.display = "none"
})



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
  intervalDuration = 5000
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
  }

  const savedFilter = localStorage.getItem(filterKey)

  if (savedFilter) {
    applyFilter(savedFilter)
  }

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

document.addEventListener("DOMContentLoaded", function () {
  let numbersDrag = document.querySelectorAll(".numbers"),
    basket = document.querySelectorAll(".drag-to-each-block"),
    checkButton = document.getElementById("check")

  const loggedInUser = getLoginFromSession()
  if (loggedInUser) {
    title.innerText = loggedInUser + " ,Welcome Back to STARTUP"
    logBtn.style.display = "none"
  }

  numbersDrag.forEach((circle) => {
    circle.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text", e.target.innerHTML)
      setTimeout(() => {
        this.style.opacity = 0
      }, 0)
    })

    circle.addEventListener("dragend", function () {
      this.style.opacity = "1"
    })
  })

  basket.forEach((basketItem) => {
    basketItem.addEventListener("dragover", function (e) {
      e.preventDefault()
    })

    basketItem.addEventListener("drop", function (e) {
      e.preventDefault()
      const dataValue = e.dataTransfer.getData("text")
      if (dataValue) {
        const newItem = document.createElement("div")
        newItem.classList.add("numbers")
        newItem.textContent = dataValue
        this.appendChild(newItem)

        numbersDrag.forEach((circle) => {
          if (circle.textContent === dataValue) {
            circle.parentNode.removeChild(circle)
          }
        })

        if (dataValue === "123456") {
          alert("Вітаю!")
        }
      }
    })
  })

  checkButton.addEventListener("click", function () {
    const basketNumbers = document.querySelectorAll(".drag-to-each-block .numbers")
    const loginInput = document.querySelector(".popup-login-content input")
    const login = loginInput.value

    saveLoginToSession(login)

    const codeEntered = Array.from(basketNumbers).map((item) => item.textContent).join("")

    if (codeEntered === "123456") {
      popup.style.display = "none"
      title.innerText = login + " ,Welcome Back to STARTUP"
      logBtn.style.display = "none"
    } else {
      alert("Password is wrong")
    }
  })
})

logBtn.onclick = function () {
  document.querySelector("#login-popup").style.display = "block"
}

// document.addEventListener('DOMContentLoaded', () => {

//   let blocks = document.querySelectorAll('.content-slider-infinity')
//   const blockSlider = document.querySelector('.blocks-infinity-slider').offsetWidth

//   let leftPosition = 0,
//     space = 0
//   if (window.innerWidth < 768 && window.innerWidth >= 576) {
//     leftPosition = (blockSlider - 263) / 2
//   }
//   blocks.forEach((block) => {
//     block.style.position = 'absolute'
//     block.style.left = `${leftPosition}px`
//     if (window.innerWidth >= 1200) {
//       space = (blockSlider - (263 * 4)) / 3
//       leftPosition += 263 + (blockSlider - (263 * 4)) / 3 //  відстань між карточками
//     } else if (window.innerWidth >= 992) {
//       space = (blockSlider - (263 * 3)) / 2
//       leftPosition += 263 + (blockSlider - (263 * 3)) / 2 //  відстань між карточками
//     } else if (window.innerWidth >= 768) {
//       space = (blockSlider - (263 * 2)) / 1
//       leftPosition += 263 + (blockSlider - (263 * 2)) / 1 //  відстань між карточками
//     } else if (window.innerWidth < 768) {
//       space = ((blockSlider - (263 * 1)) / 1)
//       leftPosition += blockSlider //  відстань між карточками
//     }
//   })


//   const leftButton = document.querySelector('.control-slide-left')
//   const rightButton = document.querySelector('.control-slide-right')
//   let canClick = true
//   leftButton.addEventListener('click', () => {
//     const FirstlastBlock = blocks[5],
//       newFirstCopy = FirstlastBlock.cloneNode(true)
//     newFirstCopy.style.transition = "1s"
//     newFirstCopy.style.left = -(263 + space) + "px"
//     setTimeout(() => {
//       newFirstCopy.style.left = 0
//     }, 0)
//     if (canClick) {
//       canClick = false
//       blocks.forEach((block) => {
//         const currentLeft = parseInt(block.style.left, 10)

//         const newLeft = currentLeft + (263 + space)
//         block.style.left = `${newLeft}px`


//       })
//       document.querySelector('.blocks-infinity-slider').insertBefore(newFirstCopy, blocks[0])
//       setTimeout(() => {
//         FirstlastBlock.remove()
//         blocks = document.querySelectorAll('.content-slider-infinity')
//         canClick = true
//       }, 1000)
//     }
//   })


//   rightButton.addEventListener('click', () => {
//     if (canClick) {
//       canClick = false

//       const firstBlockToDeleteCopy = blocks[0].cloneNode(true)
//       firstBlockToDeleteCopy.classList.add("ss")
//       blocks.forEach((block) => {
//         const currentLeft = parseInt(block.style.left, 10)
//         firstBlockToDeleteCopy.style.left = currentLeft + "px"
//         const newLeft = currentLeft - (263 + space)
//         block.style.left = `${newLeft}px`
//       })
//       document.querySelector('.blocks-infinity-slider').appendChild(firstBlockToDeleteCopy)

//       setTimeout(() => {
//         blocks[0].remove()
//         blocks = document.querySelectorAll('.content-slider-infinity')
//         canClick = true
//       }, 1000)
//     }
//   })

// })





// код без свайпа на телефоні

// function updateLayout() {
//   let blocks = document.querySelectorAll('.content-slider-infinity')
//   const blockSlider = document.querySelector('.blocks-infinity-slider').offsetWidth
//   let leftPosition = 0,
//     space = 0

//   if (window.innerWidth < 768 && window.innerWidth >= 576) {
//     leftPosition = (blockSlider - 263) / 2
//   }

//   blocks.forEach((block) => {
//     block.style.position = 'absolute'
//     block.style.left = `${leftPosition}px`

//     if (window.innerWidth >= 1200) {
//       space = (blockSlider - (263 * 4)) / 3
//       leftPosition += 263 + space // 
//     } else if (window.innerWidth >= 992) {
//       space = (blockSlider - (263 * 3)) / 2
//       leftPosition += 263 + space
//     } else if (window.innerWidth >= 768) {
//       space = (blockSlider - (263 * 2))
//       leftPosition += 263 + space
//     } else if (window.innerWidth < 768) {
//       space = (blockSlider - 263)
//       leftPosition += blockSlider
//     }
//   })

//   const leftButton = document.querySelector('.control-slide-left')
//   const rightButton = document.querySelector('.control-slide-right')
//   let canClick = true
//   leftButton.addEventListener('click', () => {
//     const FirstlastBlock = blocks[5],
//       newFirstCopy = FirstlastBlock.cloneNode(true)
//     newFirstCopy.style.transition = "1s"
//     newFirstCopy.style.left = -(263 + space) + "px"
//     setTimeout(() => {
//       if (window.innerWidth > 768) {
//         newFirstCopy.style.left = 0
//       } else {
//         newFirstCopy.style.left = (blockSlider - 263) / 2 + "px"
//       }
//     }, 0)
//     if (canClick) {
//       canClick = false
//       blocks.forEach((block) => {
//         const currentLeft = parseInt(block.style.left, 10)

//         const newLeft = currentLeft + (263 + space)
//         block.style.left = `${newLeft}px`


//       })
//       document.querySelector('.blocks-infinity-slider').insertBefore(newFirstCopy, blocks[0])
//       setTimeout(() => {
//         FirstlastBlock.remove()
//         blocks = document.querySelectorAll('.content-slider-infinity')
//         canClick = true
//       }, 1000)
//     }
//   })


//   rightButton.addEventListener('click', () => {
//     if (canClick) {
//       canClick = false

//       const firstBlockToDeleteCopy = blocks[0].cloneNode(true)
//       firstBlockToDeleteCopy.classList.add("ss")
//       blocks.forEach((block) => {
//         const currentLeft = parseInt(block.style.left, 10)
//         firstBlockToDeleteCopy.style.left = currentLeft + "px"
//         const newLeft = currentLeft - (263 + space)
//         block.style.left = `${newLeft}px`
//       })
//       document.querySelector('.blocks-infinity-slider').appendChild(firstBlockToDeleteCopy)

//       setTimeout(() => {
//         blocks[0].remove()
//         blocks = document.querySelectorAll('.content-slider-infinity')
//         canClick = true
//       }, 1000)
//     }
//   })

//   window.addEventListener('resize', updateLayout)
// }

// document.addEventListener('DOMContentLoaded', updateLayout)










function updateLayout() {
  let blocks = document.querySelectorAll('.content-slider-infinity')
  const blockSlider = document.querySelector('.blocks-infinity-slider').offsetWidth
  let leftPosition = 0,
    space = 0

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
    } else if (window.innerWidth < 768 ) {
      space = (blockSlider - 263)
      leftPosition += blockSlider
    } 
  })

  const leftButton = document.querySelector('.control-slide-left'),
    rightButton = document.querySelector('.control-slide-right')
  let canClick = true

  let touchStartX = 0,
    touchEndX = 0

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX
  })

  document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].clientX

    // визначити рух пальця 
    let swipeX = touchEndX - touchStartX

    // довжина свайпу
    const minSwipeLength = 25 // Ви можете налаштувати це значення

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

  leftButton.addEventListener('click', () => {
    const FirstlastBlock = blocks[5],
      newFirstCopy = FirstlastBlock.cloneNode(true)
    newFirstCopy.style.transition = "1s"
    newFirstCopy.style.left = -(263 + space) + "px"
    setTimeout(() => {
      if (window.innerWidth > 768) {
        newFirstCopy.style.left = 0
      } else if (window.innerWidth > 575)  {
        console.log(1);
        newFirstCopy.style.left = (blockSlider - 263) / 2 + "px"
        // newFirstCopy.style.left = 0
      } else{
        console.log(1);
        // newFirstCopy.style.left = (blockSlider - 263) / 2 + "px"
        newFirstCopy.style.left = 0
      }
    }, 0)
    if (canClick) {
      canClick = false
      blocks.forEach((block) => {
        const currentLeft = parseInt(block.style.left, 10)

        const newLeft = currentLeft + (263 + space)
        block.style.left = `${newLeft}px`


      })
      document.querySelector('.blocks-infinity-slider').insertBefore(newFirstCopy, blocks[0])
      setTimeout(() => {
        FirstlastBlock.remove()
        blocks = document.querySelectorAll('.content-slider-infinity')
        canClick = true
      }, 1000)
    }
  })


  rightButton.addEventListener('click', () => {
    if (canClick) {
      canClick = false

      const firstBlockToDeleteCopy = blocks[0].cloneNode(true)
      firstBlockToDeleteCopy.classList.add("ss")
      blocks.forEach((block) => {
        const currentLeft = parseInt(block.style.left, 10)
        firstBlockToDeleteCopy.style.left = currentLeft + "px"
        const newLeft = currentLeft - (263 + space)
        block.style.left = `${newLeft}px`
      })
      document.querySelector('.blocks-infinity-slider').appendChild(firstBlockToDeleteCopy)

      setTimeout(() => {
        blocks[0].remove()
        blocks = document.querySelectorAll('.content-slider-infinity')
        canClick = true
      }, 1000)
    }
  })

  window.addEventListener('resize', updateLayout)
}

document.addEventListener('DOMContentLoaded', updateLayout)