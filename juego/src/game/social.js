var ecSocial = (function (window) {

    function shareFacebook() {
        window.open('https://www.facebook.com/sharer/sharer.php?u=http://elcomercio.pe/especiales/el-peso-de-la-historia/', 'Facebook', 'toolbar=0, status=0, width=550, height=500');
    }

    function shareTwitter() {
        window.open('https://twitter.com/intent/tweet?original_referer=http://elcomercio.pe/especiales/el-peso-de-la-historia/&amp;url=http://elcomercio.pe/especiales/el-peso-de-la-historia/&amp;via=elcomercio_peru&amp;text=El precio de la historia de nuestros presidentes.', 'Twitter', 'toolbar=0, status=0, width=550, height=500');
    }

    function shareGoogle() {
        window.open('https://plus.google.com/share?url=http://elcomercio.pe/especiales/el-peso-de-la-historia/', 'Google+', 'toolbar=0, status=0, width=550, height=500');
    }

    return {
        fb: shareFacebook,
        tw: shareTwitter,
        gp: shareGoogle,
    }

})(window);
