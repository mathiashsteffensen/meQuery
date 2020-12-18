// jQuery things to implement

$(() =>
{
    console.log('Hello world')

    $('h1').css('color', 'green')
    $('h2').css('padding-left', '2rem')
    $('#make-this-bigger').css('font-size', '2.5rem')

    $('body').css({
        fontFamily: 'sans-serif',
        margin: 'auto',
        padding: '5rem',
        backgroundColor: 'rgb(157, 157, 157)'
    })

    $('li').css({
        listStyle: 'none',
        margin: '0.5rem'
    })

    $('body').on('click', () =>
    {
        console.log('Clicking stuff')
    })

    $('h2').css('color', $('body').css('background-color'))

    $('li').each((i, element) =>
    {
        if (i % 2 === 0) {$(element).css('color', 'white'); $(element).addClass(['pink-bg', 'white-txt'])}
        else $(element).css('color', 'red')
    })

    console.assert($('body').css('background-color') === 'rgb(157, 157, 157)')
})