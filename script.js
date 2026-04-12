document.getElementById('navToggle').addEventListener('click',()=>document.getElementById('navMenu').classList.toggle('open'));
document.querySelectorAll('.nav--links a').forEach(a=>a.addEventListener('click',()=>document.getElementById('navMenu').classList.remove('open')));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();window.scrollTo({top:t.offsetTop-64,behavior:'smooth'})}}));

document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();const f=e.target;
  const d={name:f.name.value,email:f.email.value,phone:f.phone.value,service:f.service.value,ctype:f.ctype.value,message:f.message.value};
  if(!d.name||!d.email||!d.message){document.getElementById('formStatus').textContent='Fyll inn alle obligatoriske felter.';document.getElementById('formStatus').style.color='#f87171';return}
  const s=encodeURIComponent('Henvendelse fra '+d.name+(d.service?' – '+d.service:''));
  const b=encodeURIComponent('Navn: '+d.name+'\nE-post: '+d.email+'\nTelefon: '+(d.phone||'Ikke oppgitt')+'\nTjeneste: '+(d.service||'Ikke valgt')+'\nKundetype: '+(d.ctype||'Ikke valgt')+'\n\nMelding:\n'+d.message);
  window.location.href='mailto:post@oacc.no?subject='+s+'&body='+b;
  document.getElementById('formStatus').textContent='E-postklienten din ble aapnet.';document.getElementById('formStatus').style.color='#4ade80';f.reset()
});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('v')}),{threshold:.06});
document.querySelectorAll('.sc,.tp,.ts,.wl,.ac,.ps,.sg,.hero--metric').forEach(el=>{el.classList.add('fi');io.observe(el)});
const s=document.createElement('style');s.textContent='.fi{opacity:0;transform:translateY(14px);transition:opacity .45s,transform .45s}.fi.v{opacity:1;transform:none}';document.head.appendChild(s);
