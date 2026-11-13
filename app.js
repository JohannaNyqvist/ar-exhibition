const exhibition = window.EXHIBITION;
const $ = id => document.getElementById(id);
let map, userMarker, watchId, arActive = false;
$('exhibition-title').textContent = exhibition.title;
$('exhibition-description').textContent = exhibition.description;
$('art-list').innerHTML = exhibition.artworks.map(a => `<article class="art-card"><img src="${a.image}" alt=""><div><h3>${escapeHtml(a.title)}</h3><p>${escapeHtml(a.artist)}</p><p>${escapeHtml(a.description)}</p></div></article>`).join('');
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function status(s){$('status').textContent=s;}
function view(which){if(arActive) stopAR();$('intro').hidden=which!=='intro';$('map-panel').hidden=which!=='map';$('art-panel').hidden=which!=='art';document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('selected',b.dataset.view===which));if(which==='map')initMap();}
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>view(b.dataset.view)));
function initMap(){if(map){setTimeout(()=>map.invalidateSize(),100);return;}map=L.map('map').setView([exhibition.artworks[0].latitude,exhibition.artworks[0].longitude],16);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);const pins=exhibition.artworks.map(a=>L.marker([a.latitude,a.longitude]).addTo(map).bindPopup(`<b>${escapeHtml(a.title)}</b><br>${escapeHtml(a.artist)}`));const bounds=L.featureGroup(pins).getBounds();if(bounds.isValid())map.fitBounds(bounds.pad(.25));if(navigator.geolocation)navigator.geolocation.getCurrentPosition(p=>{userMarker=L.circleMarker([p.coords.latitude,p.coords.longitude],{radius:8,color:'#6542bd',fillColor:'#d9b8ff',fillOpacity:1}).addTo(map).bindPopup('Your approximate location');},()=>{}, {enableHighAccuracy:true,timeout:12000});}
// GPS placement: the AR scene uses a location-based AR.js component set.
// The AR.js build below is version-pinned; verify device/browser compatibility before an event.
function startAR(){
 if(!window.isSecureContext){alert('Open this exhibition over HTTPS (or localhost).');return;}
 if(!navigator.geolocation){alert('This browser does not support GPS.');return;}
 if(!window.AFRAME){alert('The AR engine could not load. Check your connection.');return;}
 arActive=true;$('intro').hidden=true;$('map-panel').hidden=true;$('art-panel').hidden=true;$('ar-panel').hidden=false;status('Starting AR');
 const root=$('ar-root');root.innerHTML='';
 const scene=document.createElement('a-scene');scene.setAttribute('embedded','');scene.setAttribute('vr-mode-ui','enabled: false');scene.setAttribute('renderer','antialias: true; alpha: true');scene.setAttribute('arjs','sourceType: webcam; videoTexture: true; debugUIEnabled: false');
 exhibition.artworks.forEach(a=>{const img=document.createElement('a-image');img.setAttribute('src',a.image);img.setAttribute('gps-new-entity-place',`latitude: ${a.latitude}; longitude: ${a.longitude}`);img.setAttribute('width',a.width);img.setAttribute('height',a.height);img.setAttribute('position',`0 ${a.altitude} 0`);img.setAttribute('rotation',`0 ${-a.bearing} 0`);img.setAttribute('material','side: double; transparent: true; alphaTest: 0.01');scene.appendChild(img);});
 const camera=document.createElement('a-camera');camera.setAttribute('gps-new-camera','gpsMinDistance: 1');camera.setAttribute('rotation-reader','');scene.appendChild(camera);root.appendChild(scene);
 watchId=navigator.geolocation.watchPosition(p=>{$('gps-readout').textContent=`GPS accuracy ±${Math.round(p.coords.accuracy)} m`;status('AR running');},e=>{$('gps-readout').textContent=`GPS unavailable: ${e.message}`;status('GPS issue');},{enableHighAccuracy:true,maximumAge:1000,timeout:20000});
}
function stopAR(){arActive=false;if(watchId!==undefined){navigator.geolocation.clearWatch(watchId);watchId=undefined;}$('ar-root').replaceChildren();$('ar-panel').hidden=true;status('Ready');}
$('start-ar').addEventListener('click',startAR);$('exit-ar').addEventListener('click',()=>view('intro'));
