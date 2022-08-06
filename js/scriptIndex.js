
fetch(`${urlAPI}search?order=date&part=snippet&channelId=${channelId}&maxResults=100&key=${key}`)
.then(async(resp) =>{
   const {items} = await resp.json();
   let videos = '';
   items.forEach(({snippet:{title, description, publishTime, thumbnails}, id:{videoId}},idx) => {
    const tituloVideo = title;
    const descripcion = description;
    const fechaPublicacion = publishTime;
    const idVideo = videoId;
    const imagen = thumbnails.high.url;
if(idx < items.length - 1){
    videos+=`<div data-descrip='${descripcion}' data-video='${idVideo}' data-titulo='${tituloVideo}' class="col abrirModal">
    <div class="card h-100">
      <img src="${imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${tituloVideo}</h5>
        <p>${formatDate(fechaPublicacion)}</p>
        <p class="card-text">
        ${descripcion}
        </p>
      </div>
    </div>
  </div>`;

}
if(idx == items.length-1){
    document.getElementById("obtenerCanal").innerHTML = title;
}

   });

   document.getElementById("videos").innerHTML = videos;
});


$("body").on("click", ".abrirModal", function() {
  const descrip = $(this).data("descrip");
  const idVideo = $(this).data("video");
  const tituloVideo = $(this).data("titulo");
  let modal = '';
   modal+= `<div class="modal fade modal-xl"  id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog" style="width: 90%;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Video</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <div class="row">
          <div class="col-6" id="videoEnlace">
          <iframe width="560" height="315" src='https://www.youtube.com/embed/${idVideo}' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="col-6">
              <h3 class="text-center" id="tituloVideo">${tituloVideo}</h3>
              <p id="descripcionVideo">
                 ${descrip}
              </p>
          </div>
         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>   
      </div>
    </div>
  </div>
</div>`;

document.getElementById("modalMostrado").innerHTML = modal;

$('#exampleModal').modal('show'); // abrir
})

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        hour ='' + d.getHours();
        minutes = '' + d.getMinutes();
        segs = '' + d.getSeconds();
        
        if(hour.length < 2)
        hour = '0' + hour;
        if(minutes.length < 2)
        minutes = '0' + minutes;
        if(segs.length < 2)
        segs = '0' + segs;

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
        return `Subido el ${day}/${month}/${year} a las ${hour}:${minutes}:${segs}`
        
}