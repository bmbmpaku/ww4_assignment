(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();document.getElementById("menuButton").addEventListener("click",()=>{const r=document.querySelector(".settings");r.classList.toggle("show"),r.classList.toggle("hide")});document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("reviewform"),n=document.getElementById("reviewbox"),d=document.getElementById("filter-hotel"),l=document.getElementById("filter-city"),e=document.getElementById("filter-star"),t=document.getElementById("applyFilters");async function o(s={}){try{let i="/reviews";const a=new URLSearchParams(s).toString();a&&(i+=`?${a}`);const f=await(await fetch(i)).json();n.innerHTML=f.map(c=>`
            <div class="review">
              <h3>${c.hotel} (${c.city}) - ${c.star} Stars</h3>
              <p>${c.content}</p>
              <p><strong>Reviewer:</strong> ${c.reviewer}</p>
            </div>`).join("")}catch{n.innerHTML="Failed to load reviews."}}o(),r.addEventListener("submit",async s=>{s.preventDefault();const i=new FormData(r),a=Object.fromEntries(i.entries());try{await fetch("/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),r.reset(),o()}catch(u){console.error("Failed to submit review",u)}}),t.addEventListener("click",()=>{const s={hotel:d.value,city:l.value,star:e.value};o(s)})});
