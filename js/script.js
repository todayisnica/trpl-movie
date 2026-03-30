// fungsi utama search
function searchMovie() {

    // kosongkan hasil sebelumnya
    $('#movie-list').html('');

    // ambil input user
    const keyword = $('#search-input').val();

    // request ke OMDb API
    $.ajax({
        url: 'https://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            apikey: '77162fa6', // ganti dengan API key kalian sendiri
            s: keyword
        },
        success: function (result) {

            if (result.Response === "True") {

                const movies = result.Search;

                $.each(movies, function (i, data) {

                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="${data.Poster}" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">${data.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                    <a href="#" 
                                       class="card-link see-detail" 
                                       data-toggle="modal" 
                                       data-target="#exampleModal"
                                       data-id="${data.imdbID}">
                                       See Detail
                                    </a>
                                </div>
                            </div>
                        </div>
                    `);

                });

            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">${result.Error}</h1>
                    </div>
                `);
            }
        }
    });
}


// event klik tombol search
$('#button-search').on('click', function () {
    searchMovie();
});


// event tekan ENTER
$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchMovie();
    }
});


// event klik detail (pakai event binding)
$('#movie-list').on('click', '.see-detail', function () {

    const imdbID = $(this).data('id');

    $.ajax({
        url: 'https://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            apikey: '77162fa6', 
            i: imdbID
        },
        success: function (movie) {

            if (movie.Response === "True") {

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movie.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h4>${movie.Title}</h4></li>
                                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                                    <li class="list-group-item"><strong>Plot:</strong> ${movie.Plot}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);

            }
        }
    });

});
