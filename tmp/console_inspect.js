(function(){
  console.log('--- SC TURRET INSPECT START ---');
  try {
    const sel = document.getElementById('shipName');
    console.log('Selected ship element value:', sel ? sel.value : '(none)');
    console.log('Ship display select text:', sel ? sel.options[sel.selectedIndex]?.text : '(none)');

    const defaultsLog = window.__SC_DEBUG_defaults || null;
    if (defaultsLog) console.log('SC Debug defaults (cached):', defaultsLog);

    const slots = document.querySelectorAll('#turretSlots .turret-slot');
    console.log('Found turret slot count:', slots.length);
    slots.forEach((slot, i) => {
      const select = slot.querySelector('select');
      const dataset = { size: slot.dataset.size, guns: slot.dataset.guns, type: slot.dataset.type };
      console.log(`turret[${i}] dataset:`, dataset);
      if (!select) { console.log('  NO SELECT'); return; }
      console.log('  selectedValue:', select.value || '(empty)');
      console.log('  options count:', select.options.length);
      Array.from(select.options).forEach((o,j) => {
        console.log(`    [${j}] value='${o.value}' text='${o.textContent}' ${o.selected?'<selected>':''}`);
      });
    });

    console.log('--- SC TURRET INSPECT END ---');
  } catch (err) {
    console.error('Error running inspect script:', err);
  }
})();
