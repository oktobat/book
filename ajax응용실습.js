var booklist = ''
$.ajax({
    type : 'GET',
    url : 'bookdata.json',
    timeout: 3000,
    beforeSend : function(xhr){
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType('application/json')
        }
    },
    dataType : 'json',
    success : function(data){
        booklist = data
        dataPrint()
    },
    error : function(xhr){
        alert(xhr.status + '/' + xhr.errorText)
    }
})


function dataPrint() {
    var list = '';
    for (var i in booklist) {
        var price = booklist[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        list += `<li><div class="imgBox"><img src="${booklist[i].Photo}" onerror="this.src='images/noimage.gif'" alt=""></div>`
        list += `<div class="txtBox"><h3>${booklist[i].Title}</h3>`
        list += `<p>저자 : ${booklist[i].Author}</p>`
        list += `<p>출판사 : ${booklist[i].Publisher}</p>`
        list += `<p>발행일 : ${booklist[i].Date}</p>`
        list += `<strong>판매가 : &#8361;${price}원</strong>`
        list += `<p>요약 : ${booklist[i].Explain}</p></div><button type="button">삭제</button></li>`
    }
    $('.bookbox').append(`<ul class="list">${list}</ul>`)
}


$('.bookbox').on('click', 'ul.list li button', function(e){
    e.preventDefault()
    var index = $(this).parent().index()
    booklist.splice(index, 1)
    $('ul.list').remove()
    dataPrint()
})

$('.bookbox .pushBtn button').on('click', function(e){
    e.preventDefault()
    $('.formBox').css({display:'block'})
})

$('.bookbox').on('click', '.formBox button[type=submit]', function(e){
    e.preventDefault()
    if ( $('#title').val()==='' && $('#author').val()==='') {
        return false
    }
    var last = { 
        Title : $('#title').val(),
        Author : $('#author').val(),
        Publisher: $('#publish').val(),
        Date : $('#date').val(),
        Price : $('#price').val(),
        Explain : $('#description').val(),
        Photo : $('#imgsrc').val()
     }
     booklist.push(last)
     $('ul.list').remove()
     dataPrint()
})

$('.bookbox').on('click', '.formBox button[type=reset]', function(){
    $('.formBox').css({display:'none'})
})