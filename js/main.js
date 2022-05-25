let navTop = $('#Navbar').offset().top
$(window).resize(() => {
  navTop = $('#Navbar').offset().top
})
$(window).scroll(() => {
  if ($(this).scrollTop() >= navTop) return $('#Navbar').addClass('nav--fixed')
  $('#Navbar').removeClass('nav--fixed')
})


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

