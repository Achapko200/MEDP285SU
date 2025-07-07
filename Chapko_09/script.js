function dragElement(el) {
  const container = document.getElementById("terrarium");
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  el.onpointerdown = pointerDrag;

  function pointerDrag(e) {
    e.preventDefault();

    // Set position styles
    el.style.position = 'absolute';
    el.style.zIndex = 1000;

    // Move element to container if not already inside
    if (!container.contains(el)) {
      container.appendChild(el);

      // Position the plant roughly where the pointer is inside the container
      const containerRect = container.getBoundingClientRect();
      el.style.left = (e.clientX - containerRect.left - el.offsetWidth / 2) + "px";
      el.style.top = (e.clientY - containerRect.top - el.offsetHeight / 2) + "px";
    }

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onpointermove = elementDrag;
    document.onpointerup = stopElementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let newTop = el.offsetTop - pos2;
    let newLeft = el.offsetLeft - pos1;

    const containerRect = container.getBoundingClientRect();

    const maxTop = container.clientHeight - el.offsetHeight;
    const maxLeft = container.clientWidth - el.offsetWidth;

    newTop = Math.max(0, Math.min(maxTop, newTop));
    newLeft = Math.max(0, Math.min(maxLeft, newLeft));

    el.style.top = newTop + "px";
    el.style.left = newLeft + "px";
  }

  function stopElementDrag() {
    document.onpointerup = null;
    document.onpointermove = null;
  }
}

// Apply to all 14 plants
for (let i = 1; i <= 14; i++) {
  dragElement(document.getElementById("plant" + i));
}
