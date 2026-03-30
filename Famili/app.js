const CanvasApp = (() => {

    let boxes = [];
    let connections = [];
    let selected = null;
    let connectBuffer = [];

    const canvas = document.getElementById("canvas");
    const svg = document.getElementById("lines");

    function createBox(x = 200, y = 200) {
        boxes.push({
            id: Date.now(),
            x,
            y,
            title: "Novo bloco",
            description: "Descrição...",
            tags: ""
        });
        render();
    }

    function deleteSelected() {
        if (!selected) return;

        boxes = boxes.filter(b => b.id !== selected);
        connections = connections.filter(c => c.from !== selected && c.to !== selected);

        selected = null;
        render();
    }

    function connectMode() {
        connectBuffer = [];
        alert("Clique em dois blocos");
    }

    function render() {
        canvas.innerHTML = "";
        svg.innerHTML = "";

        renderBoxes();
        renderConnections();
    }

    function renderBoxes() {
        boxes.forEach(box => {
            const div = document.createElement("div");
            div.className = "box";

            if (box.id === selected) div.classList.add("selected");

            div.style.left = box.x + "px";
            div.style.top = box.y + "px";
            div.innerHTML = `
                <strong>${box.title}</strong>
                <p style="font-size:12px; opacity:0.8;">
                    ${box.description}
                </p>
                <span style="font-size:10px; color:#22c55e;">
                    ${box.tags}
                </span>
            `;

            div.onclick = (e) => {
                e.stopPropagation();
                selected = box.id;

                handleConnection(box.id);
                render();
            };

            div.ondblclick = () => {
                const title = prompt("Título:", box.title);
                if (title === null) return;

                const description = prompt("Descrição:", box.description);
                if (description === null) return;

                const tags = prompt("Tags (separadas por vírgula):", box.tags);
                if (tags === null) return;

                box.title = title;
                box.description = description;
                box.tags = tags;

                render();
            };

            enableDrag(div, box);
            canvas.appendChild(div);
        });
    }

    function renderConnections() {
        connections.forEach(conn => {
            const from = boxes.find(b => b.id === conn.from);
            const to = boxes.find(b => b.id === conn.to);

            if (!from || !to) return;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            line.setAttribute("x1", from.x + 85);
            line.setAttribute("y1", from.y + 45);
            line.setAttribute("x2", to.x + 85);
            line.setAttribute("y2", to.y + 45);

            svg.appendChild(line);
        });
    }

    function handleConnection(id) {
        if (connectBuffer.length < 2) {
            connectBuffer.push(id);

            if (connectBuffer.length === 2) {
                connections.push({
                    from: connectBuffer[0],
                    to: connectBuffer[1]
                });
                connectBuffer = [];
            }
        }
    }

    function enableDrag(div, box) {
        let offsetX, offsetY;

        div.onmousedown = (e) => {
            offsetX = e.offsetX;
            offsetY = e.offsetY;

            document.onmousemove = (ev) => {
                box.x = ev.clientX - offsetX;
                box.y = ev.clientY - offsetY;
                render();
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }

    canvas.addEventListener("click", (e) => {
        if (e.target.id === "canvas") {
            createBox(e.clientX, e.clientY);
        }
    });

    function save() {
        localStorage.setItem("mapa", JSON.stringify({ boxes, connections }));
    }

    function load() {
        const data = JSON.parse(localStorage.getItem("mapa"));
        if (!data) return;

        boxes = data.boxes;
        connections = data.connections;
        render();
    }

    render();

    return {
        createBox,
        deleteSelected,
        connectMode,
        save,
        load
    };

})();