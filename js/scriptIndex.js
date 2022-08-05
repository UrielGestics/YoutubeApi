//&maxResults=10
//&key=AIzaSyCxcXt2li54pWAutPqx3BVOQjFRHTHTJhk
fetch(`${urlAPI}search?order=date&part=snippet&channelId=${channelId}&maxResults=100&key=${key}`)
.then(async(resp) =>{
   const {items} = await resp.json();
   console.log(items);
   let videos = '';
   items.forEach(({snippet:{title, description, publishTime, thumbnails}, id:{videoId}},idx) => {
    const tituloVideo = title;
    const descripcion = description;
    const fechaPublicacion = publishTime;
    const idVideo = videoId;
    const imagen = thumbnails.high.url;
if(idx < items.length - 1){


    videos+=`<div class="col">
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