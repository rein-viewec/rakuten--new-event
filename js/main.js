
// Timer
const time = (endTime) => {
  const deadline = moment(endTime).unix()
  const currentTime = moment().unix()
  const diff = deadline - currentTime
  const duration = moment.duration(diff * 1000, 'milliseconds')
  return {
    day: String(moment(endTime).diff(moment(), 'days')).padStart(2, '0'),
    hr: String(duration.hours()).padStart(2, '0'),
    min: String(duration.minutes()).padStart(2, '0'),
    sec: String(duration.seconds()).padStart(2, '0'),
    diff,
  }
}

const countDown = (end) => {
  if (time(end).diff <= 0) return
  $('.day__ten').text(time(end).day[0])
  $('.day__digit').text(time(end).day[1])
  $('.hour__ten').text(time(end).hr[0])
  $('.hour__digit').text(time(end).hr[1])
  $('.minute__ten').text(time(end).min[0])
  $('.minute__digit').text(time(end).min[1])
  $('.second__ten').text(time(end).sec[0])
  $('.second__digit').text(time(end).sec[1])
}

const VueApp = Vue.createApp({
  el: 'Event page new',
  data() {
    return {
      tags,
      searchValue: null,
    }
  },
  mounted() {
    this.shuffle()
    this.countloop()
    this.setScrollEffect()
    this.setScrollTop()
    this.setAOS()
    this.isRandom()
    this.setSplide()
    // this.setLocomotiveScroll()
    // this.addMoreExpension()
    // this.setSwiper()
  },
  methods: {
    searchSale() {
      if (this.searchValue) {
        const href = `https://search.rakuten.co.jp/search/mall/${this.searchValue}/?sid=379923`
        window.open(href, '_blank')
      }
    },
    shuffle() {
      setInterval(() => {
        this.tags = _.shuffle(this.tags)
      }, 8000)
    },
    countloop() {
      countDown(dateTime)
      requestAnimationFrame(this.countloop)
    },
    addMoreExpension() {
      const mores = document.querySelectorAll('.more')
      mores.forEach((m) => {
        m.addEventListener('click', (e) => {
          $(e.target).addClass('more--active').prev().slideDown()
        })
      })
    },
    isRandom() {
      if (Object.keys(this.$refs).length === 0) return
      const randomList = Object.values(this.$refs)
      randomList.forEach((block, index) => {
        const items = Array.from(block.children)
        let quantity = block.dataset.quantity
        if (quantity > items.length || !quantity) quantity = items.length
        items.sort(() => 0.5 - Math.random())
        let itemsStr = ''
        for(let i = 0 ; i < quantity ; i++ ){
          const item = items[i]
          const itemContent = items[i].innerHTML
          itemsStr += `<li class="${item.className}">${itemContent}</li>`
        }
        randomList[index].innerHTML = itemsStr
      })
    },
    setLocomotiveScroll() {
      const LocomotiveScrollParams = {
        el: document.querySelector('body'),
        smooth: true,
        repeat: true,
        lerp: 0.05,
        tablet: {
          smooth: true,
          breakpoint: 550,
        },
        smartphone: {
          smooth: false,
        },
      }
      const scroll = new LocomotiveScroll(LocomotiveScrollParams)
    },
    setScrollEffect() {
      if (!$('#Nav').offset()) return
      const Marquees = document.querySelectorAll('.marquee')
      const body = document.querySelector('body')
      let offset = 0
      let scrollHeight = 0
      let navTop = $('#Nav').offset().top
      $('#Navbar').on('click', 'a', function (e) {
        e.preventDefault()
        const anchor = $(this).attr('href')
        const anchorTop = $(anchor).offset().top
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop: anchorTop - $('#Navbar').outerHeight(),
            },
            700,
          )
      })
      const setOffset = () => {
        marqueeMove()
        if (scrollHeight < window.scrollY) {
          scrollHeight = window.scrollY
          offset -= 3
        } else {
          scrollHeight = window.scrollY
          offset += 3
        }
        if ($(window).scrollTop() >= 300) {
          $('#GoTop').fadeIn()
        } else {
          $('#GoTop').fadeOut()
        }
        if ($(window).scrollTop() >= navTop) {
          body.style.paddingTop = $('#Navbar').outerHeight() + 'px'
          $('#Navbar').addClass('nav--fixed')
          return
        }
        body.style.paddingTop = '0px'
        $('#Navbar').removeClass('nav--fixed')
      }
      const plusOffset = () => {
        offset += 0.6
        marqueeMove()
        window.requestAnimationFrame(plusOffset)
      }
      const marqueeMove = () => {
        Marquees.forEach((m) => {
          m.style.backgroundPositionY = -offset + 'px'
        })
      }
      window.requestAnimationFrame(plusOffset)
      window.addEventListener('scroll', setOffset)
    },
    setScrollTop() {
      $('#GoTop').on('click', () => {
        $('html, body').animate(
          {
            scrollTop: 0,
          },
          700,
        )
      })
    },
    setSplide() {
      const splideParams = {
        perPage: 2,
        pagination: false,
        arrows: false,
        autoScroll: {
          speed: 2,
          pauseOnHover: false,
          pauseOnFocus: true,
        },
        type: 'loop',
        drag: 'free',
        // snap: true,
        // easing: 'linear',
        // rewind: true,
        // rewindByDrag: true,
        speed: 7000,
      }
      const spCount = document.querySelector('.splide')
      if (!spCount) return
      const splide1 = new Splide('.splide', splideParams)
      splide1.mount(window.splide.Extensions)
    },
    setAOS() {
      const AOSParams = { once: false }
      AOS.init(AOSParams)
    },
    setSwiper() {
      const swiperParams = {
        slidesPerView: 3,
        spaceBetween: 30,
        touchRatio: 0.5,
        longSwipesRatio: 0.5,
        grabCursor: true,
        // followFinger: false,
        loop: true,
        noSwiping: false,
        speed: 5000,
        freeMode: false,
        autoplay: 1,
        autoplayDisableOnInteraction: false,
        breakpoints: {
          576: {
            slidesPerView: 'auto',
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 'auto',
            spaceBetween: 0,
            // noSwiping: false,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
      const swiper1 = new Swiper('.swiper__1', swiperParams)
    },
  },
}).mount('#app')

const consoleStyle =
  "font-weight: bold; font-size: 1.05rem; font-family: '微軟正黑體'; color: #ffb93e;"