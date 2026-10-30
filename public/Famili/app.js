const CanvasApp = (() => {

    let boxes = [];
    let connections = [];
    let selected = null;
    let connectBuffer = [];

    const canvas = document.getElementById("canvas");
    const svg = document.getElementById("lines");

    let autoLayout = false;

    // ========================
    // UTIL
    // ========================
    function generateId() {
        return crypto.randomUUID();
    }

    // ========================
    // CRIAÇÃO
    // ========================
    function createBox(x = 200, y = 200) {
        const box = {
            id: generateId(),
            x,
            y,
            vx: 0,
            vy: 0,
            title: "Novo bloco",
            description: "Descrição...",
            tags: ""
        };

        boxes.push(box);
        renderBox(box);
    }

    function renderBox(box) {
        const div = document.createElement("div");
        div.className = "box";
        div.dataset.id = box.id;

        updateBox(div, box);

        div.addEventListener("click", (e) => {
            e.stopPropagation();
            selected = box.id;
            handleConnection(box.id);
            highlightSelection();
        });

        div.addEventListener("dblclick", () => editBox(box, div));

        enableDrag(div, box);

        canvas.appendChild(div);
    }

    function updateBox(div, box) {
        div.innerHTML = `
            <strong>${box.title}</strong>
            <p style="font-size:12px; opacity:0.8;">${box.description}</p>
            <span style="font-size:10px; color:#22c55e;">${box.tags}</span>
        `;

        div.style.transform = `translate(${box.x}px, ${box.y}px)`;
    }

    function highlightSelection() {
        document.querySelectorAll(".box").forEach(el => {
            el.classList.toggle("selected", el.dataset.id == selected);
        });
    }

    function editBox(box, div) {
        const t = prompt("Título:", box.title);
        if (t === null) return;

        const d = prompt("Descrição:", box.description);
        if (d === null) return;

        const tags = prompt("Tags:", box.tags);
        if (tags === null) return;

        box.title = t;
        box.description = d;
        box.tags = tags;

        updateBox(div, box);
    }

    // ========================
    // DRAG
    // ========================
    function enableDrag(div, box) {
        let offsetX, offsetY;
        let dragging = false;

        div.addEventListener("mousedown", (e) => {
            dragging = true;
            offsetX = e.offsetX;
            offsetY = e.offsetY;

            box.vx = 0;
            box.vy = 0;
        });

        document.addEventListener("mousemove", (e) => {
            if (!dragging) return;

            const rect = canvas.getBoundingClientRect();

            box.x = e.clientX - rect.left - offsetX;
            box.y = e.clientY - rect.top - offsetY;

            div.style.transform = `translate(${box.x}px, ${box.y}px)`;
            renderConnections();
        });

        document.addEventListener("mouseup", () => {
            dragging = false;
        });
    }

    // ========================
    // CONEXÕES
    // ========================
    function handleConnection(id) {
        connectBuffer.push(id);

        if (connectBuffer.length === 2) {
            connections.push({
                from: connectBuffer[0],
                to: connectBuffer[1]
            });
            connectBuffer = [];
            renderConnections();
        }
    }

    function renderConnections() {
        svg.innerHTML = "";

        connections.forEach(conn => {
            const a = boxes.find(b => b.id === conn.from);
            const b = boxes.find(b => b.id === conn.to);

            if (!a || !b) return;

            const x1 = a.x + 85;
            const y1 = a.y + 45;
            const x2 = b.x + 85;
            const y2 = b.y + 45;

            // 🔲 HITBOX INVISÍVEL
            const hitLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

            hitLine.setAttribute("x1", x1);
            hitLine.setAttribute("y1", y1);
            hitLine.setAttribute("x2", x2);
            hitLine.setAttribute("y2", y2);
            hitLine.setAttribute("stroke", "transparent");
            hitLine.setAttribute("stroke-width", "12");
            hitLine.style.cursor = "pointer";

            hitLine.addEventListener("click", (e) => {
                e.stopPropagation();
                splitConnection(conn, e);
            });

            // 🎯 LINHA VISUAL
            const visibleLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

            visibleLine.setAttribute("x1", x1);
            visibleLine.setAttribute("y1", y1);
            visibleLine.setAttribute("x2", x2);
            visibleLine.setAttribute("y2", y2);
            visibleLine.setAttribute("stroke", "white");
            visibleLine.setAttribute("stroke-width", "2");

            svg.appendChild(hitLine);
            svg.appendChild(visibleLine);
        });
    }

    function splitConnection(conn, event) {

        const pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;

        const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

        const mx = svgPoint.x;
        const my = svgPoint.y;

        const newBox = {
            id: generateId(),
            x: mx - 85,
            y: my - 45,
            vx: 0,
            vy: 0,
            title: "Intermediário",
            description: "",
            tags: ""
        };

        boxes.push(newBox);
        renderBox(newBox);

        connections = connections.filter(c =>
            !(c.from === conn.from && c.to === conn.to)
        );

        connections.push(
            { from: conn.from, to: newBox.id },
            { from: newBox.id, to: conn.to }
        );

        renderConnections();
    }

    // ========================
    // AUTO LAYOUT
    // ========================
    function simulate() {

        if (!autoLayout) return;

        const repulsion = 3000;
        const springLength = 140;
        const springStrength = 0.04;
        const damping = 0.85;

        for (let i = 0; i < boxes.length; i++) {
            for (let j = i + 1; j < boxes.length; j++) {

                let dx = boxes[j].x - boxes[i].x;
                let dy = boxes[j].y - boxes[i].y;
                let dist = Math.sqrt(dx * dx + dy * dy) || 1;

                let force = repulsion / (dist * dist);

                let fx = force * dx / dist;
                let fy = force * dy / dist;

                boxes[i].vx -= fx;
                boxes[i].vy -= fy;
                boxes[j].vx += fx;
                boxes[j].vy += fy;
            }
        }

        connections.forEach(conn => {

            const a = boxes.find(b => b.id === conn.from);
            const b = boxes.find(b => b.id === conn.to);
            if (!a || !b) return;

            let dx = b.x - a.x;
            let dy = b.y - a.y;
            let dist = Math.sqrt(dx * dx + dy * dy) || 1;

            let force = springStrength * (dist - springLength);

            let fx = force * dx / dist;
            let fy = force * dy / dist;

            a.vx += fx;
            a.vy += fy;
            b.vx -= fx;
            b.vy -= fy;
        });

        boxes.forEach(box => {

            box.vx *= damping;
            box.vy *= damping;

            box.x += box.vx;
            box.y += box.vy;

            const el = document.querySelector(`[data-id="${box.id}"]`);
            if (el) {
                el.style.transform = `translate(${box.x}px, ${box.y}px)`;
            }
        });

        renderConnections();
    }

    function loop() {
        simulate();
        requestAnimationFrame(loop);
    }

    // ========================
    // CONTROLES
    // ========================
    function toggleAutoLayout() {
        autoLayout = !autoLayout;
    }

    function deleteSelected() {
        if (!selected) return;

        boxes = boxes.filter(b => b.id !== selected);
        connections = connections.filter(c => c.from !== selected && c.to !== selected);

        document.querySelector(`[data-id="${selected}"]`)?.remove();

        selected = null;
        renderConnections();
    }

    function save() {
        localStorage.setItem("mapa", JSON.stringify({ boxes, connections }));
    }

    function load() {
        const data = JSON.parse(localStorage.getItem("mapa"));
        if (!data) return;

        boxes = data.boxes;
        connections = data.connections;

        canvas.innerHTML = "";
        boxes.forEach(renderBox);
        renderConnections();
    }

    // ========================
    // CLICK NO CANVAS
    // ========================
    canvas.addEventListener("click", (e) => {
        if (e.target.id !== "canvas") return;

        const rect = canvas.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        createBox(x - 85, y - 45);
    });

    // LOOP
    loop();

    return {
        createBox,
        deleteSelected,
        toggleAutoLayout,
        save,
        load
    };

})();