(() => {
  console.log("test2");
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    console.log("aga");
    if (obj.type === "INIT") {
      addButton();
    }
  });

  const addButton = () => {
    const header = document.getElementsByClassName(
      "_7c0e233b43240c13692d24d0bc8b33f3"
    )[0];

    const res = document.createElement("p");

    // chatGPT request to p.textContent

    const btn = document.createElement("button");
    btn.onclick = async () => {
      console.log("peremoga");
    };
    btn.textContent = "pupa";

    header.appendChild(btn);
    header.appendChild(res);
    console.log(header);
  };
})();
