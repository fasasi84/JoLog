const links=document.querySelectorAll('nav a');
const sections=[...document.querySelectorAll('section[id]')];
addEventListener('scroll',()=>{let y=scrollY+160;sections.forEach(s=>{if(y>=s.offsetTop&&y<s.offsetTop+s.offsetHeight){links.forEach(a=>a.style.color=a.getAttribute('href')==='#'+s.id?'#59f0ad':'')}})});
