// Menu mobile
const arya_menu=document.getElementById('arya_nav');
document.getElementById('arya_menubtn').onclick=()=>arya_menu.classList.toggle('arya_open');
arya_menu.querySelectorAll('a').forEach(a=>a.onclick=()=>arya_menu.classList.remove('arya_open'));

// Tab program studi
document.querySelectorAll('.arya_tab').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('.arya_tab,.arya_panel').forEach(e=>e.classList.remove('arya_active'));
  t.classList.add('arya_active');document.getElementById(t.dataset.tab).classList.add('arya_active');
});

// Animasi muncul saat scroll
document.querySelectorAll('.arya_card,.arya_panel,.arya_bemlogo').forEach(e=>{
  e.classList.add('arya_rev');
  new IntersectionObserver((es,o)=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('arya_show');o.disconnect()}}),{threshold:.1}).observe(e);
});

// Menu aktif saat scroll
const arya_links=document.querySelectorAll('#arya_nav a');
addEventListener('scroll',()=>{
  let cur='arya_beranda';
  document.querySelectorAll('main section').forEach(s=>{if(scrollY>=s.offsetTop-120)cur=s.id});
  arya_links.forEach(a=>a.classList.toggle('arya_active',a.getAttribute('href')==='#'+cur));
});

// Form kontak (kirim lewat email pemilik website)
const ARYA_EMAIL='emailkamu@gmail.com'; // GANTI dengan email kamu
document.getElementById('arya_form').addEventListener('submit',e=>{
  e.preventDefault();
  const v=id=>document.getElementById(id).value.trim(),st=document.getElementById('arya_status');
  if(!v('arya_in')||!v('arya_sb')||!v('arya_ps')||!/^\S+@\S+\.\S+$/.test(v('arya_em'))){
    st.style.color='#d6264f';st.textContent='⚠️ Lengkapi semua kolom dengan benar.';return;}
  const body=`Nama: ${v('arya_in')}\nEmail: ${v('arya_em')}\n\n${v('arya_ps')}`;
  st.style.color='#0a8f5b';st.textContent='✅ Membuka aplikasi email untuk mengirim pesan...';
  location.href=`mailto:${ARYA_EMAIL}?subject=${encodeURIComponent(v('arya_sb'))}&body=${encodeURIComponent(body)}`;
  e.target.reset();
});

// Progress bar scroll + tombol ke atas
const arya_bar=document.getElementById('arya_progress'),arya_top=document.getElementById('arya_totop');
addEventListener('scroll',()=>{
  const m=document.documentElement.scrollHeight-innerHeight;
  arya_bar.style.width=(m>0?scrollY/m*100:0)+'%';
  arya_top.classList.toggle('arya_show',scrollY>500);
});
arya_top.onclick=()=>scrollTo({top:0,behavior:'smooth'});

// Lightbox foto
const arya_lb=document.getElementById('arya_lightbox');
document.querySelectorAll('[data-zoom]').forEach(im=>im.onclick=()=>{arya_lb.querySelector('img').src=im.src;arya_lb.classList.add('arya_open')});
arya_lb.onclick=()=>arya_lb.classList.remove('arya_open');
addEventListener('keydown',e=>{if(e.key==='Escape')arya_lb.classList.remove('arya_open')});


// Tandai menu aktif saat halaman pertama dibuka
dispatchEvent(new Event('scroll'));
