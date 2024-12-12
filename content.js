chrome.storage.sync.get({ notes: [] }, (data) => {
    data.notes.forEach((note) => {
        const sticky = document.createElement("div");
        sticky.className = "sticky-note";
        sticky.textContent = note;
        document.body.appendChild(sticky);

        // Default size for sticky notes
        sticky.style.width = "150px";
        sticky.style.height = "100px";

        // Make sticky draggable
        sticky.addEventListener("mousedown", (e) => {
            let shiftX = e.clientX - sticky.getBoundingClientRect().left;
            let shiftY = e.clientY - sticky.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                sticky.style.left = pageX - shiftX + "px";
                sticky.style.top = pageY - shiftY + "px";
            }

            moveAt(e.pageX, e.pageY);

            function onMouseMove(e) {
                moveAt(e.pageX, e.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);

            sticky.onmouseup = () => {
                document.removeEventListener("mousemove", onMouseMove);
                sticky.onmouseup = null;
            };
        });

        // Event to increase the size when clicked
        sticky.addEventListener("click", () => {
            if (sticky.style.width === "150px") {
                sticky.style.width = "300px"; // Expand width
                sticky.style.height = "200px"; // Expand height
            } else {
                sticky.style.width = "150px"; // Revert to original width
                sticky.style.height = "100px"; // Revert to original height
            }
        });
    });
});
