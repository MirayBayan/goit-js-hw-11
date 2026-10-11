import{i as f,S as p}from"./assets/vendor-2QhdLxO2.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const u=document.querySelector(".search-form"),d=document.querySelector('input[name="searchQuery"]'),a=document.querySelector(".gallery"),c=document.querySelector(".loader");let i=null;console.log(u);console.log(d);console.log(a);console.log(c);u.addEventListener("submit",s=>{s.preventDefault();const n=d.value.trim();n!==""&&(a.innerHTML="",c.classList.remove("is-hidden"),m(n).then(r=>{r.length===0&&f.error({title:"Error",message:"Can not found any photo. Please try again another words.",position:"topRight"}),a.innerHTML=r.map(o=>`
        <li class ="gallery-item">
          <a href="${o.largeImageURL}">
          <img
          src="${o.webformatURL}"
          alt="${o.tags}"
          loading="lazy"
          />
          </a>
          <div class="image-info">
          <p><b>Likes:</b> ${o.likes}</p>
          <p><b>Views: </b>${o.views}</p>
          <p><b>Comments:</b> ${o.comments}</p>
          <p><b>Downloads:</b> ${o.downloads}</p>
          </div>
        </li>
        `).join(""),r.length>0&&(i?i.refresh():i=new p(".gallery a"))}).catch(r=>{console.error("Hata : ",r),alert("Fotoğraflar yüklenirken bir hata oluştu.")}).finally(()=>{c.classList.add("is-hidden")}))});const h="57977373-faec9c630f955850b63d7a23e";function m(s){const n=`https://pixabay.com/api/?key=${h}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(n).then(r=>{if(!r.ok)throw new Error("Fotoğraflar alınamadı.");return r.json()}).then(r=>(console.log(r),r.hits))}
//# sourceMappingURL=index.js.map
