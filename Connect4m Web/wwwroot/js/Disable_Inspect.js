// Disable right-click
document.addEventListener('contextmenu', (e) =>  e.preventDefault()
    
);

function ctrlShiftKey(e, keyCode) {
    alert("Sorry,we dont have permissions to right click");
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
    // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    if (
        event.keyCode === 123 ||
        ctrlShiftKey(e, 'I') ||
        ctrlShiftKey(e, 'J') ||
        ctrlShiftKey(e, 'C') ||
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
    )
        alert("Sorry,we dont have permissions to right click");
        return false;
};