(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const m="https://ww4-assignment.onrender.com";document.getElementById("menuButton").addEventListener("click",()=>{const r=document.querySelector(".settings");r.classList.toggle("show"),r.classList.toggle("hide")});const f=document.getElementById("textSizeSlider");document.body.style.fontSize=`${f.value}px`;f.addEventListener("input",r=>{const o=`${r.target.value}px`;document.body.style.fontSize=o,console.log("Text size adjusted to:",o)});document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("reviewform"),o=document.getElementById("reviewbox"),a=document.getElementById("filter-hotel"),l=document.getElementById("filter-city"),e=document.getElementById("filter-star"),t=document.getElementById("applyFilters");async function n(s={}){try{let i=`${m}/reviews`;const d=new URLSearchParams(s).toString();d&&(i+=`?${d}`);const y=await(await fetch(i)).json();o.innerHTML=y.map(c=>`
            <div class="review">
              <h3>${c.hotel} (${c.city}) - ${c.star} Stars</h3>
              <p>${c.content}</p>
              <p><strong>Reviewer:</strong> ${c.reviewer}</p>
            </div>`).join("")}catch{o.innerHTML="Failed to load reviews."}}n(),r.addEventListener("submit",async s=>{s.preventDefault();const i=new FormData(r),d=Object.fromEntries(i.entries());try{await fetch(`${m}/reviews`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}),r.reset(),n()}catch(u){console.error("Failed to submit review",u)}}),t.addEventListener("click",()=>{const s={hotel:a.value,city:l.value,star:e.value};n(s)})});
