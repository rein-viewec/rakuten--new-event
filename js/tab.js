(function ($) {
  $.fn.tab = function () {
    const tabHeader = $(this)
    const tabTarget = tabHeader.find('li')
    const tabPanel = tabHeader.next('.tab__panel')
    const tabContent = tabPanel.find('.tab__content')

    tabTarget.eq(0).addClass('active')
    tabContent.hide().eq(0).show()
    tabTarget.click(function (e) {
      index = $(this).index()
      tabTarget.removeClass('active')
      $(this).addClass('active')
      tabContent.hide().eq(index).fadeIn(100)
      tabPanel.scrollLeft(0)
    })
  }
})(jQuery)