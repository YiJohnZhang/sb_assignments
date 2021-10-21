$(document).ready(function(){
    console.log('Let\'s get ready to party with jQuery!');
    
    //02
    $('article img').toggleClass('image-center');
    console.log($('article img'));

    //03
    $('article p').eq(-1).remove();

    //04
    $('#title').css({
        fontSize: Math.round(Math.random()*100)
    });
    console.log(`fontSize of \'#title\': ${$('#title').css('fontSize')}`);

    //05
    $('ol').append('<li>random text</li>');
    console.log($('ol').eq(-1));

    //06
    $('ol li').eq(-1).html('<p>Sorry for existing.</p>')
    console.log($('ol li').eq(-1));

    //07
    function bodyBackgroundColorChangeHandler(){
        const formColorHTMLNumberInput = $('input[type="number"]');
        $('body').css({
            backgroundColor: `rgb(${formColorHTMLNumberInput.eq(0).val()},${formColorHTMLNumberInput.eq(1).val()},${formColorHTMLNumberInput.eq(2).val()})`
        });
        console.log($('body').css('backgroundColor'));
    }

//    console.log($('input[type="number"]'));
    $('input[type="number"]').on('change',bodyBackgroundColorChangeHandler);

    //08
    $('img').on('click',function(){
        console.log(`removing: ${this}`);
        this.remove();
    });

});